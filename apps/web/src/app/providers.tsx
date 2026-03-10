import { QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createQueryClient } from '@kilimarkets/sdk-injective'
import { useNetworkMode } from '../hooks/useNetworkMode'
import { router } from './router'

export function AppProviders() {
  const networkMode = useNetworkMode()
  const queryClient = useMemo(() => createQueryClient(networkMode.queryMode), [networkMode.queryMode])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
