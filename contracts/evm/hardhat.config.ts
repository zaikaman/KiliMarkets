import 'dotenv/config'
import '@nomicfoundation/hardhat-toolbox'
import type { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  networks: {
    injectiveTestnet: {
      url:
        process.env.INJECTIVE_EVM_RPC_URL ||
        'https://k8s.testnet.json-rpc.injective.network/',
      chainId: Number(process.env.INJECTIVE_EVM_CHAIN_ID || 1439),
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
    },
  },
}

export default config
