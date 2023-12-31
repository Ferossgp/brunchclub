'use client'
import { brunchClubABI } from '@/abis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useSmartAccount } from '@/context/Web3'
import { CONTRACT_ADDRESS, acceptMatch, rejectMatch } from '@/lib/brunch-club'
import { createPublicClient, http, zeroAddress } from 'viem'
import { baseGoerli } from 'viem/chains'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ipfsURL } from '@/lib/utils'
import { graphQLClient } from '@/lib/eas'
import { FETCH_ATTESTATIONS } from '@/queries/eas'
import { useRouter } from 'next/navigation'

export default function Component() {
  const { sendSponsoredUserOperation, smartAccountAddress, eoaClient } = useSmartAccount()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: onAcceptPress, isPending: isAccepting } = useMutation({
    mutationFn: async (toAddress: string) => {
      if (!smartAccountAddress) return

      await sendSponsoredUserOperation(acceptMatch(smartAccountAddress, toAddress)).then(console.log)
    },
    onSettled: (_r, _e, variables) => {
      queryClient.invalidateQueries({
        queryKey: [{ entity: 'current-match', address: smartAccountAddress }],
      })
      router.push(`/chat/${variables}`)
    },
  })

  const { mutate: onRejectPress, isPending: isRejection } = useMutation({
    mutationFn: async (toAddress: string) => {
      if (!smartAccountAddress) return

      await sendSponsoredUserOperation(rejectMatch(smartAccountAddress, toAddress)).then(console.log)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [{ entity: 'current-match', address: smartAccountAddress }],
      })
      router.push(`/`)
    },
  })

  const { data: currentMatch, isLoading } = useQuery({
    queryKey: [{ entity: 'current-match', address: smartAccountAddress }],
    enabled: smartAccountAddress != null,
    queryFn: async () => {
      const client = createPublicClient({
        chain: baseGoerli,
        transport: http(),
      })

      const matches = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: brunchClubABI,
        functionName: 'getMatches',
      })

      const currentMatch = matches.filter((match) => {
        return match.user2 !== '0x5c9Ec83A02771C338B22cA59a9097C4a145dBBFA'
      }).find((match) => {
        return match.accepted === false && (match.user1 === smartAccountAddress || match.user2 === smartAccountAddress)
      })


      if (currentMatch) {
        const matchAccount = currentMatch.user1 === smartAccountAddress ? currentMatch.user2 : currentMatch.user1
        const user = await client.readContract({
          address: CONTRACT_ADDRESS,
          abi: brunchClubABI,
          functionName: 'getUser',
          args: [matchAccount],
        })

        console.log("has match", user)

        if (user.user == zeroAddress) return null

        return user
      }

      return null
    },
  })

  const { data: attestations, isLoading: isLoadingAttestations } = useQuery({
    queryKey: [{ entity: 'attestations', address: currentMatch?.user }],
    enabled: currentMatch?.user != null,
    queryFn: async () => {
      if (currentMatch?.user == null) throw new Error('Missing address')

      return graphQLClient.request<any>(FETCH_ATTESTATIONS, {
        "where": {
          "recipient": {
            "equals": currentMatch?.user
          }
        }
      }).then(({ attestations }) => attestations)
    },
  })

  if (isLoading || smartAccountAddress == null) return <div>Baking some sourdough bread (Loading)...</div>

  if (currentMatch == null) return <div>No match yet, please come back later!</div>

  return (
    <div className='flex flex-col items-center justify-center py-12 p-4'>
      <div className='flex flex-col items-center space-y-4'>
        <Avatar>
          {currentMatch.avatar != null ? (
            <AvatarImage src={ipfsURL(currentMatch.avatar)} />
          ) : null}
          <AvatarFallback>🥑</AvatarFallback>
        </Avatar>
        <h2 className='text-2xl font-bold'>{currentMatch.name}</h2>
        <p className='text-center'>{currentMatch.description}</p>
        <div className='flex flex-row gap-2'>
          {currentMatch.expertise?.map((expertise) => (
            <Button key={expertise} variant='secondary' size='sm'>
              {expertise}
            </Button>
          ))}
        </div>
        {isLoadingAttestations ? <div>Loading attestations...</div> :
          <p className='text-center'>{attestations?.length ?? 0} people have endorsed {currentMatch.name} expertise!</p>}
      </div>
      <div className='flex space-x-4 mt-8'>
        <button className='btn btn-wide btn-neutral' onClick={() => onRejectPress(currentMatch.user)}>
          {isRejection ? <span className='loading loading-spinner'></span> : null}
          Reject
        </button>
        <button className='btn btn-wide btn-success' onClick={() => onAcceptPress(currentMatch.user)}>
          {isAccepting ? <span className='loading loading-spinner'></span> : null}
          Accept
        </button>
      </div>
    </div>
  )
}
