import { decodeAbiParameters, Hex } from 'viem';

export function decodeCelestiaContext(celestiaContext: Hex): {
  namespace: Hex;
  height: bigint;
} {
  const [namespace, height] = decodeAbiParameters(
    [
      {
        name: 'namespace',
        type: 'bytes29',
      },
      {
        name: 'height',
        type: 'int64',
      },
    ],
    celestiaContext,
  );
  return { namespace, height };
}
