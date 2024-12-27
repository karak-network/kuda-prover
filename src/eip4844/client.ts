import { deneb, ssz } from '@lodestar/types';
import axios, { AxiosInstance } from 'axios';
import { Hex } from 'viem';

interface Sidecar {
  index: number;
  blob: Hex;
  kzgCommitment: Hex;
  kzgProof: Hex;
}

export class BeaconClient {
  private readonly client: AxiosInstance;
  constructor(rpcUrl: string) {
    this.client = axios.create({
      baseURL: rpcUrl,
    });
  }

  async getSidecars(slot: bigint): Promise<Sidecar[]> {
    const response = await this.client.get(
      `eth/v1/beacon/blob_sidecars/${slot}`,
    );
    const data = response.data as {
      data: { index: string; blob: Hex; kzg_commitment: Hex; kzg_proof: Hex }[];
    };
    return data.data.map((sidecar) => ({
      index: parseInt(sidecar.index),
      blob: sidecar.blob,
      kzgCommitment: sidecar.kzg_commitment,
      kzgProof: sidecar.kzg_proof,
    }));
  }

  async getBlob(
    slot: bigint,
    commitment: string,
  ): Promise<Sidecar | undefined> {
    const sidecars = await this.getSidecars(slot);
    return sidecars.find((sidecar) => sidecar.kzgCommitment === commitment);
  }

  async getBeaconStateView(slot: bigint) {
    const beaconStateResponse = await this.client.get(
      `eth/v2/debug/beacon/states/${slot}`,
      {
        headers: {
          Accept: 'application/octet-stream',
        },
        responseType: 'arraybuffer',
      },
    );
    const beaconStateUint8SSZ = new Uint8Array(beaconStateResponse.data);
    const consensusState =
      ssz.deneb.BeaconState.deserialize(beaconStateUint8SSZ);
    return ssz.deneb.BeaconState.toView(consensusState as deneb.BeaconState);
  }

  async getBeaconBlockView(slot: bigint) {
    let beaconBlockResponse = await this.client.get(
      `eth/v2/beacon/blocks/${slot}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const consensusBeaconBlock = ssz.deneb.BeaconBlock.fromJson(
      beaconBlockResponse.data['data']['message'],
    );
    return ssz.deneb.BeaconBlock.toView(
      consensusBeaconBlock as deneb.BeaconBlock,
    );
  }

  async getBeaconBlockRoot(slot: bigint): Promise<Hex> {
    const response = await this.client.get(
      `eth/v1/beacon/blocks/${slot}/root`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const blockRoot = (await response.data.data.root) as Hex;
    return blockRoot;
  }
}
