import { arbitrum, base, mainnet, sepolia } from 'viem/chains';

export const Chains = [arbitrum, base, mainnet, sepolia] as const;

export type ChainId = (typeof Chains)[number]['id'];
