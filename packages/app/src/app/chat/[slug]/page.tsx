'use client'
import { useSmartAccount } from '@/context/Web3'
import { ChatUIProvider, ChatView, MODAL_POSITION_TYPE } from '@pushprotocol/uiweb'
import { viemSignerType } from '@pushprotocol/restapi'
import { useQuery, useMutation } from '@tanstack/react-query'
import { createPublicClient, getAddress, http } from 'viem'
import { baseGoerli } from 'viem/chains'
import { CONTRACT_ADDRESS, attestStatement, reportGhosted, reportJoined } from '@/lib/brunch-club'
import { brunchClubABI } from '@/abis'
import { useLocalStorage } from 'usehooks-ts'

export default function PChat({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: [{ entity: 'profile', address: params.slug }],
    enabled: params.slug != null,
    queryFn: async () => {
      if (params.slug == null) throw new Error('No smart account address')
      const client = createPublicClient({
        chain: baseGoerli,
        transport: http(),
      })

      return client.readContract({
        address: CONTRACT_ADDRESS,
        abi: brunchClubABI,
        functionName: 'getUser',
        args: [getAddress(params.slug)],
      })
    },
  })

  const { eoa, eoaClient } = useSmartAccount()

  if (data == null || eoaClient == null || eoa?.address == null) {
    return <div>Growing some avocados...</div>
  }

  const randomSkill = data.expertise.length > 0 ? data.expertise[Math.floor(Math.random() * data.expertise.length)] : undefined
  return (
    <>
      <h2>Live chat with {data.name}</h2>
      <div className='grid grid-cols-12 gap-4'>
        <div style={{ height: '75vh' }} className='col-span-9'>
          <ChatUIProvider signer={eoaClient as viemSignerType}>
            <ChatView chatId={data.eoa} />
          </ChatUIProvider>
        </div>
        <div className='col-span-3 space-y-2'>
          <ConfirmMatch address={data.user} />
          {randomSkill != null ? (
            <EndorseSkill address={data.user} tag={randomSkill} />
          ) : null}
        </div>
      </div>
    </>
  )
}

const ConfirmMatch: React.FC<{
  address: string
}> = ({ address }) => {
  // TODO: check onchain status
  const [reported, setReported] = useLocalStorage(`ghost-report-${address}`, false)

  const { sendSponsoredUserOperation, smartAccountAddress } = useSmartAccount()
  const { mutate: onReportGhosted, error } = useMutation({
    mutationFn: async () => {
      if (!smartAccountAddress) return

      await sendSponsoredUserOperation(reportGhosted(smartAccountAddress, address)).then(console.log)

      setReported(true)
    },
  })

  const { mutate: onReportJoined } = useMutation({
    mutationFn: async () => {
      if (!smartAccountAddress) return

      await sendSponsoredUserOperation(reportJoined(smartAccountAddress, address)).then(console.log)

      setReported(true)
    },
  })

  if (reported) return null

  return (
    <div>
      <div className='card w-full bg-primary text-primary-content'>
        <div className='card-body'>
          <h2 className='card-title'>Did you met?</h2>
          <p>Let us know if your match ghosted you!</p>
          <div className='card-actions pt-2'>
            <button className='btn btn-neutral flex-1' onClick={() => onReportGhosted()}>
              Ghosted...
            </button>
            <button className='btn flex-1' onClick={() => onReportJoined()}>
              We MET!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const EndorseSkill: React.FC<{
  address: string
  tag: string
}> = ({ tag, address }) => {
  const [endorsed, setEndorsed] = useLocalStorage(`endorsed-${address}`, false)
  const { sendSponsoredUserOperation, smartAccountAddress } = useSmartAccount()

  const { mutate: onEndorse } = useMutation({
    mutationFn: async () => {
      if (!smartAccountAddress) return

      await sendSponsoredUserOperation(attestStatement(smartAccountAddress, address, tag)).then(console.log)

      setEndorsed(true)
    },
  })

  if (endorsed) return null

  return (
    <div className='col-span-3'>
      <div className='card w-full bg-primary text-primary-content'>
        <div className='card-body'>
          <h2 className='card-title uppercase'>{tag}</h2>
          <p>Would you like to endorse {tag} skill?</p>
          <div className='card-actions pt-2'>
            <button className='btn btn-neutral flex-1' onClick={() => setEndorsed(true)}>
              Skip
            </button>
            <button className='btn flex-1' onClick={() => onEndorse()}>
              Endorse!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
