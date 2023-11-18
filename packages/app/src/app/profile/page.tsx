'use client'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { INTERESTS, OBJECTIVES } from './constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSmartAccount } from '@/context/Web3'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import {
  CONTRACT_ADDRESS,
  updateAvatar,
  updateExpertise,
  updateObjectives,
  updateProfileDescription,
  updateProfileName,
} from '@/lib/brunch-club'
import { cn, ipfsURL } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createPublicClient, http } from 'viem'
import { baseGoerli } from 'viem/chains'
import { brunchClubABI } from '@/abis'
import { Input } from '@/components/ui/input'
import lighthouse from '@lighthouse-web3/sdk';

const AvatarInput: React.FC<{ avatar?: string }> = ({ avatar }) => {
  const { smartAccountAddress, sendSponsoredUserOperation } = useSmartAccount()
  const [preview, setPreview] = useState<string | null>(null)
  const progressCallback = (progressData: any) => {
    // let percentageDone =
    //   100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(progressData);
  };

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (file: FileList | null) => {
      if (smartAccountAddress == null || file == null) return
      setPreview(URL.createObjectURL(file[0]))
      const output = await lighthouse.upload(file, 'bfcfa5f9.3a3e5ab7fad2479a93573c7a02ffd32f', undefined, undefined, progressCallback);
      await sendSponsoredUserOperation(updateAvatar(smartAccountAddress, output.data.Hash))
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [{ entity: 'profile', address: smartAccountAddress }],
      })
    },
  })

  const url = preview ?? (avatar ? ipfsURL(avatar) : null)
  return (
    <div className='flex flex-col justify-center space-x-4 items-center'>
      <label htmlFor="avatar-input">
        <Avatar>
          {url ? <AvatarImage src={url} /> : undefined}
          <AvatarFallback>{
            isPending ? <span className='loading loading-spinner'></span> : '🥑'
          }</AvatarFallback>
        </Avatar>
      </label>

      <input
        id='avatar-input'
        name='avatar-input'
        onChange={e => mutate(e.target.files)} type="file"
        className='hidden'
        accept="image/jpeg"
      />
    </div>
  )
}

const ProfileForm: React.FC<{
  name: string
  bio: string
  avatar?: string
  objectives: string[]
  interests: string[]
}> = ({
  avatar,
  name: nameParam = '',
  bio: bioParam = '',
  objectives: objectivesParam = [],
  interests: interestsParam = [],
}) => {
    const { smartAccountAddress, sendSponsoredUserOperation } = useSmartAccount()
    const [name, setName] = useState<string>(nameParam)
    const [bio, setBio] = useState(bioParam)
    const [objectives, setObjectives] = useState<string[]>(objectivesParam)
    const [interests, setInterests] = useState<string[]>(interestsParam)
    const queryClient = useQueryClient()
    const { mutate, error, isPending } = useMutation({
      mutationFn: async () => {
        if (smartAccountAddress == null) return

        if (name !== nameParam) {
          await sendSponsoredUserOperation(updateProfileName(smartAccountAddress, name))
        }
        if (bio !== bioParam) {
          await sendSponsoredUserOperation(updateProfileDescription(smartAccountAddress, bio))
        }
        if (JSON.stringify(objectives) !== JSON.stringify(objectivesParam)) {
          await sendSponsoredUserOperation(updateObjectives(smartAccountAddress, objectives))
        }
        if (JSON.stringify(interests) !== JSON.stringify(interestsParam)) {
          await sendSponsoredUserOperation(updateExpertise(smartAccountAddress, interests))
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [{ entity: 'profile', address: smartAccountAddress }],
        })
      },
    })

    return (
      <div className='w-full max-w-3xl mx-auto space-y-6 py-6'>
        <h1 className='text-3xl font-bold text-center'>Profile</h1>
        <p className='text-zinc-500 dark:text-zinc-400 text-center'>
          Customize your profile to get the most out of your brunch club chats
        </p>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <AvatarInput avatar={avatar} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input id='name' placeholder='Enter your full name' onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='bio'>Bio</Label>
            <Textarea
              className='min-h-[100px]'
              id='bio'
              placeholder='Tell us a little bit about yourself'
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <div className='space-y-2'>
            <div>
              <p className='font-bold text-base'>Objectives</p>
              <p className='text-base'>Select up to 3 objectives. These will help us find relevant matches.</p>
            </div>
            <div className='flex flex-wrap gap-2' id='objectives'>
              {OBJECTIVES.map((item, index) => (
                <Button
                  className='py-1 px-2 rounded'
                  variant={objectives.includes(item.title) ? 'default' : 'secondary'}
                  key={index}
                  onClick={() => {
                    if (objectives.includes(item.title)) {
                      setObjectives(objectives.filter((i) => i !== item.title))
                    } else {
                      setObjectives([...objectives, item.title])
                    }
                  }}>
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            <div>
              <p className='font-bold text-base'>Interests and expertise</p>
              <p className='text-base'>These will be public and users can attest them after a chat with you!</p>
            </div>
            <div className='flex flex-wrap gap-2' id='interests'>
              {INTERESTS.map((item, index) => (
                <Button
                  className='py-1 px-2 rounded'
                  variant={interests.includes(item.title) ? 'default' : 'secondary'}
                  key={index}
                  onClick={() => {
                    if (interests.includes(item.title)) {
                      setInterests(interests.filter((i) => i !== item.title))
                    } else {
                      setInterests([...interests, item.title])
                    }
                  }}>
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
          <button className={cn('btn w-full')} onClick={() => mutate()} disabled={isPending}>
            {isPending ? <span className='loading loading-spinner'></span> : null}
            Save Profile
          </button>
        </div>
      </div>
    )
  }

export default function Component() {
  const { smartAccountAddress, sendSponsoredUserOperation } = useSmartAccount()

  const { data, isLoading } = useQuery({
    queryKey: [{ entity: 'profile', address: smartAccountAddress }],
    enabled: smartAccountAddress != null,
    queryFn: async () => {
      if (smartAccountAddress == null) throw new Error('No smart account address')
      const client = createPublicClient({
        chain: baseGoerli,
        transport: http(),
      })

      return client.readContract({
        address: CONTRACT_ADDRESS,
        abi: brunchClubABI,
        functionName: 'getUser',
        args: [smartAccountAddress],
      })
    },
  })

  if (data == null || isLoading) {
    return <div>Brewing coffee, wait a bit...</div>
  }

  return (
    <ProfileForm
      avatar={data.avatar}
      name={data.name}
      bio={data.description}
      objectives={[...data.objectives]}
      interests={[...data.expertise]}
    />
  )
}
