# Research: KiliMarkets Agricultural Commodity Marketplace

## Decision 1: Use a monorepo with React/Vite frontend, shared TypeScript Injective SDK layer, Solidity inEVM contracts, and CosmWasm automation contracts
- **Decision**: Organize the MVP as a monorepo with `apps/web` for the dApp, `packages/sdk-injective` and `packages/domain` for shared TypeScript logic, `packages/ui` for mobile-first components, `contracts/evm` for commodity tokenization contracts, and `contracts/cosmwasm` for hedging and exchange automation.
- **Rationale**: This aligns with the product's Hybrid MultiVM design while keeping chain-specific logic separated by responsibility. It supports code quality gates through explicit module boundaries and lets the frontend reuse shared formatting, address, and market helpers without duplicating chain logic.
- **Alternatives considered**:
  - Single-package frontend-only repository: rejected because contract and app logic would become tightly coupled and harder to validate.
  - Separate repositories per VM: rejected because cross-VM coordination, shared types, and synchronized deployment metadata would become harder to maintain during MVP iteration.

## Decision 2: Use `@injectivelabs/sdk-ts` plus Injective network helpers as the canonical chain integration layer
- **Decision**: Use `@injectivelabs/sdk-ts` and `@injectivelabs/networks` for chain interactions, endpoint configuration, wallet integration, market queries, and message building, with lazy loading for wallet-specific packages.
- **Rationale**: The official SDK covers Chain gRPC, Indexer, account portfolio, order placement, and network endpoint configuration on Injective Testnet. Using the official stack reduces custom protocol code and keeps wallet/address handling aligned with Injective's supported patterns.
- **Alternatives considered**:
  - Mixing multiple third-party SDKs: rejected because it increases bundle size and can introduce inconsistent address handling or market formatting.
  - Raw gRPC and JSON-RPC clients only: rejected because it adds low-level protocol work without meaningful MVP benefit.

## Decision 3: Treat inEVM contracts as the issuance domain and CosmWasm contracts as the trading automation domain
- **Decision**: Keep commodity lot registration and fractional minting in Solidity contracts deployed on inEVM, while moving hedging rules, exchange order routing, subaccount management, oracle guards, and automation into CosmWasm contracts using `cw-injective` bindings.
- **Rationale**: Issuance and proof-backed tokenization fit well in EVM token standards and OpenZeppelin-based permissioning, while Injective-native exchange and derivatives operations are better handled from CosmWasm against native modules. This boundary minimizes synchronous cross-VM assumptions and matches the user's stated architecture.
- **Alternatives considered**:
  - All logic in Solidity: rejected because native Injective exchange and oracle integrations would become more complex.
  - All logic in CosmWasm: rejected because the product explicitly wants EVM-compatible token issuance for fractional token assets.

## Decision 4: Use Injective Testnet public endpoints via network configuration, with browser-first gRPC-Web and EVM RPC access
- **Decision**: Configure the frontend for Injective Testnet using `Network.Testnet` or the current testnet equivalent from `@injectivelabs/networks`, and consume browser-suitable public endpoints for LCD, gRPC-Web/indexer, EVM RPC, and WebSocket.
- **Rationale**: This matches the user's zero-cost iteration requirement and avoids introducing a backend proxy. It keeps all interactions client-side while still supporting market queries, wallet transactions, and contract reads.
- **Alternatives considered**:
  - Self-hosted backend relays: rejected because the MVP forbids centralized backend infrastructure.
  - Mainnet-first development: rejected because the user explicitly requires testnet-only iteration.

## Decision 5: Use Pyth as the primary oracle path, with strict staleness and confidence checks and controlled fallback behavior
- **Decision**: Use Pyth price feeds for supported commodities where available, query them through Injective-compatible interfaces, pin feed IDs in configuration, and enforce max-age and confidence checks in hedging logic. If no acceptable live feed is available, pause new hedge openings and allow only conservative risk-reducing behavior or mocked feeds in isolated development environments.
- **Rationale**: Hedging automation depends on trustworthy price data. Strict freshness and confidence gating is safer than falling back silently to weak price sources. This approach also matches mobile and security goals by keeping oracle policy explicit and predictable.
- **Alternatives considered**:
  - Blindly falling back to any available test feed: rejected because it can create unsafe or misleading hedge behavior.
  - Manual price entry for MVP: rejected because it undermines trust and automation.

## Decision 6: Prefer direct use of the Injective Exchange module rather than building custom matching logic
- **Decision**: Use Exchange module messages for spot and perpetual orders (`MsgCreateSpotLimitOrder`, `MsgCreateSpotMarketOrder`, `MsgCreateDerivativeLimitOrder`, `MsgCreateDerivativeMarketOrder`) and query orderbooks, trades, positions, and portfolios through Indexer APIs.
- **Rationale**: This delivers marketplace and hedging requirements without recreating matching, settlement, or market state logic. It also supports low-latency market views and better alignment with Injective-native liquidity.
- **Alternatives considered**:
  - Custom AMM or off-chain order matching: rejected because it adds substantial protocol complexity and conflicts with the stated Injective Exchange requirement.
  - Frontend-only simulated markets: rejected because it would not satisfy real feature parity.

## Decision 7: Optimize mobile performance with lightweight UI, adaptive queries, and selective streaming
- **Decision**: Use Tailwind CSS, lightweight icons, TanStack Query, lazy-loaded wallet/trading modules, cached market metadata, batched orderbook queries, and selective streaming only on active trading screens.
- **Rationale**: The constitution requires explicit performance budgets, and the spec targets low-bandwidth rural mobile access. A lightweight frontend with adaptive fetching and cached read models directly supports those goals.
- **Alternatives considered**:
  - Heavy UI kits and always-on realtime subscriptions: rejected because they increase bundle size, memory use, and network pressure.
  - Fully static polling without caching: rejected because it weakens the trading experience and increases redundant network work.

## Decision 8: Use risk-driven automated testing for contracts and shared protocol flows, combined with linting and manual scenario validation
- **Decision**: Apply automated tests where feature risk is highest: Solidity contract invariants, CosmWasm execution/query behavior, shared TypeScript formatting helpers, and end-to-end critical flows across minting, trading, and hedging. Use linting, type checking, contract schema validation, and manual device/network walkthroughs as the baseline validation set.
- **Rationale**: Although automated tests are optional by constitution, this feature has security-sensitive, financial, and cross-VM behavior that warrants automated coverage. This still fits the constitution because the extra testing is justified by risk rather than habit.
- **Alternatives considered**:
  - Manual-only validation: rejected because it is insufficient for irreversible financial logic and cross-contract behavior.
  - Full exhaustive automation before MVP: rejected because it would slow incremental delivery beyond MVP needs.

## Decision 9: Store only minimal commodity proof metadata on-chain for MVP and defer external file storage
- **Decision**: Keep only compact proof references and essential attestation metadata on-chain or in signed client-submitted transaction payloads for MVP, avoiding IPFS or centralized storage dependencies.
- **Rationale**: The user explicitly ruled out IPFS/Filecoin and centralized backend infrastructure. Minimal metadata storage supports proof linkage without expanding scope into off-chain storage systems.
- **Alternatives considered**:
  - IPFS/Filecoin-backed proof bundles: rejected because it is out of scope.
  - Centralized file servers: rejected because they violate the no-backend constraint.

## Decision 10: Use a phased rollout that starts with wallet connectivity and token issuance before exchange and automation complexity
- **Decision**: Build incrementally in this order: shared SDK/config and wallets, EVM tokenization contracts, commodity minting UI, spot market read/write integration, dashboard aggregation, perpetual trading, hedging rules, and final optimization/deployment.
- **Rationale**: This order creates usable value early, aligns with the product's P1 user story, and reduces debugging complexity by proving each chain surface in sequence.
- **Alternatives considered**:
  - Building derivatives first: rejected because it delays the farmer liquidity flow.
  - Attempting full feature parity in one pass: rejected because it raises risk and slows feedback loops.
