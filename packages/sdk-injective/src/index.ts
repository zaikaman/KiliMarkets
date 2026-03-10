export * from './addresses/subaccount'
export * from './config/network'
export * from './queries/queryClient'
export * from './wallet/connectors'

export const injectiveSdkStatus = {
  network: 'testnet',
  ready: true,
  message:
    'Foundation helpers are ready for wallet connectivity, network-aware queries, and subaccount-aware trading flows.',
} as const

export type InjectiveSdkStatus = typeof injectiveSdkStatus
