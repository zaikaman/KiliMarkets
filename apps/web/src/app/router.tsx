import { createBrowserRouter, Link, Outlet } from 'react-router-dom'
import { AsyncState, AppShell } from '@kilimarkets/ui'
import { App } from './App'

function RouteShell() {
  return (
    <AppShell
      badge="Injective Testnet"
      title="KiliMarkets foundation"
      subtitle="Shared configuration, wallet helpers, query policies, and service seams are in place for the first farmer and trader flows."
      meta={
        <div style={{ display: 'grid', gap: '8px', justifyItems: 'end' }}>
          <span style={{ fontSize: '0.8rem', color: '#5f4a38' }}>Phase 2 checkpoint</span>
          <strong style={{ fontSize: '1rem' }}>Foundation ready</strong>
        </div>
      }
      navItems={[
        { label: 'Overview', href: '/', active: true },
        { label: 'Minting', href: '/mint' },
        { label: 'Markets', href: '/markets' },
        { label: 'Dashboard', href: '/dashboard' },
      ]}
    >
      <Outlet />
    </AppShell>
  )
}

function PlaceholderRoute({
  cta,
  description,
  title,
}: {
  cta: string
  description: string
  title: string
}) {
  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <AsyncState
        status="idle"
        title={title}
        description={description}
        action={
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              padding: '10px 14px',
              borderRadius: '999px',
              background: '#2f5233',
              color: '#fdf8f0',
              textDecoration: 'none',
              width: 'fit-content',
            }}
          >
            {cta}
          </Link>
        }
      />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteShell />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'mint',
        element: (
          <PlaceholderRoute
            title="Minting surfaces come next"
            description="Lot creation, proof capture, and token issuance will land on top of the shared services added in the foundation phase."
            cta="Back to overview"
          />
        ),
      },
      {
        path: 'markets',
        element: (
          <PlaceholderRoute
            title="Market views are staged"
            description="Commodity allowlists, oracle registries, and query policies now exist so spot and derivatives interfaces can be connected safely in the next phase."
            cta="See foundation overview"
          />
        ),
      },
      {
        path: 'dashboard',
        element: (
          <PlaceholderRoute
            title="Dashboard services are scaffolded"
            description="Portfolio, settlement, and hedge-facing service contracts are prepared for user story work without blocking the routing shell."
            cta="Return home"
          />
        ),
      },
    ],
  },
])
