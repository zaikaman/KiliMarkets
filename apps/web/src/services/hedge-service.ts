import type { HedgeRule } from '@kilimarkets/domain'
import type { CommodityOracleFeed } from '../../../../infra/config/oracles/feeds'
import { commodityOracleAllowlist } from '../../../../infra/config/oracles/feeds'

export interface HedgeService {
  listOracleFeeds(): readonly CommodityOracleFeed[]
  saveRule(rule: HedgeRule): Promise<HedgeRule>
}

export const createHedgeService = (): HedgeService => ({
  listOracleFeeds: () => commodityOracleAllowlist,
  saveRule: async (rule) => rule,
})
