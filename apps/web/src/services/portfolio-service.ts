import type { HedgeRule, LiquidityCommitment, PerpetualPosition, SettlementRecord, SpotOrder, TokenizedAsset } from '@kilimarkets/domain'

export interface PortfolioSnapshot {
  balances: Array<{ denom: string; amount: number }>
  holdings: TokenizedAsset[]
  spotOrders: SpotOrder[]
  positions: PerpetualPosition[]
  hedgeRules: HedgeRule[]
  liquidityCommitments: LiquidityCommitment[]
  settlements: SettlementRecord[]
  partial: boolean
}

export interface PortfolioService {
  getPortfolioSnapshot(ownerProfileId: string): Promise<PortfolioSnapshot>
}

export const createPortfolioService = (): PortfolioService => ({
  async getPortfolioSnapshot() {
    return {
      balances: [],
      holdings: [],
      spotOrders: [],
      positions: [],
      hedgeRules: [],
      liquidityCommitments: [],
      settlements: [],
      partial: false,
    }
  },
})
