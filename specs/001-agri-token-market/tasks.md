# Tasks: KiliMarkets Agricultural Commodity Marketplace

**Input**: Design documents from `/specs/001-agri-token-market/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Every story includes explicit validation work. Automated tests are not listed as standalone tasks because they were not explicitly requested for this feature.

**Organization**: Tasks are grouped by user story so each increment can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web app: `apps/web/`
- Shared packages: `packages/`
- Smart contracts: `contracts/`
- Environment and deployment config: `infra/`
- Cross-story validation and release docs: `specs/001-agri-token-market/` and `infra/ops/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the monorepo, toolchain, and base package structure for Injective Testnet delivery.

- [x] T001 Create workspace scaffolding in package.json and pnpm-workspace.yaml
- [x] T002 Create shared TypeScript and workspace config in tsconfig.base.json and .gitignore
- [x] T003 [P] Configure linting and formatting in eslint.config.mjs and .prettierrc.json
- [x] T004 [P] Initialize the web app package in apps/web/package.json and apps/web/vite.config.ts
- [x] T005 [P] Initialize shared package manifests in packages/domain/package.json and packages/sdk-injective/package.json
- [x] T006 [P] Initialize smart contract workspaces in contracts/evm/package.json and contracts/cosmwasm/Cargo.toml
- [x] T007 [P] Create environment and testnet config templates in apps/web/.env.example and infra/config/networks/testnet.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story can be delivered.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T008 Create shared domain models for users, lots, assets, orders, positions, and localization in packages/domain/src/assets/commodity.ts and packages/domain/src/localization/language.ts
- [x] T009 [P] Implement Injective endpoint, chain ID, and public client configuration in packages/sdk-injective/src/config/network.ts and infra/config/networks/testnet.ts
- [x] T010 [P] Create commodity market and oracle allowlists in infra/config/markets/commodities.ts and infra/config/oracles/feeds.ts
- [x] T011 [P] Implement wallet connection and address/subaccount helpers in packages/sdk-injective/src/wallet/connectors.ts and packages/sdk-injective/src/addresses/subaccount.ts
- [x] T012 [P] Create shared query client and low-bandwidth fetch policy in packages/sdk-injective/src/queries/queryClient.ts and apps/web/src/hooks/useNetworkMode.ts
- [x] T013 Create application providers and route shell in apps/web/src/app/providers.tsx and apps/web/src/app/router.tsx
- [x] T014 [P] Create mobile-first UI primitives and async feedback states in packages/ui/src/mobile/AppShell.tsx and packages/ui/src/feedback/AsyncState.tsx
- [x] T015 Create frontend service boundaries for wallet, portfolio, market, minting, and hedge flows in apps/web/src/services/wallet-service.ts and apps/web/src/services/portfolio-service.ts

**Checkpoint**: Foundation ready — user story work can proceed with shared config, routing, wallet helpers, and market/oracle registries in place.

---

## Phase 3: User Story 1 - Tokenize harvest and sell for immediate liquidity (Priority: P1) 🎯 MVP

**Goal**: Let farmers and cooperatives register harvest proof, mint fractional commodity tokens, and sell inventory for fast settlement on Injective Testnet.

**Independent Validation**: Complete a farmer flow that registers a cocoa lot, attaches proof, mints a tokenized asset, places a spot sell order, and shows proceeds plus remaining inventory in the farmer dashboard.

### Implementation for User Story 1

- [ ] T016 [P] [US1] Implement commodity registry and token factory contracts in contracts/evm/src/CommodityRegistry.sol and contracts/evm/src/FractionalCommodityTokenFactory.sol
- [ ] T017 [US1] Add inEVM deployment script and deployment manifest handling in contracts/evm/script/deployTestnet.ts and contracts/evm/deployments/testnet.json
- [ ] T018 [P] [US1] Implement commodity lot and minting adapters in packages/sdk-injective/src/queries/commodityLots.ts and apps/web/src/services/minting-service.ts
- [ ] T019 [P] [US1] Build harvest proof capture and commodity lot entry UI in apps/web/src/features/minting/routes/CreateLotPage.tsx and apps/web/src/features/minting/components/HarvestProofForm.tsx
- [ ] T020 [P] [US1] Build mint review and issuance flow in apps/web/src/features/minting/components/MintReviewCard.tsx and apps/web/src/features/minting/hooks/useMintCommodityLot.ts
- [ ] T021 [US1] Implement spot sell order submission for farmer inventory in packages/sdk-injective/src/exchange/spotOrders.ts and apps/web/src/features/minting/components/SellInventoryPanel.tsx
- [ ] T022 [US1] Build farmer dashboard holdings and settlement views in apps/web/src/features/dashboard/routes/FarmerDashboardPage.tsx and apps/web/src/features/dashboard/components/SettlementHistoryCard.tsx
- [ ] T023 [US1] Add farmer flow loading, error, and offline recovery states in apps/web/src/features/minting/components/MintingStates.tsx and apps/web/src/features/dashboard/components/FarmerDashboardStates.tsx
- [ ] T024 [US1] Record P1 manual validation and performance evidence in infra/ops/runbooks/p1-farmer-validation.md and specs/001-agri-token-market/quickstart.md

**Checkpoint**: User Story 1 is complete when a farmer can mint and list a commodity-backed asset and see the transaction outcome in the dashboard without relying on any later story.

---

## Phase 4: User Story 2 - Trade spot and hedge exposure as a market participant (Priority: P2)

**Goal**: Let traders and investors browse commodity markets, submit spot and perpetual orders, and monitor positions and liquidity earnings.

**Independent Validation**: Open a commodity market, review orderbook and price data, submit spot and perpetual orders, and confirm balances, positions, and liquidity earnings render in the trader dashboard.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Implement market metadata, orderbook, trade, and portfolio queries in packages/sdk-injective/src/queries/markets.ts and apps/web/src/services/market-service.ts
- [ ] T026 [P] [US2] Build spot market browser and orderbook views in apps/web/src/features/markets/routes/SpotMarketPage.tsx and apps/web/src/features/markets/components/OrderbookPanel.tsx
- [ ] T027 [P] [US2] Implement derivative order and position adapters in packages/sdk-injective/src/exchange/derivativeOrders.ts and packages/sdk-injective/src/queries/positions.ts
- [ ] T028 [US2] Build trader order entry, position, and P&L views in apps/web/src/features/markets/components/TradeTicket.tsx and apps/web/src/features/dashboard/routes/TraderDashboardPage.tsx
- [ ] T029 [US2] Implement liquidity participation and fee earnings surfaces in apps/web/src/features/markets/components/LiquidityPanel.tsx and apps/web/src/features/dashboard/components/LiquidityEarningsCard.tsx
- [ ] T030 [US2] Add trader market states, risk messaging, and validation evidence in apps/web/src/features/markets/components/MarketStates.tsx and infra/ops/runbooks/p2-trader-validation.md

**Checkpoint**: User Story 2 is complete when a trader can use seeded or live testnet commodity markets to trade, open derivative exposure, and review portfolio impact independently.

---

## Phase 5: User Story 3 - Automate hedging and monitor portfolio risk (Priority: P3)

**Goal**: Let users create rule-based hedges that respond to oracle-driven price moves and expose resulting risk changes in the dashboard.

**Independent Validation**: Create a hedge rule, trigger it with qualifying price data, confirm only one hedge order is submitted for the event, and see updated exposure and execution history in the dashboard.

### Implementation for User Story 3

- [ ] T031 [P] [US3] Implement hedge manager execute and query flows in contracts/cosmwasm/contracts/hedge-manager/src/contract.rs and contracts/cosmwasm/contracts/hedge-manager/src/msg.rs
- [ ] T032 [P] [US3] Implement oracle guards and exchange execution helpers in contracts/cosmwasm/contracts/hedge-manager/src/oracle.rs and contracts/cosmwasm/contracts/hedge-manager/src/exchange.rs
- [ ] T033 [US3] Add CosmWasm deployment scripts and rule config manifest updates in contracts/cosmwasm/scripts/deploy-testnet.sh and contracts/evm/deployments/testnet.json
- [ ] T034 [P] [US3] Implement hedge rule and oracle price adapters in apps/web/src/services/hedge-service.ts and packages/sdk-injective/src/oracle/prices.ts
- [ ] T035 [P] [US3] Build hedge rule creation and history screens in apps/web/src/features/hedging/routes/HedgeRulesPage.tsx and apps/web/src/features/hedging/components/RuleHistoryTable.tsx
- [ ] T036 [US3] Extend the dashboard with risk exposure and hedge execution views in apps/web/src/features/dashboard/components/RiskExposureCard.tsx and apps/web/src/features/dashboard/components/HedgeExecutionFeed.tsx
- [ ] T037 [US3] Add stale-oracle, trigger, and idempotency validation evidence in apps/web/src/features/hedging/components/HedgeStates.tsx and infra/ops/runbooks/p3-hedge-validation.md

**Checkpoint**: User Story 3 is complete when hedge rules can be created, evaluated, executed once per event, and clearly reflected in user-visible risk views.

---

## Phase 6: User Story 4 - Use the product easily on mobile, in local language, with simple onboarding (Priority: P4)

**Goal**: Deliver a mobile-first onboarding and navigation experience with language switching and optional mobile-money guidance for low-bandwidth users.

**Independent Validation**: Complete onboarding on a mobile viewport, connect a wallet in one tap, switch between English, French, and Swahili, and reach core minting or trading routes with clear localized guidance.

### Implementation for User Story 4

- [ ] T038 [P] [US4] Implement localization resources and language switching in packages/domain/src/localization/messages.ts and apps/web/src/app/i18n.tsx
- [ ] T039 [P] [US4] Build one-tap onboarding and wallet selection flow in apps/web/src/features/onboarding/routes/OnboardingPage.tsx and apps/web/src/features/onboarding/components/WalletConnectCard.tsx
- [ ] T040 [P] [US4] Build responsive navigation and mobile app shell in packages/ui/src/mobile/BottomNav.tsx and apps/web/src/app/AppShell.tsx
- [ ] T041 [US4] Add optional mobile money guidance and contextual help surfaces in apps/web/src/features/onboarding/components/MobileMoneyOptions.tsx and apps/web/src/features/onboarding/components/HelpPanel.tsx
- [ ] T042 [US4] Add localized onboarding states and constrained-network validation evidence in apps/web/src/features/onboarding/components/OnboardingStates.tsx and infra/ops/runbooks/p4-mobile-validation.md

**Checkpoint**: User Story 4 is complete when the app can onboard non-crypto-native users on mobile with localized, low-bandwidth-friendly guidance independent of later polish work.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and prepare the MVP for demo-quality delivery.

- [ ] T043 [P] Document end-to-end setup, demo, and deployment steps in README.md and infra/ops/runbooks/demo-day.md
- [ ] T044 Reconcile environment and deployment manifests across apps/web/.env.example and contracts/evm/deployments/testnet.json
- [ ] T045 Optimize shared query performance and refresh policies in packages/sdk-injective/src/queries/queryClient.ts and apps/web/src/utils/performance.ts
- [ ] T046 [P] Finalize shared accessibility and interaction consistency in packages/ui/src/mobile/AppShell.tsx and packages/ui/src/feedback/AsyncState.tsx
- [ ] T047 Run full quickstart validation handoff and release readiness notes in specs/001-agri-token-market/quickstart.md and infra/ops/runbooks/release-checklist.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — blocks all user stories.
- **User Story phases (Phases 3-6)**: Depend on Foundational completion.
- **Polish (Phase 7)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Starts immediately after Foundational and establishes the MVP farmer value path.
- **User Story 2 (P2)**: Starts after Foundational; reuses market and wallet foundations and can validate with seeded assets if US1 data is not yet live.
- **User Story 3 (P3)**: Starts after Foundational, but should follow US2 for derivative market and position infrastructure.
- **User Story 4 (P4)**: Starts after Foundational and can run in parallel with US1-US3 because it focuses on onboarding, localization, and mobile UX.

### Recommended Completion Order

1. Phase 1 → Phase 2
2. Phase 3 (US1) for MVP
3. Phase 4 (US2) and Phase 6 (US4) in parallel when capacity allows
4. Phase 5 (US3) after market and position infrastructure from US2 is stable
5. Phase 7 for cross-story hardening and demo readiness

### Within Each User Story

- Contract or protocol-facing infrastructure before UI surfaces that depend on it
- Query and service adapters before route-level composition
- Core flows before validation evidence and performance sign-off
- UX consistency and performance evidence before marking the story complete

## Parallel Opportunities

- **Setup**: T003-T007 can run in parallel once T001-T002 define the workspace baseline.
- **Foundational**: T009-T014 can run in parallel after domain model direction in T008 is agreed.
- **US1**: T016, T018, T019, and T020 can run in parallel; T021-T024 follow as integration and validation work.
- **US2**: T025, T026, and T027 can run in parallel; T028-T030 follow for integrated trader flows.
- **US3**: T031, T032, T034, and T035 can run in parallel; T033, T036, and T037 integrate and validate the full hedge flow.
- **US4**: T038-T040 can run in parallel; T041-T042 complete the mobile-money guidance and validation pass.
- **Polish**: T043 and T046 can run in parallel while T044, T045, and T047 close release readiness gaps.

---

## Parallel Example: User Story 1

- Task: `T016 [US1] Implement commodity registry and token factory contracts in contracts/evm/src/CommodityRegistry.sol and contracts/evm/src/FractionalCommodityTokenFactory.sol`
- Task: `T018 [US1] Implement commodity lot and minting adapters in packages/sdk-injective/src/queries/commodityLots.ts and apps/web/src/services/minting-service.ts`
- Task: `T019 [US1] Build harvest proof capture and commodity lot entry UI in apps/web/src/features/minting/routes/CreateLotPage.tsx and apps/web/src/features/minting/components/HarvestProofForm.tsx`
- Task: `T020 [US1] Build mint review and issuance flow in apps/web/src/features/minting/components/MintReviewCard.tsx and apps/web/src/features/minting/hooks/useMintCommodityLot.ts`

## Parallel Example: User Story 2

- Task: `T025 [US2] Implement market metadata, orderbook, trade, and portfolio queries in packages/sdk-injective/src/queries/markets.ts and apps/web/src/services/market-service.ts`
- Task: `T026 [US2] Build spot market browser and orderbook views in apps/web/src/features/markets/routes/SpotMarketPage.tsx and apps/web/src/features/markets/components/OrderbookPanel.tsx`
- Task: `T027 [US2] Implement derivative order and position adapters in packages/sdk-injective/src/exchange/derivativeOrders.ts and packages/sdk-injective/src/queries/positions.ts`

## Parallel Example: User Story 4

- Task: `T038 [US4] Implement localization resources and language switching in packages/domain/src/localization/messages.ts and apps/web/src/app/i18n.tsx`
- Task: `T039 [US4] Build one-tap onboarding and wallet selection flow in apps/web/src/features/onboarding/routes/OnboardingPage.tsx and apps/web/src/features/onboarding/components/WalletConnectCard.tsx`
- Task: `T040 [US4] Build responsive navigation and mobile app shell in packages/ui/src/mobile/BottomNav.tsx and apps/web/src/app/AppShell.tsx`

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **Stop and validate**: Walk through the farmer mint-and-sell flow and confirm performance evidence in the P1 validation runbook
5. Demo the farmer liquidity path before expanding market depth and automation

### Incremental Delivery

1. Finish Setup + Foundational once
2. Deliver User Story 1 for farmer minting and selling
3. Deliver User Story 2 for trader market participation
4. Deliver User Story 4 for broader adoption via onboarding and localization
5. Deliver User Story 3 for hedging automation after market infrastructure is stable
6. Finish with Polish for release readiness and demo packaging

### Parallel Team Strategy

With multiple developers:

1. Team shares Setup and Foundational phases
2. After Foundational:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 4
3. After US2 stabilizes:
   - Developer D or rotating owner: User Story 3
4. Team reunites for Phase 7 polish and final validation

---

## Notes

- All tasks follow the required checklist format with IDs, optional `[P]` markers, user story labels where needed, and exact file paths.
- Validation work for code quality, UX consistency, and performance is included in every story phase.
- Automated tests can be added later if the implementation phase or risk review explicitly calls for them.
- Suggested MVP scope: Phase 1 + Phase 2 + Phase 3 (User Story 1 only).
