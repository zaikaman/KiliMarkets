import type { SupportedCommodity } from '@kilimarkets/domain'

export interface CommodityMarketDefinition {
  commodity: SupportedCommodity
  displayName: string
  spotMarketId: string
  derivativeMarketId?: string
  settlementDenom: 'USDT' | 'USDC'
  quoteSymbol: string
  minOrderSizeKg: number
  tags: string[]
}

export const commodityMarketAllowlist: readonly CommodityMarketDefinition[] = [
  {
    commodity: 'cocoa',
    displayName: 'Cocoa / USDT',
    spotMarketId: '0xkm-cocoa-spot-testnet',
    derivativeMarketId: '0xkm-cocoa-perp-testnet',
    settlementDenom: 'USDT',
    quoteSymbol: 'USDT',
    minOrderSizeKg: 25,
    tags: ['farmer-liquidity', 'hedge-ready'],
  },
  {
    commodity: 'coffee',
    displayName: 'Coffee / USDT',
    spotMarketId: '0xkm-coffee-spot-testnet',
    derivativeMarketId: '0xkm-coffee-perp-testnet',
    settlementDenom: 'USDT',
    quoteSymbol: 'USDT',
    minOrderSizeKg: 50,
    tags: ['market-depth'],
  },
  {
    commodity: 'maize',
    displayName: 'Maize / USDC',
    spotMarketId: '0xkm-maize-spot-testnet',
    derivativeMarketId: '0xkm-maize-perp-testnet',
    settlementDenom: 'USDC',
    quoteSymbol: 'USDC',
    minOrderSizeKg: 100,
    tags: ['cooperative-scale'],
  },
] as const

export const commodityMarketMap = Object.fromEntries(
  commodityMarketAllowlist.map((market) => [market.commodity, market]),
) as Record<SupportedCommodity, CommodityMarketDefinition>
