import { useEffect, useMemo, useState } from 'react'
import type { QueryPerformanceMode } from '@kilimarkets/sdk-injective'

interface NetworkInformationLike extends EventTarget {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
  downlink?: number
  rtt?: number
  saveData?: boolean
  addEventListener(type: 'change', listener: EventListenerOrEventListenerObject): void
  removeEventListener(type: 'change', listener: EventListenerOrEventListenerObject): void
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike
}

export interface NetworkModeState {
  profile: 'standard' | 'constrained'
  queryMode: QueryPerformanceMode
  reason: string
}

const getConnection = () => (navigator as NavigatorWithConnection).connection

const resolveProfile = (): NetworkModeState => {
  if (typeof navigator === 'undefined') {
    return { profile: 'standard', queryMode: 'standard', reason: 'Browser APIs unavailable.' }
  }

  const connection = getConnection()
  const constrained = Boolean(
    connection?.saveData ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g' ||
      (connection?.downlink !== undefined && connection.downlink < 1.5),
  )

  return constrained
    ? {
        profile: 'constrained',
        queryMode: 'constrained',
        reason: 'Low-bandwidth mode reduces polling and extends cache lifetimes.',
      }
    : {
        profile: 'standard',
        queryMode: 'standard',
        reason: 'Standard mode keeps market data fresher with background refresh.',
      }
}

export const useNetworkMode = (): NetworkModeState => {
  const [profile, setProfile] = useState<NetworkModeState>(() => resolveProfile())

  useEffect(() => {
    const connection = getConnection()
    if (!connection) {
      return
    }

    const update = () => setProfile(resolveProfile())
    connection.addEventListener('change', update)
    return () => connection.removeEventListener('change', update)
  }, [])

  return useMemo(() => profile, [profile])
}
