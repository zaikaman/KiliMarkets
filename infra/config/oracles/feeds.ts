import type { SupportedCommodity } from '@kilimarkets/domain'

export interface CommodityOracleFeed {
  commodity: SupportedCommodity
  provider: 'pyth'
  feedId: string
  symbol: string
  maxAgeMs: number
  confidenceGuardBps: number
}

export const commodityOracleAllowlist: readonly CommodityOracleFeed[] = [
  {
    commodity: 'cocoa',
    provider: 'pyth',
    feedId: 'pyth-cocoa-testnet',
    symbol: 'COCOA/USD',
    maxAgeMs: 120000,
    confidenceGuardBps: 350,
  },
  {
    commodity: 'coffee',
    provider: 'pyth',
    feedId: 'pyth-coffee-testnet',
    symbol: 'COFFEE/USD',
    maxAgeMs: 120000,
    confidenceGuardBps: 300,
  },
  {
    commodity: 'maize',
    provider: 'pyth',
    feedId: 'pyth-maize-testnet',
    symbol: 'MAIZE/USD',
    maxAgeMs: 180000,
    confidenceGuardBps: 400,
  },
] as const

export const oracleFeedMap = Object.fromEntries(
  commodityOracleAllowlist.map((feed) => [feed.commodity, feed]),
) as Record<SupportedCommodity, CommodityOracleFeed>
