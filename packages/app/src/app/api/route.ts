import { PushAPI, CONSTANTS } from '@pushprotocol/restapi'
import { createWalletClient, custom, http } from 'viem'
import { baseGoerli } from 'viem/chains'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

export async function testPushChat() {
  const privateKey = generatePrivateKey()
  const account = privateKeyToAccount(privateKey)

  const client = createWalletClient({
    account,
    chain: baseGoerli,
    transport: http(),
  })

  // Initialize wallet user
  // 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
  const userAlice = await PushAPI.initialize(client, { env: CONSTANTS.ENV.STAGING })

  // This will be the wallet address of the recipient
  const bobWalletAddress = '0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666'

  // Send a message to Bob
  const aliceMessagesBob = await userAlice.chat.send(bobWalletAddress, {
    content: "Gm gm! It's a me... Mario",
  })

  const myChats = await userAlice.chat.list('CHATS')
  console.log(myChats)
}

export async function GET() {
  await testPushChat()
  return Response.json({ data: 'Hello World!' })
}
