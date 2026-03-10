export const supportedCommodities = ['cocoa', 'coffee', 'maize'] as const
export type SupportedCommodity = (typeof supportedCommodities)[number]

export const supportedUnits = ['kg'] as const
export type CommodityUnit = (typeof supportedUnits)[number]

export const supportedWalletTypes = ['keplr', 'metamask', 'other-eip1193'] as const
export type WalletType = (typeof supportedWalletTypes)[number]

export const supportedRoles = [
  'farmer',
  'cooperative',
  'exporter',
  'trader',
  'investor',
  'liquidity-provider',
] as const
export type UserRole = (typeof supportedRoles)[number]

export const complianceTiers = ['anonymous', 'eligible', 'restricted'] as const
export type ComplianceTier = (typeof complianceTiers)[number]

export const proofTypes = ['photo', 'geolocation', 'document'] as const
export type ProofType = (typeof proofTypes)[number]

export const proofReviewOutcomes = ['pending', 'accepted', 'rejected'] as const
export type ProofReviewOutcome = (typeof proofReviewOutcomes)[number]

export const attestationStatuses = ['draft', 'submitted', 'accepted', 'rejected', 'revised'] as const
export type AttestationStatus = (typeof attestationStatuses)[number]

export const mintStatuses = ['unminted', 'partially-minted', 'fully-minted', 'reversed'] as const
export type MintStatus = (typeof mintStatuses)[number]

export const tokenStandards = ['ERC20', 'ERC1155'] as const
export type TokenStandard = (typeof tokenStandards)[number]

export const tokenizedAssetStatuses = ['pending', 'active', 'partially-sold', 'sold', 'reversed'] as const
export type TokenizedAssetStatus = (typeof tokenizedAssetStatuses)[number]

export const orderSides = ['buy', 'sell'] as const
export type OrderSide = (typeof orderSides)[number]

export const orderTypes = ['market', 'limit'] as const
export type OrderType = (typeof orderTypes)[number]

export const orderStatuses = ['open', 'partially-filled', 'filled', 'cancelled', 'expired', 'rejected'] as const
export type OrderStatus = (typeof orderStatuses)[number]

export const positionDirections = ['long', 'short'] as const
export type PositionDirection = (typeof positionDirections)[number]

export const liquidationStatuses = ['safe', 'warning', 'at-risk', 'liquidated'] as const
export type LiquidationStatus = (typeof liquidationStatuses)[number]

export const hedgeTriggerTypes = ['price-drop-percent'] as const
export type HedgeTriggerType = (typeof hedgeTriggerTypes)[number]

export const hedgeActionTypes = ['open-short', 'reduce-long', 'close-spot-portion'] as const
export type HedgeActionType = (typeof hedgeActionTypes)[number]

export const hedgeRuleStatuses = ['draft', 'active', 'triggered', 'paused', 'completed', 'failed'] as const
export type HedgeRuleStatus = (typeof hedgeRuleStatuses)[number]

export const liquidityCommitmentStatuses = ['active', 'withdrawn', 'pending-settlement'] as const
export type LiquidityCommitmentStatus = (typeof liquidityCommitmentStatuses)[number]

export const settlementSourceTypes = ['spot-trade', 'perpetual-trade', 'hedge-execution', 'liquidity-fee', 'seller-payout'] as const
export type SettlementSourceType = (typeof settlementSourceTypes)[number]

export const settlementStatuses = ['pending', 'confirmed', 'failed'] as const
export type SettlementStatus = (typeof settlementStatuses)[number]

export interface UserProfile {
  id: string
  walletAddress: string
  walletType: WalletType
  roles: UserRole[]
  displayName?: string
  region: string
  preferredLanguage: 'en' | 'fr' | 'sw'
  complianceTier: ComplianceTier
  createdAt: string
  lastActiveAt: string
}

export interface HarvestProof {
  proofId: string
  lotId: string
  proofType: ProofType
  contentReference: string
  capturedAt: string
  submittedAt: string
  reviewOutcome: ProofReviewOutcome
  reviewNote?: string
}

export interface CommodityLot {
  lotId: string
  ownerProfileId: string
  commodityType: SupportedCommodity
  quantity: number
  unit: CommodityUnit
  originCountry: string
  originRegion?: string
  harvestDate: string
  declaredQualityGrade?: string
  attestationStatus: AttestationStatus
  mintStatus: MintStatus
  createdAt: string
  updatedAt: string
  proofs: HarvestProof[]
}

export interface TokenizedAsset {
  assetId: string
  lotId: string
  contractAddress: string
  tokenStandard: TokenStandard
  mintedQuantity: number
  unit: CommodityUnit
  ownerProfileId: string
  mintTxHash: string
  status: TokenizedAssetStatus
  createdAt: string
}

export interface SpotOrder {
  orderId: string
  clientOrderId: string
  ownerProfileId: string
  marketId: string
  assetId?: string
  side: OrderSide
  orderType: OrderType
  quantity: number
  limitPrice?: number
  filledQuantity: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface PerpetualPosition {
  positionId: string
  ownerProfileId: string
  marketId: string
  subaccountId: string
  direction: PositionDirection
  size: number
  entryPrice: number
  markPrice: number
  collateralAmount: number
  unrealizedPnl: number
  realizedPnl: number
  liquidationStatus: LiquidationStatus
  openedAt: string
  updatedAt: string
}

export interface HedgeRule {
  ruleId: string
  ownerProfileId: string
  targetCommodityOrMarket: string
  triggerType: HedgeTriggerType
  triggerThreshold: number
  hedgePercent: number
  actionType: HedgeActionType
  status: HedgeRuleStatus
  cooldownPolicy?: string
  lastTriggeredAt?: string
  createdAt: string
  updatedAt: string
}

export interface LiquidityCommitment {
  commitmentId: string
  ownerProfileId: string
  marketId: string
  amountCommitted: number
  feeEarned: number
  status: LiquidityCommitmentStatus
  startedAt: string
  endedAt?: string
}

export interface SettlementRecord {
  settlementId: string
  ownerProfileId: string
  sourceType: SettlementSourceType
  sourceId: string
  amount: number
  assetDenom: string
  counterpartyContext?: string
  status: SettlementStatus
  txHash?: string
  createdAt: string
  confirmedAt?: string
}

export const commodityLabels: Record<SupportedCommodity, string> = {
  cocoa: 'Cocoa',
  coffee: 'Coffee',
  maize: 'Maize',
}

export const createEmptyLotDraft = (ownerProfileId: string): CommodityLot => ({
  lotId: '',
  ownerProfileId,
  commodityType: 'cocoa',
  quantity: 0,
  unit: 'kg',
  originCountry: '',
  harvestDate: '',
  attestationStatus: 'draft',
  mintStatus: 'unminted',
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  proofs: [],
})
