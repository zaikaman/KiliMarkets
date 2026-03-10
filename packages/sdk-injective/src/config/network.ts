import { Network, getNetworkEndpoints } from '@injectivelabs/networks'
import { createPublicClient, defineChain, http, type PublicClient } from 'viem'

export const injectiveNetwork = Network.Testnet

const sdkEndpoints = getNetworkEndpoints(injectiveNetwork)

export const injectiveInEvmTestnet = defineChain({
  id: 1439,
  name: 'Injective inEVM Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Injective',
    symbol: 'INJ',
  },
  rpcUrls: {
    default: {
      http: ['https://k8s.testnet.json-rpc.injective.network/'],
      webSocket: ['wss://k8s.testnet.ws.injective.network/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Injective Testnet Explorer',
      url: 'https://testnet.blockscout.injective.network',
    },
  },
  testnet: true,
})

export const injectiveNetworkConfig = {
  network: injectiveNetwork,
  chainId: 'injective-888',
  evmChainId: injectiveInEvmTestnet.id,
  feeDenom: 'inj',
  endpoints: {
    indexer: sdkEndpoints.indexer,
    grpc: sdkEndpoints.grpc,
    lcd: sdkEndpoints.rest,
    rpc: sdkEndpoints.rpc ?? 'https://testnet.sentry.tm.injective.network',
    websocket: 'wss://k8s.testnet.ws.injective.network/',
    evmRpc: injectiveInEvmTestnet.rpcUrls.default.http[0],
  },
} as const

export type InjectiveNetworkConfig = typeof injectiveNetworkConfig

let publicClientInstance: PublicClient | undefined

export const createInjectivePublicClient = () =>
  createPublicClient({
    chain: injectiveInEvmTestnet,
    transport: http(injectiveNetworkConfig.endpoints.evmRpc),
  })

export const getInjectivePublicClient = () => {
  publicClientInstance ??= createInjectivePublicClient()
  return publicClientInstance
}
