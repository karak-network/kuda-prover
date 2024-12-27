import { type Hex } from 'viem';

import { type Namespace } from './types';

export function namespaceToHex(namespace: Namespace): Hex {
  const version = namespace.version.slice(2);
  const id = namespace.id.slice(2);
  return ('0x' + version + id) as Hex;
}

export function hexToNamespace(hex: Hex): Namespace {
  const version = ('0x' + hex.slice(2, 4)) as Hex;
  const id = ('0x' + hex.slice(4)) as Hex;
  return { version, id };
}
