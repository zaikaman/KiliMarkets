# Data Model: KiliMarkets Agricultural Commodity Marketplace

## 1. UserProfile

**Purpose**: Represents an authenticated participant using a connected wallet in one or more roles.

**Fields**:
- `id`: stable profile identifier
- `walletAddress`: Injective or inEVM wallet address linked to the profile
- `walletType`: `keplr` | `metamask` | `other-eip1193`
- `roles`: set of `farmer`, `cooperative`, `exporter`, `trader`, `investor`, `liquidity-provider`
- `displayName`: optional public-facing alias
- `region`: country/region code
- `preferredLanguage`: `en` | `fr` | `sw`
- `complianceTier`: `anonymous`, `eligible`, `restricted`
- `createdAt`: profile creation timestamp
- `lastActiveAt`: last activity timestamp

**Validation Rules**:
- `walletAddress` MUST be unique per active profile.
- `preferredLanguage` MUST be one of the launch language set.
- `roles` MUST contain at least one allowed role.
- `complianceTier` MUST gate only the flows that require extra eligibility checks.

**Relationships**:
- One `UserProfile` can own many `CommodityLot`, `TokenizedAsset`, `SpotOrder`, `PerpetualPosition`, `HedgeRule`, and `LiquidityCommitment` records.

## 2. CommodityLot

**Purpose**: Represents a single physical harvest or inventory batch that can be attested and tokenized.

**Fields**:
- `lotId`: unique commodity lot identifier
- `ownerProfileId`: reference to `UserProfile`
- `commodityType`: `cocoa` | `coffee` | `maize`
- `quantity`: physical quantity
- `unit`: standard unit basis, initially `kg`
- `originCountry`: country of origin
- `originRegion`: optional sub-region
- `harvestDate`: harvest or inventory date
- `declaredQualityGrade`: optional grade label
- `attestationStatus`: `draft`, `submitted`, `accepted`, `rejected`, `revised`
- `mintStatus`: `unminted`, `partially-minted`, `fully-minted`, `reversed`
- `createdAt`: creation timestamp
- `updatedAt`: update timestamp

**Validation Rules**:
- `quantity` MUST be greater than zero.
- `commodityType` MUST be one of the supported launch commodities.
- `mintStatus` cannot become `fully-minted` until `attestationStatus = accepted`.
- A lot MUST NOT be tokenized twice unless a prior mint is explicitly reversed.

**Relationships**:
- One `CommodityLot` has many `HarvestProof` items.
- One `CommodityLot` can back one or more `TokenizedAsset` mint events up to its declared quantity ceiling.

**State Transitions**:
- `draft -> submitted -> accepted`
- `draft -> submitted -> rejected -> revised -> submitted`
- `unminted -> partially-minted -> fully-minted`
- `fully-minted -> reversed` only through authorized correction flow

## 3. HarvestProof

**Purpose**: Represents evidence attached to a commodity lot.

**Fields**:
- `proofId`: unique proof item identifier
- `lotId`: reference to `CommodityLot`
- `proofType`: `photo`, `geolocation`, `document`
- `contentReference`: on-chain or transaction-embedded metadata reference
- `capturedAt`: proof capture timestamp
- `submittedAt`: submission timestamp
- `reviewOutcome`: `pending`, `accepted`, `rejected`
- `reviewNote`: optional explanatory note

**Validation Rules**:
- Each `CommodityLot` MUST have at least one photo, one location signal, and one basic document or declaration before acceptance.
- `contentReference` MUST be non-empty.
- Rejected proof MUST include a `reviewNote`.

**Relationships**:
- Many `HarvestProof` items belong to one `CommodityLot`.

## 4. TokenizedAsset

**Purpose**: Represents a fractional on-chain asset tied to a physical commodity lot.

**Fields**:
- `assetId`: unique tokenized asset identifier
- `lotId`: reference to `CommodityLot`
- `contractAddress`: EVM token contract address
- `tokenStandard`: `ERC20` or `ERC1155`
- `mintedQuantity`: amount minted from the lot
- `unit`: token-to-physical unit mapping
- `ownerProfileId`: current owner at issuance time
- `mintTxHash`: issuance transaction reference
- `status`: `pending`, `active`, `partially-sold`, `sold`, `reversed`
- `createdAt`: mint timestamp

**Validation Rules**:
- `mintedQuantity` MUST be greater than zero.
- Total minted quantity across a `CommodityLot` MUST NOT exceed the lot quantity.
- `contractAddress` MUST match an approved deployment manifest.

**Relationships**:
- One `TokenizedAsset` maps to one `CommodityLot`.
- One `TokenizedAsset` may be referenced by many `SpotOrder` and `SettlementRecord` entries.

## 5. SpotOrder

**Purpose**: Represents a user-submitted order to buy or sell tokenized commodities.

**Fields**:
- `orderId`: chain or client order identifier
- `clientOrderId`: locally generated idempotency key
- `ownerProfileId`: reference to `UserProfile`
- `marketId`: Injective market identifier
- `assetId`: optional reference to the relevant `TokenizedAsset`
- `side`: `buy` | `sell`
- `orderType`: `market` | `limit`
- `quantity`: order quantity
- `limitPrice`: optional limit price
- `filledQuantity`: executed quantity
- `status`: `open`, `partially-filled`, `filled`, `cancelled`, `expired`, `rejected`
- `createdAt`: submission time
- `updatedAt`: latest status time

**Validation Rules**:
- `quantity` MUST be greater than zero.
- `limitPrice` is required when `orderType = limit`.
- `filledQuantity` MUST NOT exceed `quantity`.

**Relationships**:
- Many `SpotOrder` records can reference one market and one owner.
- One `SpotOrder` can create many `SettlementRecord` entries through partial fills.

## 6. PerpetualPosition

**Purpose**: Represents a derivative exposure used for hedging or speculation.

**Fields**:
- `positionId`: unique position identifier
- `ownerProfileId`: reference to `UserProfile`
- `marketId`: Injective derivatives market identifier
- `subaccountId`: Injective subaccount used for the position
- `direction`: `long` | `short`
- `size`: position size
- `entryPrice`: weighted entry price
- `markPrice`: latest mark price
- `collateralAmount`: locked collateral
- `unrealizedPnl`: unrealized profit and loss
- `realizedPnl`: realized profit and loss
- `liquidationStatus`: `safe`, `warning`, `at-risk`, `liquidated`
- `openedAt`: creation timestamp
- `updatedAt`: latest refresh time

**Validation Rules**:
- `size` MUST be greater than zero when active.
- `direction` MUST be specified.
- `liquidationStatus` MUST reflect the most recent risk snapshot.

**Relationships**:
- One `UserProfile` can have many `PerpetualPosition` entries.
- One `HedgeRule` may reference one or more `PerpetualPosition` targets.

## 7. HedgeRule

**Purpose**: Represents a simple automated risk instruction.

**Fields**:
- `ruleId`: unique rule identifier
- `ownerProfileId`: reference to `UserProfile`
- `targetCommodityOrMarket`: asset or derivatives market reference
- `triggerType`: initially `price-drop-percent`
- `triggerThreshold`: percentage or numeric threshold
- `hedgePercent`: percentage of target exposure to hedge
- `actionType`: `open-short`, `reduce-long`, `close-spot-portion`
- `status`: `draft`, `active`, `triggered`, `paused`, `completed`, `failed`
- `cooldownPolicy`: optional duplicate-trigger guard
- `lastTriggeredAt`: optional timestamp
- `createdAt`: creation timestamp
- `updatedAt`: update timestamp

**Validation Rules**:
- `hedgePercent` MUST be greater than 0 and less than or equal to 100.
- `triggerThreshold` MUST be greater than zero.
- Active rules MUST reference a supported market or commodity.

**Relationships**:
- One `UserProfile` can own many `HedgeRule` entries.
- One `HedgeRule` can create many `SettlementRecord` entries through executed actions.

**State Transitions**:
- `draft -> active -> triggered -> completed`
- `active -> paused -> active`
- `active -> failed`

## 8. LiquidityCommitment

**Purpose**: Represents a user's participation in market liquidity.

**Fields**:
- `commitmentId`: unique identifier
- `ownerProfileId`: reference to `UserProfile`
- `marketId`: target market identifier
- `amountCommitted`: committed asset amount
- `feeEarned`: accrued fee amount
- `status`: `active`, `withdrawn`, `pending-settlement`
- `startedAt`: start timestamp
- `endedAt`: optional end timestamp

**Validation Rules**:
- `amountCommitted` MUST be greater than zero.
- `feeEarned` MUST NOT be negative.

## 9. SettlementRecord

**Purpose**: Represents the user-visible result of a trade, hedge execution, fee distribution, or payout.

**Fields**:
- `settlementId`: unique identifier
- `ownerProfileId`: reference to `UserProfile`
- `sourceType`: `spot-trade`, `perpetual-trade`, `hedge-execution`, `liquidity-fee`, `seller-payout`
- `sourceId`: related entity identifier
- `amount`: transferred amount
- `assetDenom`: settled asset or stable-value denomination
- `counterpartyContext`: redacted or public counterpart context
- `status`: `pending`, `confirmed`, `failed`
- `txHash`: chain transaction hash
- `createdAt`: creation timestamp
- `confirmedAt`: optional confirmation timestamp

**Validation Rules**:
- `amount` MUST be greater than zero for successful settlements.
- `status = confirmed` requires a transaction reference or explicit on-chain confirmation proof.

## 10. LocalizationPreference

**Purpose**: Represents language and regional presentation defaults.

**Fields**:
- `preferenceId`: unique identifier
- `ownerProfileId`: reference to `UserProfile`
- `language`: `en` | `fr` | `sw`
- `currencyDisplayMode`: `stablecoin`, `local-reference`, `commodity-unit`
- `updatedAt`: latest timestamp

**Validation Rules**:
- `language` MUST be one of the supported languages.
- Preference changes MUST take effect without corrupting in-progress transaction state.
