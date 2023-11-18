import { HardhatUserConfig } from "hardhat/config"
import { join } from "path"
import dotenv from "dotenv"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-viem";

import path from "path";

dotenv.config() // project root
dotenv.config({ path: join(process.cwd(), "../../.env") }) // workspace root

const config: HardhatUserConfig = {
    solidity: "0.8.21",
    paths: {
        sources: path.resolve(__dirname, "./"),
        artifacts: path.resolve(__dirname, "./artifacts"),
    },
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
            url: "http://127.0.0.1:8545",
        },
        baseGoerli: {
            url: `${process.env.BASE_GOERLI_ALCHEMY_API_URL}`,
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
        },
    },
}

export default config
