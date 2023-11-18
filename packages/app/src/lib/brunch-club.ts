import { brunchClubABI } from "@/abis";
import { RpcTransactionRequest, encodeFunctionData, getAddress } from "viem";

export const CONTRACT_ADDRESS = '0x7C035d20e863c52B57de37090bf5066efDB0D36c'

export function acceptMatch(from: string, address: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: "acceptMatch",
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
      functionName: "rejectMatch",
      args: [getAddress(address)],
    }),
  }
}

export function contractRegister(from: string, eoa: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: "register",
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
      functionName: "updateProfileDescription",
      args: [description],
    }),
  }
}

export function updateProfileName(from: string, name: string): RpcTransactionRequest {
  return {
    from: getAddress(from),
    to: CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: brunchClubABI,
      functionName: "updateName",
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
      functionName: "updateObjectives",
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
      functionName: "updateExpertise",
      args: [expertise],
    }),
  }
}