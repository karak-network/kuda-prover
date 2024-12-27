import { createConfig } from '@ponder/core';
import { Hex, http } from 'viem';
import { sepolia } from 'viem/chains';

import { BlobstreamXAbi } from './abi/BlobstreamX';
import { KudaAbi } from './abi/Kuda';

export default createConfig({
  database: {
    kind: 'postgres',
    connectionString: process.env.DATABASE_URL as string,
  },
  networks: {
    sepolia: {
      chainId: sepolia.id,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    BlobstreamX: {
      network: 'sepolia',
      abi: BlobstreamXAbi,
      address: process.env.BLOBSTREAMX_CONTRACT_ADDRESS as Hex,
      startBlock: Number(process.env.START_BLOCK as string),
    },
    Kuda: {
      network: 'sepolia',
      abi: KudaAbi,
      address: process.env.KUDA_CONTRACT_ADDRESS as Hex,
      startBlock: Number(process.env.START_BLOCK as string),
    },
  },
});
