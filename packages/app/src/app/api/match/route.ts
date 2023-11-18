import { createPublicClient, http } from 'viem'
import { baseGoerli } from 'viem/chains'
import { brunchClubABI } from '@/abis'
import { CONTRACT_ADDRESS, addMatch, attestStatement } from '@/lib/brunch-club'
import { setupPaymaster } from './setupPaymaster'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { LightSmartContractAccount, getDefaultLightAccountFactoryAddress } from '@alchemy/aa-accounts'
import { LocalAccountSigner, getDefaultEntryPointAddress } from '@alchemy/aa-core'

const chain = baseGoerli
const rpcUrl = process.env.BASE_GOERLI_ALCHEMY_API_URL

const client = createPublicClient({
  chain: baseGoerli,
  transport: http(),
})

async function getAvaliableUsers() {
  const allUsers = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: brunchClubABI,
    functionName: 'getUsers',
  })

  console.log(allUsers)

  const matches = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: brunchClubABI,
    functionName: 'getMatches',
  })

  console.log(matches)

  const freeUsers = []
  for (const user of allUsers) {
    let avaliable = true
    for (const match of matches) {
      if (match.user1 === user || match.user2 === user) {
        avaliable = false
      }
    }
    if (avaliable) {
      freeUsers.push(user)
    }
  }
  return freeUsers
}

async function addNewMatch(user1: string, user2: string) {
  const localSigner = LocalAccountSigner.mnemonicToAccountSigner(process.env.MNEMONIC)

  const baseSigner = new AlchemyProvider({
    rpcUrl,
    chain,
    opts: {
      txMaxRetries: 60,
    },
  }).connect((provider) => {
    return new LightSmartContractAccount({
      chain,
      owner: localSigner,
      entryPointAddress: getDefaultEntryPointAddress(chain),
      factoryAddress: getDefaultLightAccountFactoryAddress(chain),
      rpcClient: provider,
    })
  })
  const smartAccountAddress = await baseSigner.getAddress()
  const smartAccountSigner = setupPaymaster(baseSigner, smartAccountAddress, chain.id)

  const storageWriteTxnHash = await smartAccountSigner.sendTransaction(addMatch(CONTRACT_ADDRESS, user1, user2))

  await client.waitForTransactionReceipt({ hash: storageWriteTxnHash })
}

async function makeAttestation(from: string, to: string, tag: string) {
  const localSigner = LocalAccountSigner.mnemonicToAccountSigner(process.env.MNEMONIC)

  const baseSigner = new AlchemyProvider({
    rpcUrl,
    chain,
    opts: {
      txMaxRetries: 60,
    },
  }).connect((provider) => {
    return new LightSmartContractAccount({
      chain,
      owner: localSigner,
      entryPointAddress: getDefaultEntryPointAddress(chain),
      factoryAddress: getDefaultLightAccountFactoryAddress(chain),
      rpcClient: provider,
    })
  })
  const smartAccountAddress = await baseSigner.getAddress()
  const smartAccountSigner = setupPaymaster(baseSigner, smartAccountAddress, chain.id)

  const storageWriteTxnHash = await smartAccountSigner.sendTransaction(attestStatement(from, to, 'test'))

  const res = await client.waitForTransactionReceipt({ hash: storageWriteTxnHash })

  console.log(res)
}

async function makeRandomMatches() {
  const freeUsers = await getAvaliableUsers()

  // const freeUsers = ['0x109282750F1030941e81b6c2551E7B1157A24EaB', '0x29369c3E2d9EC68f6f900C27de3eFb161133Cde7']

  console.log(freeUsers)

  while (freeUsers.length >= 2) {
    const user1 = freeUsers.pop()
    const user2 = freeUsers.pop()
    if (user1 && user2) {
      await addNewMatch(user1, user2)
    }
  }
}

export async function GET() {
  // await makeRandomMatches()

  // await makeAttestation(
  //   '0x109282750F1030941e81b6c2551E7B1157A24EaB',
  //   '0x5c9Ec83A02771C338B22cA59a9097C4a145dBBFA',
  //   'test'
  // )

  return Response.json({ data: 'World!' })
}
