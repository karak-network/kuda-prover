import {
  Account,
  Address,
  Chain,
  encodeAbiParameters,
  Hex,
  Transport,
} from 'viem';

import { KudaContract } from '../contracts/contract';
import { CelestiaClient } from './client';
import { hexToNamespace } from './namespace';
import { sharesProofAbiType } from './types';

export class CelestiaHandler<
  T extends Transport,
  C extends Chain,
  A extends Account,
> {
  constructor(
    private readonly celestiaClient: CelestiaClient,
    private readonly kudaContract: KudaContract,
  ) {}

  async handleChallenge(
    taskId: Hex,
    headerRange: { startBlock: bigint; endBlock: bigint; proofNonce: bigint },
    height: bigint,
    namespaceHex: Hex,
  ) {
    const { dataHash, squareSize } = await this.celestiaClient.getBlock(height);
    const shareProofs = await this.celestiaClient.getProveShares(
      height,
      namespaceHex,
      squareSize,
    );
    if (!shareProofs) {
      throw new Error('Failed to get shares proof');
    }
    const dataRootInclusionProof =
      await this.celestiaClient.getDataRootInclusionProof(
        height,
        headerRange.startBlock,
        headerRange.endBlock,
      );
    const dataRootTuple = { height, dataRoot: dataHash };
    const attestationProof = {
      tupleRootNonce: headerRange.proofNonce,
      tuple: dataRootTuple,
      proof: dataRootInclusionProof,
    };
    const namespace = hexToNamespace(namespaceHex);
    const sharesProof = {
      data: shareProofs.data,
      shareProofs: shareProofs.shareProofs,
      namespace,
      rowRoots: shareProofs.rowRoots,
      rowProofs: shareProofs.rowProofs,
      attestationProof,
    };

    const encodedSharesProof = encodeAbiParameters(
      [sharesProofAbiType],
      [sharesProof],
    );

    const txHash = await this.kudaContract.write.createCounterChallenge([
      taskId,
      encodedSharesProof,
    ]);

    console.log(`Proof submitted: ${txHash}`);
  }
}

export function createCelestiaHandler<
  T extends Transport,
  C extends Chain,
  A extends Account,
>(parameters: { celestiaClient: CelestiaClient; kudaContract: KudaContract }) {
  return new CelestiaHandler(
    parameters.celestiaClient,
    parameters.kudaContract,
  );
}
