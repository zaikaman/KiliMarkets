import type { CSSProperties, ReactNode } from 'react'

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'offline'

export interface AsyncStateProps {
  status: AsyncStatus
  title: string
  description: string
  action?: ReactNode
  details?: ReactNode
}

const palette: Record<AsyncStatus, { accent: string; background: string }> = {
  idle: { accent: '#8a6a4a', background: '#fcf7f0' },
  loading: { accent: '#9a6700', background: '#fff7e0' },
  success: { accent: '#2f855a', background: '#ebfff3' },
  error: { accent: '#c05621', background: '#fff0eb' },
  offline: { accent: '#6b7280', background: '#f5f5f4' },
}

export function AsyncState({ action, description, details, status, title }: AsyncStateProps) {
  const tone = palette[status]

  return (
    <section
      aria-live="polite"
      style={{
        display: 'grid',
        gap: '12px',
        padding: '18px',
        borderRadius: '20px',
        border: `1px solid ${tone.accent}33`,
        background: tone.background,
        boxShadow: '0 12px 32px rgba(43, 33, 24, 0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span
          aria-hidden="true"
          style={dotStyle(tone.accent)}
        />
        <strong style={{ fontSize: '1rem', color: '#2b2118' }}>{title}</strong>
      </div>
      <p style={{ margin: 0, color: '#5f4a38', lineHeight: 1.55 }}>{description}</p>
      {details ? <div style={{ color: '#4b3a2d' }}>{details}</div> : null}
      {action ? <div>{action}</div> : null}
    </section>
  )
}

const dotStyle = (accent: string): CSSProperties => ({
  width: '10px',
  height: '10px',
  borderRadius: '999px',
  background: accent,
  boxShadow: `0 0 0 6px ${accent}22`,
})
