import {
  Address,
  createClient,
  extractChain,
  getContract,
  http,
  publicActions,
  walletActions,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { KudaAbi } from '../../abi/Kuda';
import { ChainId, Chains } from '../util/chains';
import { env } from '../util/envConfig';

export const client = createClient({
  account: privateKeyToAccount(env.PROVER_PRIVATE_KEY as `0x${string}`),
  chain: extractChain({ chains: Chains, id: env.CHAIN_ID as ChainId }),
  transport: http(env.KUDA_RPC_URL),
})
  .extend(publicActions)
  .extend(walletActions);

export const kudaContractAddress = env.KUDA_CONTRACT_ADDRESS;

export const kudaContract = getContract({
  address: kudaContractAddress as Address,
  abi: KudaAbi,
  client: client,
});

export type KudaContract = typeof kudaContract;
