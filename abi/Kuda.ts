export const KudaAbi = [
  {
    type: 'function',
    name: 'CHALLENGE_BOND',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'CHALLENGE_PERIOD',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'COUNTER_CHALLENGE_PERIOD',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'FULL_WITHDRAW_DELAY',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MAX_SLASHABLE_PERCENTAGE_WAD',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MIN_CLIENT_BALANCE',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MIN_OPERATOR_BOND',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'SLASHING_PERCENTAGE',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'cancelOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'celestiaVerifier',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IVerifier',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'challengeData',
    inputs: [
      {
        name: 'taskId',
        type: 'bytes16',
        internalType: 'bytes16',
      },
    ],
    outputs: [
      {
        name: 'challenger',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'timeStamp',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'status',
        type: 'uint8',
        internalType: 'enum ChallengeStatus',
      },
      {
        name: 'isNoOp',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'completeOwnershipHandover',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'core',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'createChallenge',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'taskId',
        type: 'bytes16',
        internalType: 'bytes16',
      },
      {
        name: 'aggregatorSignature',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'commitment',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'daLayer',
        type: 'uint8',
        internalType: 'enum DALayer',
      },
      {
        name: 'submissionTime',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'clientAddress',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'rewardToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'rewardAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createCounterChallenge',
    inputs: [
      {
        name: 'taskId',
        type: 'bytes16',
        internalType: 'bytes16',
      },
      {
        name: 'proof',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'eip4844Verifier',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IVerifier',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'finishChallenge',
    inputs: [
      {
        name: 'taskId',
        type: 'bytes16',
        internalType: 'bytes16',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'finishFullWithdraw',
    inputs: [
      {
        name: 'withdrawHash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'finishUpdateStakeHook',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'queuedStakeUpdate',
        type: 'tuple',
        internalType: 'struct IBaseDSS.QueuedStakeUpdate',
        components: [
          {
            name: 'nonce',
            type: 'uint48',
            internalType: 'uint48',
          },
          {
            name: 'startTimestamp',
            type: 'uint48',
            internalType: 'uint48',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'updateRequest',
            type: 'tuple',
            internalType: 'struct IBaseDSS.StakeUpdateRequest',
            components: [
              {
                name: 'vault',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'dss',
                type: 'address',
                internalType: 'contract IBaseDSS',
              },
              {
                name: 'toStake',
                type: 'bool',
                internalType: 'bool',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getActiveVaults',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRegisteredOperators',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: '_aggregator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_core',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_celestiaVerifier',
        type: 'address',
        internalType: 'contract IVerifier',
      },
      {
        name: '_eip4844Verifier',
        type: 'address',
        internalType: 'contract IVerifier',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isOperatorJailed',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isOperatorRegistered',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'kudaAccount',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'operatorBond',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'bond',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: 'result',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownershipHandoverExpiresAt',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'proxiableUUID',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'registrationHook',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'extraData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'requestOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'requestUpdateStakeHook',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'newStake',
        type: 'tuple',
        internalType: 'struct IBaseDSS.StakeUpdateRequest',
        components: [
          {
            name: 'vault',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'dss',
            type: 'address',
            internalType: 'contract IBaseDSS',
          },
          {
            name: 'toStake',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'startFullWithdraw',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'withdrawHash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'submitOperatorBond',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'submitReceipt',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'taskId',
        type: 'bytes16',
        internalType: 'bytes16',
      },
      {
        name: 'aggregatorSignature',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'commitment',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'context',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'daLayer',
        type: 'uint8',
        internalType: 'enum DALayer',
      },
      {
        name: 'submissionTime',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'clientAddress',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'rewardToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'rewardAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'submittedReceipt',
    inputs: [
      {
        name: 'taskId',
        type: 'bytes16',
        internalType: 'bytes16',
      },
    ],
    outputs: [
      {
        name: 'daLayer',
        type: 'uint8',
        internalType: 'enum DALayer',
      },
      {
        name: 'context',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'commitment',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'submissionTime',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'unregistrationHook',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'upgradeToAndCall',
    inputs: [
      {
        name: 'newImplementation',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'ChallengeCreated',
    inputs: [
      {
        name: 'taskId',
        type: 'bytes16',
        indexed: true,
        internalType: 'bytes16',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CounterChallengeCreated',
    inputs: [
      {
        name: 'taskId',
        type: 'bytes16',
        indexed: true,
        internalType: 'bytes16',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverCanceled',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverRequested',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'oldOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ReceiptSubmitted',
    inputs: [
      {
        name: 'taskId',
        type: 'bytes16',
        indexed: true,
        internalType: 'bytes16',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'commitment',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Upgraded',
    inputs: [
      {
        name: 'implementation',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AmountBelowMinBalance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CallerNotCore',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotCounterChallengeNoOp',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ChallengeAlreadyCreated',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ChallengeAlreadyFinalized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ChallengePeriodIsOver',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ChallengePeriodNotOver',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ChallengePeriodNotStarted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CounterChallengePeriodNotOver',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CounterChallengePeriodOver',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FailedToDepositChallengeBond',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FailedToRewardChallenger',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FailedToRewardCounterChallenger',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidInitialization',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NewOwnerIsZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoChallengeForGivenTaskId',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoChallengeForTaskId',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoHandoverRequest',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotAggregator',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughBondSubmitted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughETHForChallenge',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughFunds',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotInitializing',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SenderNotOperator',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SignatureVerifactionFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SubmissionTimeOver',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Unauthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UnauthorizedCallContext',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UpgradeFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'WithdrawDelayNotPassed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'WithdrawNotFound',
    inputs: [],
  },
] as const;
