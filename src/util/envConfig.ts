import dotenv from 'dotenv';
import { cleanEnv, num, str, url } from 'envalid';

import { Chains } from './chains';

dotenv.config();

export const env = cleanEnv(process.env, {
  KUDA_RPC_URL: url(),
  BEACON_RPC_URL: url(),
  AGGREGATOR_URL: url(),
  KUDA_CONTRACT_ADDRESS: str(),
  CELESTIA_RPC_URL: url(),
  CHAIN_ID: num({ choices: Chains.map((chain) => chain.id) }),
  PROVER_PRIVATE_KEY: str(),
});
