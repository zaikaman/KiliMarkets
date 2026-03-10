export const injectiveSdkStatus = {
  network: 'testnet',
  ready: false,
  message:
    'Phase 1 scaffolding is ready. Network configuration, wallet helpers, and query clients land in Phase 2.',
} as const

export type InjectiveSdkStatus = typeof injectiveSdkStatus
