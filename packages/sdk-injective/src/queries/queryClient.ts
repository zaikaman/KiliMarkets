import { QueryClient } from '@tanstack/react-query'

export type QueryPerformanceMode = 'standard' | 'constrained'

export interface QueryPolicy {
  staleTime: number
  gcTime: number
  retry: number
  refetchOnWindowFocus: boolean
  refetchOnReconnect: boolean
  refetchInterval: false | number
}

export const queryPolicies: Record<QueryPerformanceMode, QueryPolicy> = {
  standard: {
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: 30_000,
  },
  constrained: {
    staleTime: 60_000,
    gcTime: 15 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  },
}

export const createQueryClient = (mode: QueryPerformanceMode = 'standard') => {
  const policy = queryPolicies[mode]

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: policy.staleTime,
        gcTime: policy.gcTime,
        retry: policy.retry,
        refetchOnWindowFocus: policy.refetchOnWindowFocus,
        refetchOnReconnect: policy.refetchOnReconnect,
        refetchInterval: policy.refetchInterval,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}
