# Feature Specification: KiliMarkets Agricultural Commodity Marketplace

**Feature Branch**: `[001-agri-token-market]`  
**Created**: 2026-03-10  
**Status**: Draft  
**Input**: User description: "Build KiliMarkets, a decentralized web application that enables African farmers, cooperatives, and small exporters to tokenize and trade real-world agricultural commodities as fractional assets on a blockchain, starting with cocoa, coffee, and maize."

## Goals

- Give farmers and cooperatives faster access to liquidity from verified harvests.
- Improve price fairness by exposing users to transparent global market pricing.
- Provide simple hedging tools that reduce exposure to sharp commodity price swings.
- Create a low-friction trading venue for global traders and investors to access tokenized agricultural commodities.
- Deliver a mobile-first, low-bandwidth, multilingual experience that feels approachable for non-crypto-native users.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Tokenize harvest and sell for immediate liquidity (Priority: P1)

A farmer or cooperative representative captures basic harvest proof on a mobile device, creates a verifiable tokenized commodity asset backed 1:1 by physical goods, and sells all or part of it through the marketplace to receive fast payment.

**Why this priority**: This is the core value proposition for the platform. Without verified minting and sale, farmers do not gain liquidity and the market has no primary supply.

**Independent Validation**: Can be confirmed by completing a harvest upload, minting a commodity position, listing a spot sale, and receiving a completed settlement record that shows the farmer's sale proceeds and remaining inventory.

**Acceptance Scenarios**:

1. **Given** a farmer has a verified profile and a commodity harvest, **When** the farmer uploads photos, geolocation, and basic harvest documentation, **Then** the system records the proof, associates it with the commodity lot, and shows the lot as ready for minting review.
2. **Given** a commodity lot has sufficient proof and an eligible quantity, **When** the farmer mints fractional tokens, **Then** the system creates a tokenized asset that reflects the commodity type, quantity, unit basis, owner, and proof reference.
3. **Given** a farmer holds tokenized commodity units, **When** the farmer places a market sell order, **Then** the order executes against available buyers, settles immediately, and updates the farmer dashboard with proceeds and remaining balance.
4. **Given** a farmer wants a better price than the current market, **When** the farmer places a limit order, **Then** the order remains open until matched, changed, canceled, or expired according to marketplace rules.

---

### User Story 2 - Trade spot and hedge exposure as a market participant (Priority: P2)

A trader or investor browses commodity markets, reviews prices and market depth, buys or sells tokenized spot assets, and opens perpetual positions to hedge or express a market view.

**Why this priority**: Active demand and hedging depth are required to create fair pricing and ongoing liquidity for farmers' tokenized commodities.

**Independent Validation**: Can be confirmed by browsing a commodity market, submitting spot and perpetual orders, observing matched trades, and reviewing open positions, balances, and realized and unrealized profit and loss in the dashboard.

**Acceptance Scenarios**:

1. **Given** a trader enters a commodity market, **When** the trader views the market screen, **Then** the system shows current price, recent price movement, orderbook visibility, and key market statistics for the selected commodity pair.
2. **Given** a trader wants immediate execution, **When** the trader places a market order in the spot market, **Then** the order matches against available liquidity and the trader's holdings update after settlement.
3. **Given** a trader wants to hedge or speculate, **When** the trader opens a perpetual long or short position, **Then** the system records position size, entry price, collateral requirement, and ongoing profit and loss.
4. **Given** a user provides liquidity to an eligible market, **When** trades occur in that market, **Then** the system attributes earned fees to the liquidity provider and shows them in the dashboard.

---

### User Story 3 - Automate hedging and monitor portfolio risk (Priority: P3)

A farmer or trader defines simple rules-based hedging instructions and uses a dashboard to monitor portfolio value, open orders, exposure, and commodity history without needing advanced trading knowledge.

**Why this priority**: Hedging reduces volatility exposure, which is one of the platform's core economic promises for both producers and market participants.

**Independent Validation**: Can be confirmed by creating a hedging rule, triggering the rule with a qualifying price move, and verifying that the resulting hedge action and updated exposure appear clearly in the user's dashboard and history.

**Acceptance Scenarios**:

1. **Given** a user holds a commodity balance or open market exposure, **When** the user creates a rule such as "if price drops more than 10%, hedge 30% of position," **Then** the system stores the trigger condition, target position share, and execution status.
2. **Given** a hedging rule is active, **When** the market meets the trigger condition, **Then** the system creates the hedge action once, records the trigger event, and shows the resulting position change to the user.
3. **Given** a user opens the dashboard, **When** the dashboard loads, **Then** the system shows current portfolio value, open orders, position summary, harvest history, and recent hedge activity in a clear role-appropriate layout.

---

### User Story 4 - Use the product easily on mobile, in local language, with simple onboarding (Priority: P4)

A farmer with limited bandwidth and limited crypto familiarity connects a wallet, chooses a preferred language, and completes key actions through an intuitive, fiat-like interface with optional mobile money ramp support.

**Why this priority**: Usability and access determine whether the intended audience can adopt the product in rural and peri-urban agricultural communities.

**Independent Validation**: Can be confirmed by completing onboarding on a mobile device, switching languages, connecting a wallet in one tap, and reaching tokenization or trading flows without requiring advanced crypto setup knowledge.

**Acceptance Scenarios**:

1. **Given** a first-time farmer visits the application on a mobile device, **When** the onboarding flow starts, **Then** the system explains the product in simple language and offers a one-tap wallet connection flow.
2. **Given** a user prefers English, French, or Swahili, **When** the user changes language preference, **Then** the system updates navigation, essential action labels, status messages, and help text in the selected language.
3. **Given** a user needs a fiat-like experience, **When** the user views funding and withdrawal options, **Then** the system presents optional mobile money ramp choices in the same simple flow without making them mandatory for marketplace access.

### UX Flows

#### Farmer mint-and-sell flow

1. Land on a simple home screen with role selection and language preference.
2. Connect wallet through a one-tap flow and confirm identity only to the minimum degree needed for MVP eligibility.
3. Capture harvest proof with guided photo, location, and document steps optimized for mobile upload.
4. Review commodity lot summary, mint quantity, and token representation before confirming.
5. Choose immediate sale or price-target sale.
6. View order status, payment confirmation, and updated remaining holdings.

#### Trader market-and-hedge flow

1. Open market browser and choose commodity pair.
2. Review charts, orderbook, price trends, and available liquidity.
3. Place spot or perpetual order with clear risk summary.
4. Monitor positions, profit and loss, and open orders from the dashboard.
5. Optionally create liquidity provision or hedge automation rules.

#### Mobile-first onboarding flow

1. Select language on first visit.
2. Complete guided wallet connection with plain-language prompts.
3. Choose a farmer/cooperative or trader/investor mode.
4. See a role-specific dashboard and next recommended action.
5. Access contextual help and low-bandwidth-friendly status updates throughout the journey.

### Edge Cases

- What happens when a farmer uploads incomplete proof, duplicate proof, or proof that does not match the declared commodity quantity?
- What happens when geolocation cannot be captured because the device is offline or permissions are denied?
- How does the system handle partial fills for large farmer sell orders or thinly traded commodity pairs?
- How does the system handle a limit order that remains unfilled for an extended period?
- What happens when a hedging rule triggers during a rapid price move and only part of the intended hedge can be executed?
- How does the system prevent the same commodity lot from being tokenized more than once?
- What happens when a user loses connectivity during wallet connection, proof upload, order submission, or settlement confirmation?
- How does the system present risk and account status when a perpetual position approaches liquidation thresholds?
- How does the system handle users who switch languages in the middle of a transaction flow?
- What happens when a mobile money ramp is unavailable in the user's region or temporarily offline?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow farmers, cooperatives, and small exporters to create role-appropriate accounts anchored to a connected wallet.
- **FR-002**: System MUST allow farmer-side users to create a commodity lot for cocoa, coffee, or maize with declared quantity, unit basis, harvest date, origin, and owner.
- **FR-003**: System MUST allow farmer-side users to upload harvest proof consisting of photos, geolocation, and basic supporting documentation for each commodity lot.
- **FR-004**: System MUST verify that each tokenized asset is linked to exactly one commodity lot and one proof set before minting is completed.
- **FR-005**: System MUST mint fractional commodity tokens backed 1:1 by the declared physical commodity quantity represented in the commodity lot.
- **FR-006**: System MUST prevent a commodity lot from being minted more than once unless the previous mint was fully reversed through an authorized correction flow.
- **FR-007**: System MUST let farmer-side users sell tokenized commodities through spot market and limit orders.
- **FR-008**: System MUST provide market participants with visible spot market prices, market depth, recent trade activity, and orderbook state for supported commodity pairs.
- **FR-009**: System MUST support market and limit orders for spot trading with immediate balance updates after settlement.
- **FR-010**: System MUST support perpetual long and short positions for supported commodity markets so users can hedge or express market views.
- **FR-011**: System MUST show traders and investors position size, entry price, collateral usage, and realized and unrealized profit and loss for open perpetual positions.
- **FR-012**: System MUST allow eligible users to provide liquidity to supported markets and track fee earnings attributable to that liquidity.
- **FR-013**: System MUST allow users to define simple rules-based hedging instructions using price thresholds and percentage-based hedge actions.
- **FR-014**: System MUST execute a hedging instruction no more than once per qualifying trigger event unless the user explicitly re-arms or edits the rule.
- **FR-015**: System MUST provide a farmer dashboard showing portfolio value, harvest history, token holdings, open spot orders, and settlement history.
- **FR-016**: System MUST provide a trader dashboard showing portfolio value, spot holdings, perpetual positions, open orders, market exposure, liquidity earnings, and profit and loss.
- **FR-017**: System MUST provide one-tap wallet connection and plain-language onboarding suited to users with limited crypto familiarity.
- **FR-018**: System MUST support English, French, and Swahili for core navigation, essential transaction steps, account states, and help text.
- **FR-019**: System MUST provide optional mobile money ramp pathways without making them mandatory for core marketplace participation.
- **FR-020**: System MUST preserve pseudonymous participation for marketplace use while collecting only the minimum identity and compliance data needed for MVP operation.
- **FR-021**: System MUST make clear that KiliMarkets does not take custody of physical goods and only represents on-chain commodity exposure backed by user-submitted attestation.
- **FR-022**: System MUST exclude full physical delivery logistics, advanced insurance products, and governance voting from the initial release.

### Experience & Performance Requirements

- **XPR-001**: System MUST preserve consistent terminology, navigation patterns, and transaction steps across farmer, cooperative, exporter, and trader experiences.
- **XPR-002**: System MUST define loading, empty, success, warning, and error states for onboarding, proof upload, minting, trading, hedging, liquidity provision, and dashboard views.
- **XPR-003**: System MUST let a farmer on a low-bandwidth mobile connection reach a usable dashboard or minting screen within 5 seconds for at least 90% of sessions.
- **XPR-004**: System MUST confirm submission results for proof upload, order placement, hedge rule creation, and wallet-connected account actions within 3 seconds for at least 95% of successful interactions, excluding external settlement finality time.
- **XPR-005**: System MUST present critical actions in language suitable for non-expert users, with plain-language summaries for risk, pricing, and settlement outcomes.
- **XPR-006**: System MUST keep primary mobile actions operable with one hand and readable without horizontal scrolling on common low-resolution smartphones.

### Non-Functional Requirements

- **NFR-001**: System MUST maintain an auditable record of minting, order, settlement, and hedge events visible to the relevant user.
- **NFR-002**: System MUST protect user accounts and marketplace actions against unauthorized access, tampering, duplicate execution, and common transaction fraud patterns.
- **NFR-003**: System MUST minimize collection and display of personal information and separate proof needed for commodity attestation from public-facing user identity whenever possible.
- **NFR-004**: System MUST degrade gracefully under low bandwidth by preserving essential actions, clear progress feedback, and safe retry behavior.
- **NFR-005**: System MUST preserve data consistency between commodity lots, minted units, open orders, settlements, and hedge actions so users do not see conflicting balances.
- **NFR-006**: System MUST support pseudonymous trading while clearly disclosing any action that requires additional eligibility or compliance information.
- **NFR-007**: System MUST provide accessible text contrast, touch-target sizing, and screen-reader-friendly labels for all core flows.
- **NFR-008**: System MUST keep the marketplace available for browsing, order management, and dashboard viewing at least 99.5% of the time each calendar month, excluding scheduled maintenance announced in advance.
- **NFR-009**: System MUST support at least 50,000 registered users, 5,000 daily active users, and 1,000 concurrently active market viewers without degrading the user-visible performance targets in this specification.

### Key Entities *(include if feature involves data)*

- **User Profile**: Represents a farmer, cooperative representative, exporter, trader, or investor, including preferred language, connected wallet, role, region, and eligibility status.
- **Commodity Lot**: Represents a physical harvest or inventory batch, including commodity type, quantity, unit basis, origin, harvest date, ownership, and attestation status.
- **Harvest Proof**: Represents the evidence attached to a commodity lot, including images, location evidence, supporting documents, submission time, and review outcome.
- **Tokenized Asset**: Represents the fractional digital claim tied 1:1 to an eligible commodity lot quantity, including minted quantity, ownership, mint status, and proof reference.
- **Spot Order**: Represents a market or limit order to buy or sell tokenized commodity units, including side, quantity, price condition, fill status, and settlement history.
- **Perpetual Position**: Represents a hedging or directional derivatives exposure, including market, direction, size, entry price, collateral state, and profit and loss.
- **Hedge Rule**: Represents a user-defined automation instruction, including trigger threshold, target percentage, execution state, and last trigger event.
- **Liquidity Commitment**: Represents user-supplied market liquidity, including target market, committed amount, participation window, and fee earnings.
- **Settlement Record**: Represents the completion of a spot trade, hedge action, liquidity fee payout, or payout to a seller, including timestamp, amount, asset, counterparty context, and status.
- **Localization Preference**: Represents the user's selected language and region-specific presentation choices for the interface.

## Assumptions

- Each supported commodity uses a standard fractional unit basis for tokenization so users can understand token quantity in physical terms.
- Basic attestation is sufficient for MVP minting, and full end-to-end supply chain traceability is intentionally deferred.
- Stable-value digital settlement is the default payout method for immediate liquidity, with optional ramp services presented where available.
- Farmer-facing mobile usage on constrained networks is a primary operating context and takes precedence over advanced desktop-only interactions.
- Minimal KYC for MVP means eligibility checks are limited to what is strictly necessary for lawful operation and risk control, not broad identity collection.

## Dependencies

- Reliable commodity price feeds for supported crops.
- Wallet connection support that works on mobile devices common in target regions.
- Attestation review policy for harvest proof acceptance and correction handling.
- Availability of regional language content for English, French, and Swahili.
- Optional payment-ramp partnerships where mobile money support is exposed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 80% of eligible farmers who start the harvest tokenization flow complete minting and list or sell inventory within 15 minutes of beginning the process.
- **SC-002**: At least 70% of completed farmer sales result in visible payment confirmation within 10 minutes of trade execution, excluding delays caused by external payout providers.
- **SC-003**: Users who enable hedging reduce realized downside exposure during qualifying price drops by at least 20% compared with similar unhedged positions over the same period.
- **SC-004**: At least 90% of users complete their primary role-based task on first attempt: mint-and-sell for farmers, market trade for traders, and hedge-rule setup for active risk managers.
- **SC-005**: The three launch commodity markets maintain a median daily spread and available depth sufficient for at least 80% of submitted spot orders to receive a full or partial fill within 5 minutes during active trading hours.
- **SC-006**: At least 85% of surveyed farmer users report that KiliMarkets gives them faster or fairer market access than their usual offline selling channel.
- **SC-007**: English, French, and Swahili users complete onboarding with no more than a 10 percentage point difference in completion rate between language groups.
- **SC-008**: Fewer than 2% of completed minting, trading, and hedge actions require support intervention due to user confusion, duplicate action, or unclear status messaging.
