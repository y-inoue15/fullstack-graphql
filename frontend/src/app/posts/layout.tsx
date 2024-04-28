'use client'

import {
  UrqlProvider,
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from '@urql/next'
import { useMemo } from 'react'

export default function Layout({ children }: React.PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    })
    const client = createClient({
      url: 'http://localhost:5000/graphql',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
      requestPolicy: 'cache-and-network',
    })

    return [client, ssr]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}
