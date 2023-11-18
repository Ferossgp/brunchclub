import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ipfsURL(hash: string): string {
  return `https://gateway.lighthouse.storage/ipfs/${hash}`
}