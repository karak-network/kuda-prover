import { decodeAbiParameters, Hex } from 'viem';

import { ponder } from '@/generated';

import { createCelestiaHandler } from './celestia';
import { CelestiaClient } from './celestia/client';
import { kudaContract } from './contracts/contract';
import { decodeCelestiaContext } from './decoder';
import { createEip4844Handler } from './eip4844';
import { BeaconClient } from './eip4844/client';
import { env } from './util/envConfig';

const celestiaHandler = createCelestiaHandler({
  celestiaClient: new CelestiaClient(env.CELESTIA_RPC_URL as string),
  kudaContract,
});

const eip4844Handler = await createEip4844Handler({
  beaconClient: new BeaconClient(env.BEACON_RPC_URL as string),
  kudaContract,
});

ponder.on('Kuda:ChallengeCreated', async ({ event, context: ctx }) => {
  const { Challenge, HeaderRange } = ctx.db;
  const { taskId } = event.args;
  const submittedReceipt = await kudaContract.read.submittedReceipt([taskId]);
  const challengeData = await kudaContract.read.challengeData([taskId]);

  // Check if the challenge has already been finalized
  if (challengeData[3] !== 0) {
    // If the challenge has been finalized, we don't need to keep track of it anymore
    await Challenge.delete({ id: taskId });
    return;
  }

  const [prefix, context, commitment] = decodeAbiParameters(
    [
      {
        name: 'prefix',
        type: 'bytes1',
      },
      {
        name: 'context',
        type: 'bytes',
      },
      {
        name: 'commitment',
        type: 'string',
      },
      {
        name: 'submissionTime',
        type: 'uint256',
      },
    ],
    submittedReceipt,
  );
  if (prefix === '0xce') {
    await Challenge.create({
      id: taskId,
      data: {
        daLayer: 'Celestia',
        context,
      },
    });
    const { namespace, height } = decodeCelestiaContext(context);
    const headerRanges = await HeaderRange.findMany({
      where: {
        startBlock: {
          gte: height,
        },
        endBlock: {
          lte: height,
        },
      },
    });
    if (headerRanges.items.length > 1) {
      throw new Error('Multiple block ranges found');
    } else {
      const headerRange = headerRanges.items[0];
      if (headerRange) {
        const { startBlock, endBlock, proofNonce } = headerRange;
        await celestiaHandler.handleChallenge(
          taskId,
          { startBlock, endBlock, proofNonce },
          height,
          namespace,
        );
      }
    }
  } else if (prefix === '0x48') {
    // EIP-4844
    const [slot] = decodeAbiParameters(
      [
        {
          name: 'slot',
          type: 'uint64',
        },
      ],
      context,
    );
    try {
      await eip4844Handler.handleChallenge(taskId, commitment, slot);
    } catch (e) {
      console.error(e);
    }
  }
});

ponder.on('Kuda:CounterChallengeCreated', async ({ event, context }) => {
  // Someone created a counter challenge, so we don't need to keep track of the challenge anymore
  const { taskId } = event.args;
  await context.db.Challenge.delete({ id: taskId });
});

ponder.on('BlobstreamX:DataCommitmentStored', async ({ event, context }) => {
  const { startBlock, endBlock, proofNonce } = event.args;
  const { Challenge, HeaderRange } = await context.db;
  await HeaderRange.create({
    id: event.log.id,
    data: {
      startBlock,
      endBlock,
      proofNonce,
    },
  });

  let cursor = undefined;
  // Check if there are any challenges that need to be handled
  while (true) {
    const challenges = await Challenge.findMany({
      where: {
        daLayer: 'Celestia',
      },
      orderBy: {
        id: 'asc',
      },
      after: cursor,
    });
    challenges.items.forEach(async (challenge) => {
      const { id, daLayer, context } = challenge;
      if (daLayer !== 'Celestia') return;
      const { namespace, height } = decodeCelestiaContext(context);
      if (height < startBlock || height > endBlock) return;
      try {
        await celestiaHandler.handleChallenge(
          id as Hex,
          { startBlock, endBlock, proofNonce },
          height,
          namespace,
        );
      } catch (e) {
        console.error(e);
      }
    });
    if (!challenges.pageInfo.endCursor) {
      break;
    } else {
      cursor = challenges.pageInfo.endCursor;
    }
  }
});
