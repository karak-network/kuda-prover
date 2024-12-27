import { type Hex } from 'viem';

export type AttestationProof = {
  tupleRootNonce: bigint;
  tuple: DataRootTuple;
  proof: BinaryMerkleProof;
};

export type DataRootTuple = {
  height: bigint;
  dataRoot: Hex;
};

export type BinaryMerkleProof = {
  sideNodes: Hex[];
  key: bigint;
  numLeaves: bigint;
};

export type Namespace = {
  version: Hex;
  id: Hex;
};

export type NamespaceNode = {
  min: Namespace;
  max: Namespace;
  digest: Hex;
};

export type NamespaceMerkleMultiproof = {
  beginKey: bigint;
  endKey: bigint;
  sideNodes: NamespaceNode[];
};

export type SharesProof = {
  data: Hex[];
  shareProofs: NamespaceMerkleMultiproof[];
  namespace: Namespace;
  rowRoots: NamespaceNode[];
  rowProofs: BinaryMerkleProof[];
  attestationProof: AttestationProof;
};

export type Commit = {
  rollupId: bigint;
  txHash: Hex;
  namespace: Hex;
  blockHeight: bigint;
  commitId: Hex;
};

export const sharesProofAbiType = {
  name: 'sharesProof',
  type: 'tuple',
  components: [
    {
      name: 'data',
      type: 'bytes[]',
    },
    {
      name: 'shareProofs',
      type: 'tuple[]',
      components: [
        {
          name: 'beginKey',
          type: 'uint256',
        },
        {
          name: 'endKey',
          type: 'uint256',
        },
        {
          name: 'sideNodes',
          type: 'tuple[]',
          components: [
            {
              name: 'min',
              type: 'tuple',
              components: [
                {
                  name: 'version',
                  type: 'bytes1',
                },
                {
                  name: 'id',
                  type: 'bytes28',
                },
              ],
            },
            {
              name: 'max',
              type: 'tuple',
              components: [
                {
                  name: 'version',
                  type: 'bytes1',
                },
                {
                  name: 'id',
                  type: 'bytes28',
                },
              ],
            },
            {
              name: 'digest',
              type: 'bytes32',
            },
          ],
        },
      ],
    },
    {
      name: 'namespace',
      type: 'tuple',
      components: [
        {
          name: 'version',
          type: 'bytes1',
        },
        {
          name: 'id',
          type: 'bytes28',
        },
      ],
    },
    {
      name: 'rowRoots',
      type: 'tuple[]',
      components: [
        {
          name: 'min',
          type: 'tuple',
          components: [
            {
              name: 'version',
              type: 'bytes1',
            },
            {
              name: 'id',
              type: 'bytes28',
            },
          ],
        },
        {
          name: 'max',
          type: 'tuple',
          components: [
            {
              name: 'version',
              type: 'bytes1',
            },
            {
              name: 'id',
              type: 'bytes28',
            },
          ],
        },
        {
          name: 'digest',
          type: 'bytes32',
        },
      ],
    },
    {
      name: 'rowProofs',
      type: 'tuple[]',
      components: [
        {
          name: 'sideNodes',
          type: 'bytes32[]',
        },
        {
          name: 'key',
          type: 'uint256',
        },
        {
          name: 'numLeaves',
          type: 'uint256',
        },
      ],
    },
    {
      name: 'attestationProof',
      type: 'tuple',
      components: [
        {
          name: 'tupleRootNonce',
          type: 'uint256',
        },
        {
          name: 'tuple',
          type: 'tuple',
          components: [
            {
              name: 'height',
              type: 'uint256',
            },
            {
              name: 'dataRoot',
              type: 'bytes32',
            },
          ],
        },
        {
          name: 'proof',
          type: 'tuple',
          components: [
            {
              name: 'sideNodes',
              type: 'bytes32[]',
            },
            {
              name: 'key',
              type: 'uint256',
            },
            {
              name: 'numLeaves',
              type: 'uint256',
            },
          ],
        },
      ],
    },
  ],
};
