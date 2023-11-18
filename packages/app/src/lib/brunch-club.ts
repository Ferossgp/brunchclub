import { brunchClubABI } from "@/abis";
import { RpcTransactionRequest, encodeFunctionData, getAddress } from "viem";

export const CONTRACT_ADDRESS = '0x3a929436D1d8bB6672f919FAD373B1d1E28Be05c'

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