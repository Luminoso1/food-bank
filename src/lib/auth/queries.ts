import { queryOptions } from '@tanstack/react-query'
import { getSession } from './fn'

export const userKey = ['user']

export const getCurrentUser = () => {
  return queryOptions({
    queryKey: userKey,
    queryFn: async () => {
      const session = await getSession()
      if (!session) return null
      return session.user
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}
