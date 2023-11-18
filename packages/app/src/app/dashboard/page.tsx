'use client'
import { brunchClubABI } from "@/abis"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSmartAccount } from "@/context/Web3"
import { CONTRACT_ADDRESS, acceptMatch, rejectMatch } from "@/lib/brunch-club"
import { createPublicClient, http, zeroAddress } from "viem"
import { baseGoerli } from "viem/chains"
import { useQuery, useMutation } from '@tanstack/react-query'

export default function Component() {
  const { sendSponsoredUserOperation, smartAccountAddress, eoaClient } = useSmartAccount()
  const toAddress = zeroAddress

  const { mutate: onAcceptPress } = useMutation({
    mutationFn: async () => {
      if (!smartAccountAddress) return

      await sendSponsoredUserOperation(acceptMatch(smartAccountAddress, toAddress)).then(console.log)
    }
  })

  const onRejectPress = useMutation({
    mutationFn: async () => {
      if (!smartAccountAddress) return

      await sendSponsoredUserOperation(rejectMatch(smartAccountAddress, toAddress)).then(console.log)
    }
  })

  const { data: currentMatch, isLoading } = useQuery({
    queryKey: [{ entity: 'current-match', address: smartAccountAddress }],
    queryFn: async () => {
      const client = createPublicClient({
        chain: baseGoerli,
        transport: http()
      })

      const matches = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: brunchClubABI,
        functionName: "getMatches",
      })

      const currentMatch = matches.find((match) => {
        return match.accepted === false && (
          match.user1 === smartAccountAddress || match.user2 === smartAccountAddress
        )
      })

      if (currentMatch) {
        const matchAccount = currentMatch.user1 === smartAccountAddress ? currentMatch.user2 : currentMatch.user1
        return matchAccount
      }

      return null
    }
  })

  if (isLoading) return (
    <div>
      Loading...
    </div>
  )

  if (currentMatch == null) return (
    <div>
      No match yet, please come back later!
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <pre>{JSON.stringify(
        currentMatch,
        (_, v) => typeof v === 'bigint' ? v.toString() : v
      )}</pre>
      <div className="flex flex-col items-center space-y-4">
        <Avatar>
          <AvatarFallback />
        </Avatar>
        <h2 className="text-2xl font-bold">Jane Doe</h2>
        <p className="text-center">
          Enthusiastic coffee lover. Passionate about trying different types of coffee around the world.
        </p>
      </div>
      <div className="flex space-x-4 mt-8">
        <Button className="w-36 py-2 text-[#bd1e59] dark:text-white border-white" variant="outline" onClick={onRejectPress}>
          Reject
        </Button>
        <Button className="w-36 py-2 bg-white text-[#bd1e59]" onClick={onAcceptPress}>Accept</Button>
      </div>
    </div>
  )
}
