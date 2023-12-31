import { brunchClubABI } from '@/abis'
import { RpcTransactionRequest, encodeFunctionData, getAddress } from 'viem'

export const CONTRACT_ADDRESS = '0x1e35aC1C4E9713EA684F14817B0F7EdA2aa4CE0B'

export function acceptMatch(from: string, address: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'acceptMatch',
      args: [getAddress(address)],
    }),
  }
}

export function rejectMatch(from: string, address: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'rejectMatch',
      args: [getAddress(address)],
    }),
  }
}

export function addMatch(from: string, address1: string, address2: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'addMatch',
      args: [getAddress(address1), getAddress(address2)],
    }),
  }
}

export function attestStatement(from: string, to: string, tag: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'attestStatement',
      args: [
        '0x1883d7a418f73d92bcf3160c13fe18cfd53303cd7918e891b88da8ec00ae8b48',
        getAddress(from),
        getAddress(to),
        tag,
      ],
    }),
  }
}

export function contractRegister(from: string, eoa: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'register',
      args: [getAddress(eoa)],
    }),
  }
}

export function updateProfileDescription(from: string, description: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'updateProfileDescription',
      args: [description],
    }),
  }
}

export function updateAvatar(from: string, ipfsHash: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'updateAvatar',
      args: [ipfsHash],
    }),
  }
}

export function updateProfileName(from: string, name: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'updateName',
      args: [name],
    }),
  }
}

export function updateObjectives(from: string, objectives: string[]): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'updateObjectives',
      args: [objectives],
    }),
  }
}

export function updateExpertise(from: string, expertise: string[]): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'updateExpertise',
      args: [expertise],
    }),
  }
}

export function reportGhosted(from: string, address: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'userGhosted',
      args: [getAddress(address)],
    }),
  }
}

export function reportJoined(from: string, address: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: 'userJoined',
      args: [getAddress(address)],
    }),
  }
}