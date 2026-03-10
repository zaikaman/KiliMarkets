const checklist = [
  'Root workspace scaffolding is in place.',
  'The web app package is initialized for Vite + React.',
  'Shared packages and contract workspaces are ready for Phase 2.',
  'Injective Testnet environment templates live under apps/web and infra/config.',
]

export function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">KiliMarkets</p>
        <h1>Phase 1 setup complete</h1>
        <p className="lede">
          The workspace is ready for foundational work on wallet connectivity, market adapters,
          and minting flows.
        </p>
        <ul>
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
