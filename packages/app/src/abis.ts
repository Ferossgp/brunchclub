import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractMode,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BrunchClub
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e)
 */
export const brunchClubABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: 'eas', internalType: 'contract IEAS', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'InvalidEAS' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user1', internalType: 'address', type: 'address', indexed: true },
      { name: 'user2', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'MatchConfirmed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user1', internalType: 'address', type: 'address', indexed: true },
      { name: 'user2', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'MatchCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user1', internalType: 'address', type: 'address', indexed: true },
      { name: 'user2', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'MatchRejected',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'user', internalType: 'address', type: 'address', indexed: true }],
    name: 'NewUser',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'acceptMatch',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'accepted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user1', internalType: 'address', type: 'address' },
      { name: 'user2', internalType: 'address', type: 'address' },
    ],
    name: 'addMatch',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'allUsers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'string', type: 'string' },
    ],
    name: 'attestStatement',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'epoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getMatches',
    outputs: [
      {
        name: '',
        internalType: 'struct BrunchClub.Match[]',
        type: 'tuple[]',
        components: [
          { name: 'user1', internalType: 'address', type: 'address' },
          { name: 'user2', internalType: 'address', type: 'address' },
          { name: 'epoch', internalType: 'uint256', type: 'uint256' },
          { name: 'accepted', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUser',
    outputs: [
      {
        name: '',
        internalType: 'struct BrunchClub.User',
        type: 'tuple',
        components: [
          { name: 'user', internalType: 'address', type: 'address' },
          { name: 'eoa', internalType: 'address', type: 'address' },
          { name: 'avatar', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'objectives', internalType: 'string[]', type: 'string[]' },
          { name: 'expertise', internalType: 'string[]', type: 'string[]' },
          { name: 'xp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getUsers',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'incrementEpoch', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'matches',
    outputs: [
      { name: 'user1', internalType: 'address', type: 'address' },
      { name: 'user2', internalType: 'address', type: 'address' },
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'accepted', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'eoa', internalType: 'address', type: 'address' }],
    name: 'register',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'rejectMatch',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'skipEpoch',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'skippedEpoch',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'ipfs', internalType: 'string', type: 'string' }],
    name: 'updateAvatar',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_expertise', internalType: 'string[]', type: 'string[]' }],
    name: 'updateExpertise',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'updateName',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_objectives', internalType: 'string[]', type: 'string[]' }],
    name: 'updateObjectives',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'desc', internalType: 'string', type: 'string' }],
    name: 'updateProfileDescription',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'userGhosted',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'userJoined',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'users',
    outputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'eoa', internalType: 'address', type: 'address' },
      { name: 'avatar', internalType: 'string', type: 'string' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'xp', internalType: 'uint256', type: 'uint256' },
    ],
  },
] as const

/**
 * [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e)
 */
export const brunchClubAddress = {
  84531: '0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e',
} as const

/**
 * [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e)
 */
export const brunchClubConfig = { address: brunchClubAddress, abi: brunchClubABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEAS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ieasABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address', indexed: true },
      { name: 'attester', internalType: 'address', type: 'address', indexed: true },
      { name: 'uid', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'schemaUID', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'Attested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address', indexed: true },
      { name: 'attester', internalType: 'address', type: 'address', indexed: true },
      { name: 'uid', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'schemaUID', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'Revoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'revoker', internalType: 'address', type: 'address', indexed: true },
      { name: 'data', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'timestamp', internalType: 'uint64', type: 'uint64', indexed: true },
    ],
    name: 'RevokedOffchain',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'data', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'timestamp', internalType: 'uint64', type: 'uint64', indexed: true },
    ],
    name: 'Timestamped',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct AttestationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData',
            type: 'tuple',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'attest',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'delegatedRequest',
        internalType: 'struct DelegatedAttestationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData',
            type: 'tuple',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signature',
            internalType: 'struct Signature',
            type: 'tuple',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'attestByDelegation',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getAttestation',
    outputs: [
      {
        name: '',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'revoker', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getRevokeOffchain',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getSchemaRegistry',
    outputs: [{ name: '', internalType: 'contract ISchemaRegistry', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getTimestamp',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isAttestationValid',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiRequests',
        internalType: 'struct MultiAttestationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'multiAttest',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiDelegatedRequests',
        internalType: 'struct MultiDelegatedAttestationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signatures',
            internalType: 'struct Signature[]',
            type: 'tuple[]',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'multiAttestByDelegation',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiRequests',
        internalType: 'struct MultiRevocationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'multiRevoke',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiDelegatedRequests',
        internalType: 'struct MultiDelegatedRevocationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signatures',
            internalType: 'struct Signature[]',
            type: 'tuple[]',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'revoker', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'multiRevokeByDelegation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'multiRevokeOffchain',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'multiTimestamp',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct RevocationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData',
            type: 'tuple',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'revoke',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'delegatedRequest',
        internalType: 'struct DelegatedRevocationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData',
            type: 'tuple',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signature',
            internalType: 'struct Signature',
            type: 'tuple',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'revoker', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'revokeByDelegation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32', type: 'bytes32' }],
    name: 'revokeOffchain',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32', type: 'bytes32' }],
    name: 'timestamp',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISchemaRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSchemaRegistryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'uid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'registerer', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'schema',
        internalType: 'struct SchemaRecord',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'resolver', internalType: 'contract ISchemaResolver', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'schema', internalType: 'string', type: 'string' },
        ],
        indexed: false,
      },
    ],
    name: 'Registered',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getSchema',
    outputs: [
      {
        name: '',
        internalType: 'struct SchemaRecord',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'resolver', internalType: 'contract ISchemaResolver', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'schema', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'schema', internalType: 'string', type: 'string' },
      { name: 'resolver', internalType: 'contract ISchemaResolver', type: 'address' },
      { name: 'revocable', internalType: 'bool', type: 'bool' },
    ],
    name: 'register',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISchemaResolver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSchemaResolverABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'attest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'isPayable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiAttest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiRevoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'revoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const messageABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'purpose', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'SetMessage',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'message',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_message', internalType: 'string', type: 'string' }],
    name: 'setMessage',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link brunchClubABI}__.
 *
 * [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e)
 */
export function getBrunchClub(
  config: Omit<GetContractArgs, 'abi' | 'address'> & { chainId?: keyof typeof brunchClubAddress }
) {
  return getContract({ abi: brunchClubABI, address: brunchClubAddress[84531], ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link brunchClubABI}__.
 *
 * [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e)
 */
export function readBrunchClub<
  TAbi extends readonly unknown[] = typeof brunchClubABI,
  TFunctionName extends string = string
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof brunchClubAddress
  }
) {
  return readContract({
    abi: brunchClubABI,
    address: brunchClubAddress[84531],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link brunchClubABI}__.
 *
 * [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e)
 */
export function writeBrunchClub<
  TFunctionName extends string,
  TMode extends WriteContractMode,
  TChainId extends number = keyof typeof brunchClubAddress
>(
  config:
    | (Omit<WriteContractPreparedArgs<typeof brunchClubABI, TFunctionName>, 'abi' | 'address'> & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof brunchClubAddress
      })
    | (Omit<WriteContractUnpreparedArgs<typeof brunchClubABI, TFunctionName>, 'abi' | 'address'> & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof brunchClubAddress
      })
) {
  return writeContract({
    abi: brunchClubABI,
    address: brunchClubAddress[84531],
    ...config,
  } as unknown as WriteContractArgs<typeof brunchClubABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link brunchClubABI}__.
 *
 * [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e)
 */
export function prepareWriteBrunchClub<
  TAbi extends readonly unknown[] = typeof brunchClubABI,
  TFunctionName extends string = string
>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof brunchClubAddress
  }
) {
  return prepareWriteContract({
    abi: brunchClubABI,
    address: brunchClubAddress[84531],
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function getIeas(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: ieasABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function readIeas<TAbi extends readonly unknown[] = typeof ieasABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: ieasABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function writeIeas<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof ieasABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof ieasABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: ieasABI, ...config } as unknown as WriteContractArgs<typeof ieasABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function prepareWriteIeas<
  TAbi extends readonly unknown[] = typeof ieasABI,
  TFunctionName extends string = string
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({ abi: ieasABI, ...config } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function getISchemaRegistry(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: iSchemaRegistryABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function readISchemaRegistry<
  TAbi extends readonly unknown[] = typeof iSchemaRegistryABI,
  TFunctionName extends string = string
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({ abi: iSchemaRegistryABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function writeISchemaRegistry<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof iSchemaRegistryABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof iSchemaRegistryABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: iSchemaRegistryABI, ...config } as unknown as WriteContractArgs<
    typeof iSchemaRegistryABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function prepareWriteISchemaRegistry<
  TAbi extends readonly unknown[] = typeof iSchemaRegistryABI,
  TFunctionName extends string = string
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({ abi: iSchemaRegistryABI, ...config } as unknown as PrepareWriteContractConfig<
    TAbi,
    TFunctionName
  >)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function getISchemaResolver(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: iSchemaResolverABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function readISchemaResolver<
  TAbi extends readonly unknown[] = typeof iSchemaResolverABI,
  TFunctionName extends string = string
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({ abi: iSchemaResolverABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function writeISchemaResolver<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof iSchemaResolverABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof iSchemaResolverABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: iSchemaResolverABI, ...config } as unknown as WriteContractArgs<
    typeof iSchemaResolverABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function prepareWriteISchemaResolver<
  TAbi extends readonly unknown[] = typeof iSchemaResolverABI,
  TFunctionName extends string = string
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({ abi: iSchemaResolverABI, ...config } as unknown as PrepareWriteContractConfig<
    TAbi,
    TFunctionName
  >)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link messageABI}__.
 */
export function getMessage(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: messageABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageABI}__.
 */
export function readMessage<TAbi extends readonly unknown[] = typeof messageABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>
) {
  return readContract({ abi: messageABI, ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageABI}__.
 */
export function writeMessage<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof messageABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof messageABI, TFunctionName>, 'abi'>
) {
  return writeContract({ abi: messageABI, ...config } as unknown as WriteContractArgs<typeof messageABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link messageABI}__.
 */
export function prepareWriteMessage<
  TAbi extends readonly unknown[] = typeof messageABI,
  TFunctionName extends string = string
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({ abi: messageABI, ...config } as unknown as PrepareWriteContractConfig<
    TAbi,
    TFunctionName
  >)
}
