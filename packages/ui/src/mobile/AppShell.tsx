import type { CSSProperties, ReactNode } from 'react'

export interface AppShellNavItem {
  label: string
  href?: string
  active?: boolean
  icon?: ReactNode
}

export interface AppShellProps {
  badge?: string
  title: string
  subtitle?: string
  meta?: ReactNode
  actions?: ReactNode
  navItems?: AppShellNavItem[]
  children: ReactNode
}

const shellStyle: CSSProperties = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top left, rgba(190, 130, 74, 0.16), transparent 28%), linear-gradient(180deg, #f7f2e8 0%, #efe5d4 48%, #e8dcc8 100%)',
  color: '#2b2118',
}

const frameStyle: CSSProperties = {
  width: 'min(100%, 1120px)',
  margin: '0 auto',
  padding: 'clamp(16px, 4vw, 32px)',
}

const heroStyle: CSSProperties = {
  display: 'grid',
  gap: '16px',
  padding: 'clamp(20px, 5vw, 32px)',
  borderRadius: '28px',
  background: 'rgba(255, 251, 245, 0.88)',
  border: '1px solid rgba(112, 78, 45, 0.16)',
  boxShadow: '0 24px 60px rgba(72, 52, 35, 0.12)',
}

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 'clamp(2rem, 6vw, 4rem)',
  lineHeight: 0.95,
  letterSpacing: '-0.04em',
}

const navListStyle: CSSProperties = {
  listStyle: 'none',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '12px',
  margin: 0,
  padding: 0,
}

export function AppShell({ badge, title, subtitle, meta, actions, navItems, children }: AppShellProps) {
  return (
    <div style={shellStyle}>
      <div style={frameStyle}>
        <header style={heroStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'grid', gap: '10px', maxWidth: '64ch' }}>
              {badge ? (
                <span
                  style={{
                    display: 'inline-flex',
                    width: 'fit-content',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    background: '#4d7c0f',
                    color: '#fefce8',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  {badge}
                </span>
              ) : null}
              <h1 style={titleStyle}>{title}</h1>
              {subtitle ? (
                <p style={{ margin: 0, color: '#5f4a38', lineHeight: 1.6, fontSize: '1rem' }}>{subtitle}</p>
              ) : null}
            </div>
            {(meta || actions) ? (
              <div style={{ display: 'grid', gap: '12px', justifyItems: 'end', flex: '1 1 240px' }}>
                {meta}
                {actions}
              </div>
            ) : null}
          </div>
          {navItems?.length ? (
            <nav aria-label="Primary">
              <ul style={navListStyle}>
                {navItems.map((item) => {
                  const content = (
                    <span
                      style={{
                        display: 'grid',
                        gap: '6px',
                        padding: '14px 16px',
                        borderRadius: '18px',
                        background: item.active ? '#2f5233' : 'rgba(47, 82, 51, 0.08)',
                        color: item.active ? '#fdf8f0' : '#2f5233',
                        border: '1px solid rgba(47, 82, 51, 0.16)',
                        textDecoration: 'none',
                        minHeight: '100%',
                      }}
                    >
                      {item.icon}
                      <strong style={{ fontSize: '0.95rem' }}>{item.label}</strong>
                    </span>
                  )

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href} style={{ textDecoration: 'none' }}>
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          ) : null}
        </header>
        <div style={{ paddingBlock: '20px 40px' }}>{children}</div>
      </div>
    </div>
  )
}
