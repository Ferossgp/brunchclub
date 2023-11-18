"use client"
import { createPublicClient, getAddress, http } from "viem"
import { brunchClubABI } from '@/abis'
import { baseGoerli } from 'viem/chains'
import { useQuery } from '@tanstack/react-query'
import { CONTRACT_ADDRESS } from "@/lib/brunch-club"
import { FETCH_ATTESTATIONS } from "@/queries/eas"
import { graphQLClient } from "@/lib/eas"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ipfsURL } from "@/lib/utils"

export default function Component({ params }: { params: { address: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: [{ entity: 'profile', address: params.address }],
    enabled: params.address != null,
    queryFn: async () => {
      if (params.address == null) throw new Error('Missing address')
      const client = createPublicClient({
        chain: baseGoerli,
        transport: http(),
      })

      return client.readContract({
        address: CONTRACT_ADDRESS,
        abi: brunchClubABI,
        functionName: 'getUser',
        args: [getAddress(params.address)],
      })
    },
  })

  const { data: attestations, isLoading: isLoadingAttestations } = useQuery({
    queryKey: [{ entity: 'attestations', address: params.address }],
    enabled: params.address != null,
    queryFn: async () => {
      if (params.address == null) throw new Error('Missing address')

      console.log(getAddress(params.address))
      return graphQLClient.request<any>(FETCH_ATTESTATIONS, {
        "where": {
          "recipient": {
            "equals": getAddress(params.address)
          }
        }
      }).then(({ attestations }) => attestations)
    },
  })

  console.log(attestations)

  if (data == null) return null

  return (
    <div>
      <div className='flex flex-col items-center space-y-4 max-w-3xl mx-auto'>
        <Avatar>
          {data.avatar != null ? (
            <AvatarImage src={ipfsURL(data.avatar)} />
          ) : null}
          <AvatarFallback>🥑</AvatarFallback>
        </Avatar>
        <h2 className='text-2xl font-bold'>{data.name}</h2>
        <p className='text-center'>{data.description}</p>
        {isLoadingAttestations ? <div>Loading attestations...</div> :
          <p className='text-center'>{attestations?.length ?? 0} people have endorsed {data.name} expertise!</p>}
        <div className='flex flex-row gap-2'>
          {data.expertise?.map((expertise) => (
            <Button key={expertise} variant='secondary' size='sm'>
              {expertise}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}