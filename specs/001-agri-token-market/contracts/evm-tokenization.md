# Contract Interface: EVM Tokenization

## Purpose

Defines the public interface for inEVM contracts that register proof-backed commodity lots and mint fractional commodity tokens.

## Contracts

### 1. `CommodityRegistry`

**Responsibilities**:
- register commodity lots
- attach proof references
- lock attested quantity against duplicate minting
- expose lot metadata for UI and automation lookups

**Write functions**:
- `registerLot(owner, commodityType, quantity, unit, originCountry, harvestDate, metadataRef) -> lotId`
- `attachProof(lotId, proofType, contentRef, capturedAt)`
- `submitLotForAttestation(lotId)`
- `recordAttestationOutcome(lotId, outcome, note)`
- `reverseLotMint(lotId, reason)`

**Read functions**:
- `getLot(lotId)`
- `getLotProofs(lotId)`
- `getAvailableMintQuantity(lotId)`
- `getLotStatus(lotId)`

**Events**:
- `LotRegistered(lotId, owner, commodityType, quantity)`
- `ProofAttached(lotId, proofType, contentRef)`
- `LotSubmitted(lotId)`
- `AttestationRecorded(lotId, outcome)`
- `LotMintReversed(lotId, reason)`

**Rules**:
- a lot cannot move to mintable status until attestation outcome is accepted
- total minted quantity for a lot cannot exceed registered quantity
- reversal requires authorized role and a non-empty reason

### 2. `FractionalCommodityTokenFactory`

**Responsibilities**:
- deploy or register per-commodity token contracts
- mint fractional balances from accepted lots
- maintain lot-to-token mapping for portfolio and settlement display

**Write functions**:
- `registerCommodityToken(commodityType, tokenStandard, tokenAddress)`
- `mintFromLot(lotId, recipient, mintQuantity) -> assetId`
- `burnForCorrection(assetId, amount, reason)`

**Read functions**:
- `getCommodityToken(commodityType)`
- `getAsset(assetId)`
- `getLotMintSummary(lotId)`

**Events**:
- `CommodityTokenRegistered(commodityType, tokenAddress, tokenStandard)`
- `AssetMinted(assetId, lotId, recipient, quantity)`
- `AssetBurnedForCorrection(assetId, amount, reason)`

**Rules**:
- `mintFromLot` only succeeds when the referenced lot is accepted and has remaining mintable quantity
- mint quantities must use the commodity's declared unit basis
- correction burns cannot exceed currently minted supply

## Frontend interaction contract

### Register and mint flow
1. user signs a transaction to `registerLot`
2. user signs one or more `attachProof` transactions
3. user signs `submitLotForAttestation`
4. once attestation is accepted, user signs `mintFromLot`
5. frontend persists `lotId`, `assetId`, `txHash`, and emitted event metadata in its local read model

## Validation expectations

- transactions MUST surface clear pending, success, and failure states
- frontend MUST reconcile final lot and asset state from chain reads after every successful write
- contract deployment manifests MUST distinguish Injective Testnet inEVM only
