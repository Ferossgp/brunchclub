'use client'
import { useSmartAccount } from '@/context/Web3'
import { ChatUIProvider, ChatView, MODAL_POSITION_TYPE } from '@pushprotocol/uiweb'
import { CONSTANTS, PushAPI, viemSignerType } from '@pushprotocol/restapi'

//0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666 example
export default function PChat({ params }: { params: { slug: string } }) {
  const { eoa, eoaClient } = useSmartAccount()

  if (eoaClient == null || eoa.address == null) {
    return <div>loading...</div>
  }

  console.log(eoa.address)

  return (
    <>
      <h2>Live chat with {params.slug}</h2>
      <div style={{ height: '75vh', margin: '20px auto' }}>
        <ChatUIProvider signer={eoaClient as viemSignerType}>
          <ChatView chatId={params.slug} />
        </ChatUIProvider>
      </div>
    </>
  )
}
