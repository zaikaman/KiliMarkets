import type { CommodityMarketDefinition } from '../../../../infra/config/markets/commodities'
import { commodityMarketAllowlist } from '../../../../infra/config/markets/commodities'

export interface MarketService {
  listCommodityMarkets(): readonly CommodityMarketDefinition[]
  getCommodityMarket(marketId: string): CommodityMarketDefinition | undefined
}

export const createMarketService = (): MarketService => ({
  listCommodityMarkets: () => commodityMarketAllowlist,
  getCommodityMarket: (marketId) =>
    commodityMarketAllowlist.find(
      (market) => market.spotMarketId === marketId || market.derivativeMarketId === marketId,
    ),
})
