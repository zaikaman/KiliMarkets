# Quickstart: KiliMarkets MVP on Injective Testnet

## Purpose

Provide a concrete developer path for setting up the workspace, deploying the first contracts to Injective Testnet, connecting the web app, and validating the highest-priority user journeys.

## Prerequisites

- Node.js 22 LTS or newer
- pnpm 9 or newer
- Rust stable with `wasm32-unknown-unknown` target
- `cargo-generate` and `cargo-nextest` optional but recommended
- Solidity toolchain via Hardhat
- Keplr browser wallet
- MetaMask browser wallet
- Testnet INJ from the Injective faucet

## Environment setup

1. Clone the repository and switch to `001-agri-token-market`.
2. Create environment files for the web app, EVM deployments, and CosmWasm deployments.
3. Configure Injective Testnet endpoints:
   - LCD: `https://testnet.sentry.lcd.injective.network`
   - Chain gRPC: `testnet.sentry.chain.grpc.injective.network:443`
   - EVM JSON-RPC: `https://k8s.testnet.json-rpc.injective.network/`
   - WebSocket: `wss://k8s.testnet.ws.injective.network/`
4. Set the network constant with `@injectivelabs/networks` for Injective Testnet.
5. Fund test wallets through the Injective faucet.

## Workspace bootstrap

1. Install frontend and shared package dependencies.
2. Install EVM contract dependencies and compile Solidity contracts.
3. Build CosmWasm contracts and generate message/query schemas.
4. Run linting, formatting checks, and type checking across all packages.

## Deployment flow

### Step 1: Deploy EVM tokenization contracts

1. Deploy `CommodityRegistry` to Injective Testnet inEVM.
2. Deploy `FractionalCommodityTokenFactory` and initial commodity token contracts.
3. Record deployment addresses in the shared deployment manifest.
4. Verify the contracts on the Injective explorer if supported by the toolchain.

### Step 2: Deploy CosmWasm automation contracts

1. Build the `hedge-manager` contract to optimized Wasm output.
2. Upload the Wasm bytecode to Injective Testnet.
3. Instantiate the contract with oracle policy, market allowlist, and admin configuration.
4. Record code IDs and contract addresses in the shared deployment manifest.

### Step 3: Configure frontend

1. Point the web app to the recorded contract addresses and Injective Testnet endpoints.
2. Register market allowlists, feed IDs, and commodity token metadata.
3. Start the Vite development server and confirm wallet connectivity with Keplr and MetaMask.

## Manual validation scenarios

### Scenario A: Farmer tokenizes and lists commodity (P1)

1. Connect as a farmer with Keplr or MetaMask.
2. Register a cocoa lot with sample harvest metadata.
3. Attach photo, document, and geolocation proof references.
4. Submit the lot and simulate an accepted attestation state.
5. Mint fractional commodity units.
6. Place a spot sell order and confirm the dashboard updates.

### Scenario B: Trader views markets and places spot/perp orders (P2)

1. Connect as a trader.
2. Open a supported commodity market and confirm market data loads.
3. Submit a spot market or limit order.
4. Open a derivative hedge or directional position.
5. Confirm portfolio, open order, and P&L views update.

### Scenario C: User creates and triggers a hedge rule (P3)

1. Connect as a user with commodity exposure.
2. Create a hedge rule for a supported market.
3. Inject or simulate a qualifying oracle condition on testnet-compatible dev tooling.
4. Confirm only one hedge action executes for the trigger event.
5. Verify rule history and updated exposure in the dashboard.

### Scenario D: Mobile-first onboarding and localization (P4)

1. Open the app in a mobile viewport.
2. Complete onboarding in English.
3. Switch to French and Swahili and confirm essential labels and flows update.
4. Test on a throttled network profile and confirm the low-bandwidth performance budgets remain acceptable.

## Automated validation strategy

Use automated checks for high-risk surfaces:
- web app linting, formatting, and TypeScript checks
- unit tests for shared domain formatting, wallet helpers, and market formatting
- Solidity tests for lot registration, duplicate mint prevention, and supply accounting
- CosmWasm tests for hedge rule lifecycle, oracle staleness guards, and idempotent execution
- end-to-end happy-path tests for wallet connect, lot minting, and hedge rule submission when tooling is ready

## Performance evidence to capture

- bundle size for initial mobile load
- dashboard first usable render time under constrained network profile
- orderbook and portfolio refresh timing under active market conditions
- transaction submission feedback timing for minting, trading, and hedge creation actions

## Exit criteria for planning-to-build handoff

- deployment manifests defined for Injective Testnet only
- contract interfaces documented
- market and oracle allowlists agreed
- lint/typecheck/test commands identified
- manual validation scenarios mapped to P1-P4 user stories
