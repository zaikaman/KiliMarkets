export const injectiveTestnetConfig = {
  network: 'testnet',
  chainId: 'injective-888',
  evmChainId: 1439,
  endpoints: {
    indexer: 'https://testnet.sentry.exchange.grpc-web.injective.network',
    grpc: 'https://testnet.sentry.chain.grpc-web.injective.network',
    lcd: 'https://testnet.sentry.lcd.injective.network',
    evmRpc: 'https://k8s.testnet.json-rpc.injective.network/',
    websocket: 'wss://k8s.testnet.ws.injective.network/',
  },
} as const

export type InjectiveTestnetConfig = typeof injectiveTestnetConfig

export const getDefaultWebEnv = () => ({
  VITE_NETWORK: injectiveTestnetConfig.network,
  VITE_CHAIN_ID: injectiveTestnetConfig.chainId,
  VITE_EVM_CHAIN_ID: String(injectiveTestnetConfig.evmChainId),
  VITE_INDEXER_URL: injectiveTestnetConfig.endpoints.indexer,
  VITE_GRPC_URL: injectiveTestnetConfig.endpoints.grpc,
  VITE_LCD_URL: injectiveTestnetConfig.endpoints.lcd,
  VITE_EVM_RPC_URL: injectiveTestnetConfig.endpoints.evmRpc,
  VITE_WS_URL: injectiveTestnetConfig.endpoints.websocket,
})
