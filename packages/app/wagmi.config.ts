import { defineConfig } from '@wagmi/cli'
import { actions, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions({
      getContract: true,
      readContract: true,
      prepareWriteContract: true,
      watchContractEvent: false,
    }),
    hardhat({
      project: '../hardhat',
      deployments: {
        BrunchClub: {
          84531: '0xebaD9edb196d6139f846623C8fBcd1CC5A48E78e',
        },
      },
    }),
  ],
})
