# Contract Interface: CosmWasm Hedging and Exchange Automation

## Purpose

Defines the execute and query surface for CosmWasm contracts that manage hedge rules, Injective exchange order routing, and risk-triggered automation.

## Contracts

### 1. `hedge-manager`

**Responsibilities**:
- store hedge rules
- validate oracle freshness and confidence
- create derivative or spot hedge orders through Injective modules
- keep rule execution idempotent

## Execute messages

### `CreateRule`
```json
{
  "create_rule": {
    "target_market_id": "string",
    "trigger_type": "price_drop_percent",
    "trigger_threshold_bps": 1000,
    "hedge_percent_bps": 3000,
    "action_type": "open_short",
    "subaccount_id": "string"
  }
}
```

### `UpdateRule`
```json
{
  "update_rule": {
    "rule_id": "string",
    "trigger_threshold_bps": 1200,
    "hedge_percent_bps": 2500,
    "status": "active"
  }
}
```

### `PauseRule`
```json
{
  "pause_rule": {
    "rule_id": "string"
  }
}
```

### `EvaluateRule`
```json
{
  "evaluate_rule": {
    "rule_id": "string",
    "oracle_price": "string",
    "oracle_publish_time": 0,
    "oracle_confidence": "string"
  }
}
```

### `ExecuteHedge`
```json
{
  "execute_hedge": {
    "rule_id": "string",
    "market_id": "string",
    "order_type": "market",
    "direction": "sell",
    "quantity": "string",
    "subaccount_id": "string",
    "client_order_id": "string"
  }
}
```

## Query messages

### `GetRule`
```json
{ "get_rule": { "rule_id": "string" } }
```

### `ListRulesByOwner`
```json
{ "list_rules_by_owner": { "owner": "inj...", "start_after": null, "limit": 20 } }
```

### `GetExecutionHistory`
```json
{ "get_execution_history": { "rule_id": "string" } }
```

### `GetRiskSnapshot`
```json
{ "get_risk_snapshot": { "owner": "inj...", "market_id": "string" } }
```

## Events

- `rule_created(rule_id, owner, market_id)`
- `rule_updated(rule_id)`
- `rule_paused(rule_id)`
- `rule_triggered(rule_id, trigger_price, execution_id)`
- `hedge_order_submitted(rule_id, market_id, cid)`
- `hedge_order_failed(rule_id, reason)`

## Rules

- a rule can trigger at most once per qualifying event unless re-armed by update
- new hedge openings require fresh oracle data within configured max-age bounds
- if oracle confidence or freshness is unacceptable, the contract MUST block new risk-increasing actions
- every exchange order submission MUST include a client order id for reconciliation
- subaccounts for automation MUST be explicit and isolated from optional manual trading paths

## Frontend interaction contract

1. user creates a rule through `CreateRule`
2. frontend displays active rule state from `GetRule` and query lists
3. automation or user-initiated evaluation calls `EvaluateRule`
4. when the condition is met, `ExecuteHedge` submits an Injective exchange order
5. frontend reconciles rule state with position and trade data from the Indexer

## Validation expectations

- query schemas MUST be generated and versioned with contract releases
- all failures MUST return user-displayable reasons
- rule execution MUST be idempotent across retries and WasmX-triggered re-entry
