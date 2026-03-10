# Implementation Plan: KiliMarkets Agricultural Commodity Marketplace

**Branch**: `[001-agri-token-market]` | **Date**: 2026-03-10 | **Spec**: [specs/001-agri-token-market/spec.md](specs/001-agri-token-market/spec.md)
**Input**: Feature specification from `/specs/001-agri-token-market/spec.md`

## Summary

Build KiliMarkets as a pure dApp on Injective Testnet that lets African farmers and cooperatives
tokenize attested cocoa, coffee, and maize inventory through inEVM contracts, sell those assets in
spot markets, and later hedge exposure through Injective perpetual markets using CosmWasm-based
automation. The delivery approach is a lightweight monorepo: React/Vite/TypeScript frontend,
shared Injective SDK and domain packages, Solidity tokenization contracts, CosmWasm hedge
automation contracts, and testnet-only deployment manifests. Implementation will be phased so the
farmer mint-and-sell flow lands first, then market participation, then hedging automation, then
multilingual/mobile polish.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19 + Vite 6, Solidity 0.8.x, Rust stable for CosmWasm  
**Primary Dependencies**: `@injectivelabs/sdk-ts`, `@injectivelabs/networks`, TanStack Query, Tailwind CSS, `lucide-react`, OpenZeppelin contracts, `injective-cosmwasm`/`cw-injective`, Hardhat, CosmWasm tooling  
**Storage**: On-chain state on Injective Testnet (inEVM + CosmWasm), client-side cached read models, minimal proof metadata on-chain, no centralized backend storage for MVP  
**Validation Approach**: ESLint + TypeScript checks + contract compilation, risk-driven automated tests for Solidity/CosmWasm/shared helpers, and manual validation across P1-P4 user scenarios including constrained-network mobile walkthroughs  
**Target Platform**: Responsive web/PWA-capable dApp for mobile and desktop browsers interacting only with Injective Testnet and inEVM endpoints  
**Project Type**: Monorepo web application with hybrid smart contracts (frontend + shared packages + EVM contracts + CosmWasm contracts)  
**Performance Goals**: Farmer dashboard or minting screen usable within 5 seconds for 90% of low-bandwidth sessions; transaction submission feedback within 3 seconds for 95% of successful actions; keep initial mobile bundle lean enough for rural-device usage through lazy loading and selective streaming  
**Constraints**: Injective Testnet only; no centralized backend/server; no IPFS/Filecoin for MVP; low-bandwidth mobile first; pseudonymous/minimal-KYC MVP posture; no custody of physical goods; no heavy UI kits; keep bundle size small; support Keplr and MetaMask; use public testnet endpoints via official SDK/network config  
**Scale/Scope**: Launch scope covers 4 primary user journeys, 3 commodities, multilingual support in English/French/Swahili, spot + perpetual market integration, automated hedging, and at least 50,000 registered-user design readiness with 1,000 concurrent market viewers

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Gate

- **Code quality approach**: PASS — monorepo boundaries are explicit: `apps/web` for UX, `packages/*` for shared logic, `contracts/evm` for issuance, and `contracts/cosmwasm` for trading automation. Linting, formatting, type checking, contract compilation, and generated schema validation are planned as mandatory checks.
- **Experience consistency**: PASS — the plan preserves shared terminology, role-based flows, and explicit loading/empty/success/error states across onboarding, minting, trading, hedging, and dashboard surfaces.
- **Performance budget**: PASS — the plan adopts the spec's 5-second low-bandwidth first-usable target and 3-second action-feedback budget, and pairs them with bundle-size controls, adaptive queries, and manual network-throttled validation.
- **Validation evidence**: PASS — manual scenario walkthroughs are required for all user stories, and automated tests are included only where justified by financial and cross-VM risk.

### Post-Design Re-check

- **Code quality approach**: PASS — research and structure decisions keep EVM issuance, CosmWasm automation, and frontend services separated with shared packages for reuse.
- **Experience consistency**: PASS — service boundaries and UI package planning support consistent wallet, market, dashboard, and localization behavior.
- **Performance budget**: PASS — architecture favors lightweight UI, cached metadata, selective streaming, and low-bandwidth validation checkpoints.
- **Validation evidence**: PASS — `quickstart.md`, `contracts/`, and `data-model.md` define concrete validation surfaces, manual checks, and targeted automation areas.

## Project Structure

### Documentation (this feature)

```text
specs/001-agri-token-market/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
apps/
└── web/
    ├── public/
    └── src/
        ├── app/
        ├── components/
        ├── features/
        │   ├── onboarding/
        │   ├── minting/
        │   ├── markets/
        │   ├── hedging/
        │   └── dashboard/
        ├── hooks/
        ├── services/
        ├── state/
        ├── styles/
        └── utils/

packages/
├── domain/
│   ├── src/
│   │   ├── assets/
│   │   ├── markets/
│   │   ├── hedging/
│   │   └── localization/
├── sdk-injective/
│   ├── src/
│   │   ├── config/
│   │   ├── wallet/
│   │   ├── queries/
│   │   ├── exchange/
│   │   ├── oracle/
│   │   └── addresses/
└── ui/
    └── src/
        ├── mobile/
        ├── trading/
        └── feedback/

contracts/
├── evm/
│   ├── src/
│   ├── script/
│   ├── test/
│   └── deployments/
└── cosmwasm/
    ├── contracts/
    │   └── hedge-manager/
    │       ├── src/
    │       ├── schema/
    │       └── tests/
    └── scripts/

infra/
├── config/
│   ├── markets/
│   ├── oracles/
│   └── networks/
└── ops/
    ├── deploy/
    └── runbooks/

tests/
├── contract/
├── integration/
└── e2e/

specs/
└── 001-agri-token-market/
```

**Structure Decision**: Use a monorepo rooted at `apps/`, `packages/`, `contracts/`,
`infra/`, and `tests/` so frontend, shared Injective clients, and cross-VM contracts can
evolve together without introducing a centralized backend.

## Architecture Overview

### High-level architecture diagram description

```text
[Farmer / Trader Browser]
        |
        v
[React + Vite Web App]
  |        |         |
  |        |         +--> [Wallet adapters: Keplr, MetaMask]
  |        +------------> [Injective SDK shared package]
  |                         |            |             |
  |                         |            |             +--> [EVM JSON-RPC / inEVM contracts]
  |                         |            +----------------> [Chain gRPC / Exchange module]
  |                         +-----------------------------> [Indexer gRPC / market & portfolio reads]
  |
  +--> [UI + domain packages]

[inEVM Solidity contracts]
  - commodity registry
  - fractional token factory
  - commodity token contracts

[CosmWasm hedge manager]
  - rule storage
  - oracle checks
  - exchange order routing
  - optional WasmX-triggered evaluations

[Injective Testnet modules]
  - Exchange
  - Oracle / Pyth access
  - Accounts / subaccounts
```

### Component and service breakdown

- **`apps/web`**: role-based UI, wallet onboarding, minting flows, market views, hedge setup, dashboard, localization, and mobile performance handling.
- **`packages/sdk-injective`**: endpoint configuration, wallet abstractions, address/subaccount helpers, Exchange message builders, Indexer query adapters, oracle formatting, and network guards.
- **`packages/domain`**: commodity, lot, position, hedge rule, settlement, and localization types plus validation helpers shared by frontend and tooling.
- **`packages/ui`**: lightweight components for mobile-first navigation, transaction review, charts, order forms, and feedback states.
- **`contracts/evm`**: proof-backed commodity registration and fractional minting contracts on Injective inEVM.
- **`contracts/cosmwasm`**: hedge rule lifecycle, oracle-protected evaluation, and Exchange module order routing.
- **`infra/config`**: market allowlists, oracle feed registry, deployment manifests, and testnet endpoint definitions.

## Contract Interaction Flow

### Farmer tokenization flow

1. Web app connects wallet and creates a role-scoped profile view.
2. User submits lot metadata and proof references through `CommodityRegistry` on inEVM.
3. Accepted lot state is reconciled in the frontend read model.
4. User calls `mintFromLot` through `FractionalCommodityTokenFactory`.
5. Minted asset metadata is mapped to Injective market config for trading.

### Spot and perpetual trading flow

1. Web app loads market metadata and orderbooks from Indexer and Chain gRPC APIs.
2. User submits spot or derivative orders through `@injectivelabs/sdk-ts` message builders.
3. Orders are broadcast to Injective Exchange using explicit client order IDs.
4. Portfolio, trades, and position states are reconciled through Indexer queries.

### Hedging automation flow

1. User creates a hedge rule in the CosmWasm `hedge-manager` contract.
2. Contract validates oracle freshness and confidence from approved feed configuration.
3. On manual or scheduled evaluation, the contract checks trigger conditions.
4. If triggered, the contract submits a derivatives or spot hedge order to the Exchange module.
5. Frontend refreshes execution history, position state, and dashboard exposure summaries.

## Deployment Plan

1. Initialize the monorepo and shared workspace tooling.
2. Configure Injective Testnet endpoints and environment manifests.
3. Deploy EVM tokenization contracts to inEVM testnet and record addresses.
4. Deploy CosmWasm hedge contracts to Injective Testnet and record code IDs/addresses.
5. Register commodity token metadata, oracle feeds, and market allowlists.
6. Connect the React app to the deployment manifest and validate Keplr + MetaMask flows.
7. Publish the frontend to Vercel or Netlify for demo access.

## Testing and Validation Strategy

- **Code quality**: pnpm workspace linting, formatting, type checks, Solidity compile checks, CosmWasm schema generation, and contract/static analysis.
- **Automated tests (risk-justified)**:
  - Solidity unit/invariant tests for lot registration, proof linkage, duplicate mint prevention, and mint accounting.
  - CosmWasm tests for rule lifecycle, oracle staleness/confidence guards, and idempotent hedge execution.
  - TypeScript unit tests for address helpers, market formatting, oracle normalization, and query adapters.
  - End-to-end integration tests for the main happy paths once the vertical slices exist.
- **Manual validation**: mobile viewport and throttled-network walkthroughs for onboarding, minting, trading, hedge creation, and localization.
- **Performance evidence**: capture first usable render time, transaction feedback latency, bundle size, and active-market refresh behavior.

## Incremental Build Priorities

1. Setup SDK, network config, workspace tooling, and wallet connectivity.
2. Deploy and validate the basic EVM commodity registry and fractional token contracts.
3. Build the farmer minting flow with proof capture and lot state reconciliation.
4. Load Injective spot market data and enable basic spot order placement.
5. Build portfolio and dashboard aggregation.
6. Integrate perpetual markets and position views.
7. Deploy the hedge manager contract and enable rules-based hedging.
8. Add localization, low-bandwidth optimization, and demo deployment polish.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | The current design passes the constitution gates without exceptions. |
