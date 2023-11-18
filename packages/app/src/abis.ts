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
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'users',
    outputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'eoa', internalType: 'address', type: 'address' },
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
