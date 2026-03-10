import { AsyncState } from '@kilimarkets/ui'

const checklist = [
  'Domain models cover users, lots, assets, orders, positions, hedges, and localization.',
  'Injective testnet chain, endpoint, and public client helpers are exported from the shared SDK package.',
  'Wallet connectors, subaccount helpers, and low-bandwidth query policies are ready for app features.',
  'Service seams for wallet, portfolio, market, minting, and hedging are scaffolded for the first user stories.',
]

export function App() {
  return (
    <section className="hero-card hero-card--light">
      <p className="eyebrow eyebrow--earth">KiliMarkets</p>
      <h2 className="section-title">Phase 2 foundation is complete</h2>
      <p className="lede lede--dark">
        The app now has shared network policy, wallet boundaries, route composition, and mobile-first
        primitives required before any farmer or trader story work begins.
      </p>

      <div className="feature-grid">
        {checklist.map((item) => (
          <article key={item} className="feature-tile">
            <span className="feature-marker" aria-hidden="true" />
            <p>{item}</p>
          </article>
        ))}
      </div>

      <AsyncState
        status="success"
        title="Foundation checkpoint passed"
        description="Phase 2 created the shared groundwork needed for market registries, providers, wallet helpers, UI primitives, and service boundaries."
      />
    </section>
  )
}
