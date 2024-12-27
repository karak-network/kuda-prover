import {
  createProof,
  ProofType,
  SingleProof,
} from '@chainsafe/persistent-merkle-tree';
import { toHexString } from '@chainsafe/ssz';
import { ssz } from '@lodestar/types';
import axios from 'axios';
import cKzg from 'c-kzg';
import mcl from 'mcl-wasm';
import {
  defineKzg,
  encodeAbiParameters,
  Hex,
  hexToBytes,
  Kzg,
  numberToBytes,
  sha256,
  stringToBytes,
  toHex,
} from 'viem';

import { KudaContract } from '../contracts/contract';
import { env } from '../util/envConfig';
import { BeaconClient } from './client';

const DOMAIN_STR_LEGNTH = 16;
const CHALLENGE_INPUT_SIZE =
  DOMAIN_STR_LEGNTH + 16 + cKzg.BYTES_PER_BLOB + cKzg.BYTES_PER_COMMITMENT;
const FIAT_SHAMIR_PROTOCOL_DOMAIN = 'FSBLOBVERIFY_V1_';

export class Eip4844Handler {
  private readonly kzg: Kzg;
  private mcl = mcl;
  constructor(
    private readonly kudaContract: KudaContract,
    private readonly client: BeaconClient,
  ) {
    cKzg.loadTrustedSetup(0, 'node_modules/viem/trusted-setups/mainnet.json');
    this.kzg = defineKzg(cKzg);
  }

  async init() {
    await this.mcl.init(mcl.BLS12_381).then(() => {
      this.mcl.setETHserialization(true);
      this.mcl.setMapToMode(mcl.IRTF);
    });
  }

  async handleChallenge(taskId: Hex, commitment: string, slot: bigint) {
    const sidecar = await this.client.getBlob(slot, commitment);
    if (!sidecar) {
      throw new Error('Failed to get sidecar');
    }
    const { index: commitmentIndex, blob, kzgCommitment } = sidecar;
    const kzgMerkleProof = await this.generateKZGCommitmentMerkleProof(
      slot,
      commitmentIndex,
    );
    let versionedHash = hexToBytes(sha256(kzgCommitment));
    versionedHash[0] = 0x01;
    const blobBytes = hexToBytes(blob);
    const kzgCommitmentBytes = hexToBytes(kzgCommitment);
    const z = this.computeChallenge(blob, kzgCommitment);
    const [kzgProof, y] = cKzg.computeKzgProof(blobBytes, z);
    if (!cKzg.verifyKzgProof(kzgCommitmentBytes, z, y, kzgProof)) {
      throw new Error('Failed to verify KZG proof');
    }

    const response = await axios.get(
      `${env.AGGREGATOR_URL}/aggregator/getBeaconBlockRoot`,
      {
        params: { slot: slot },
      },
    );
    const { blockRoot, aggregatorSignature } = response.data.responseObject as {
      blockRoot: Hex;
      aggregatorSignature: Hex;
    };

    const proof = encodeAbiParameters(
      [
        { name: 'aggregatorSignature', type: 'bytes' },
        { name: 'slot', type: 'uint256' },
        { name: 'commitmentIndex', type: 'uint64' },
        { name: 'versionedHash', type: 'bytes32' },
        { name: 'z', type: 'bytes32' },
        { name: 'y', type: 'bytes32' },
        { name: 'commitment', type: 'bytes' },
        { name: 'kzgProof', type: 'bytes' },
        { name: 'blockRoot', type: 'bytes32' },
        { name: 'branches', type: 'bytes32[]' },
      ],
      [
        aggregatorSignature,
        slot,
        BigInt(commitmentIndex),
        toHex(versionedHash),
        toHex(z),
        toHex(y),
        kzgCommitment,
        toHex(kzgProof),
        blockRoot,
        kzgMerkleProof.branches,
      ],
    );

    const txHash = await this.kudaContract.write.createCounterChallenge([
      taskId,
      proof,
    ]);

    console.log(`Proof submitted: ${txHash}`);
  }

  async generateKZGCommitmentMerkleProof(
    slot: bigint,
    commitmentIndex: number,
  ) {
    const blockView = await this.client.getBeaconBlockView(slot);
    const blockHeaderRoot = toHexString(blockView.node.root);

    const kzgCommitmentGIndex = ssz.deneb.BeaconBlock.getPathInfo([
      'body',
      'blobKzgCommitments',
      commitmentIndex,
    ]).gindex;
    const kzgCommitmentProof = createProof(blockView.node, {
      type: ProofType.single,
      gindex: kzgCommitmentGIndex,
    }) as SingleProof;

    return {
      leaf: toHex(kzgCommitmentProof.leaf),
      branches: kzgCommitmentProof.witnesses.map((w: Uint8Array) => toHex(w)),
      beaconRoot: blockHeaderRoot,
      slot,
      commitmentIndex: commitmentIndex,
      commitment: toHex(blockView.body.blobKzgCommitments.get(0)),
    };
  }

  computeChallenge(blob: Hex, commitment: Hex): Uint8Array {
    let bytes = new Uint8Array(CHALLENGE_INPUT_SIZE);
    let offset = 0;
    bytes.set(stringToBytes(FIAT_SHAMIR_PROTOCOL_DOMAIN), offset);
    offset += DOMAIN_STR_LEGNTH;
    bytes.set(numberToBytes(0, { size: 8 }), offset);
    offset += 8;
    bytes.set(numberToBytes(cKzg.FIELD_ELEMENTS_PER_BLOB, { size: 8 }), offset);
    offset += 8;
    bytes.set(hexToBytes(blob), offset);
    offset += cKzg.BYTES_PER_BLOB;
    bytes.set(hexToBytes(commitment), offset);

    const hash = sha256(bytes);

    const fr = new this.mcl.Fr();
    fr.setBigEndianMod(hexToBytes(hash));
    return fr.serialize();
  }
}

export async function createEip4844Handler(parameters: {
  beaconClient: BeaconClient;
  kudaContract: KudaContract;
}) {
  const handler = new Eip4844Handler(
    parameters.kudaContract,
    parameters.beaconClient,
  );
  await handler.init();
  return handler;
}
