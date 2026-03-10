# Public Application Service Contracts

## Purpose

Defines the client-side service boundaries that the React application uses to keep frontend concerns separate from protocol concerns.

## `wallet-service`

**Inputs**:
- wallet provider selection: `keplr`, `metamask`
- preferred network: Injective Testnet only

**Outputs**:
- connected address
- wallet type
- network status
- signing capability state

**Rules**:
- must reject unsupported networks with a recovery prompt
- must expose one-tap reconnect where wallet session exists

## `portfolio-service`

**Inputs**:
- wallet address
- optional role context

**Outputs**:
- aggregate balances
- spot holdings
- perpetual positions
- liquidity earnings
- recent settlement records

**Rules**:
- must prefer aggregated account portfolio queries over many separate calls
- must return a partial-success state if some read models refresh later than others

## `market-service`

**Inputs**:
- selected market
- optional depth size
- optional polling or streaming mode

**Outputs**:
- market metadata
- orderbook snapshot
- recent trades
- price chart points
- funding and position metadata for perp markets

**Rules**:
- must cache market metadata locally
- must stream only on active market views

## `minting-service`

**Inputs**:
- commodity lot draft
- proof attachments
- mint quantity

**Outputs**:
- lot registration status
- proof submission status
- attestation status view
- minted asset reference

**Rules**:
- must reconcile chain state after every write
- must preserve draft progress during intermittent connectivity

## `hedge-service`

**Inputs**:
- rule draft
- market reference
- portfolio exposure snapshot

**Outputs**:
- rule status
- trigger history
- linked hedge actions
- risk warnings

**Rules**:
- must surface stale oracle or execution-blocked states clearly
- must distinguish manual vs automated subaccount activity
