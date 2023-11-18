'use client'
import { useSmartAccount } from '@/context/Web3'
import { useQuery } from '@tanstack/react-query'
import { SITE_DESCRIPTION } from '@/utils/site'
import { createPublicClient, http } from 'viem'
import { baseGoerli } from 'viem/chains'
import { CONTRACT_ADDRESS } from '@/lib/brunch-club'
import { brunchClubABI } from '@/abis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LinkComponent } from '@/components/LinkComponent'

export default function Home() {
  const { smartAccountAddress } = useSmartAccount()
  const { data, isLoading } = useQuery({
    queryKey: [{ entity: 'all-matches', address: smartAccountAddress }],
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

      const currentMatches = matches
        .filter((match) => {
          return match.user1 === smartAccountAddress || match.user2 === smartAccountAddress
        })
        .map((match) => {
          return match.user1 === smartAccountAddress ? match.user2 : match.user1
        })

      const profiles = await Promise.all(
        currentMatches.map((address) => {
          return client.readContract({
            address: CONTRACT_ADDRESS,
            abi: brunchClubABI,
            functionName: 'getUser',
            args: [address],
          })
        })
      )

      return profiles
    },
  })

  return (
    <div className='flex flex-col gap-6'>
      <p>{SITE_DESCRIPTION}</p>
      <div className='flex gap-4'>
        {data ? (
          data.map((profile) => {
            return <RenderProfile profile={profile} />
          })
        ) : (
          <span className='loading loading-spinner'></span>
        )}
      </div>
    </div>
  )
}

const RenderProfile: React.FC<{
  profile: {
    user: string
    name: string
    description: string
    expertise: readonly string[]
    objectives: readonly string[]
    eoa: string
  }
}> = ({ profile }) => {
  return (
    <LinkComponent href={`/chat/${profile.eoa}`}>
      <div className='card card-compact w-96 bg-base-100 shadow-xl items-center'>
        <Avatar>
          {profile.user != null ? <AvatarImage src={`https://i.pravatar.cc/150?u=${profile.user}`} /> : null}
          <AvatarFallback>🥑</AvatarFallback>
        </Avatar>
        <div className='card-body'>
          <h2 className='card-title'>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      </div>
    </LinkComponent>
  )
}
