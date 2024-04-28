'use client'

import { TopPage } from '@/components/pages'
import { gql, useQuery } from '@urql/next'
import { Suspense } from 'react'

type Posts = {
  id: string
  title: string
  comments?: {
    id: string
    text: string
  }[]
}[]

const Loading = <div>loading...</div>

const Query = gql`
  query {
    posts {
      id
      title
      comments {
        id
        text
      }
    }
  }
`

export default function Page() {
  const [result] = useQuery<{ posts: Posts }>({ query: Query })
  const { data } = result
  return (
    <Suspense fallback={Loading}>
      <TopPage data={data} />
    </Suspense>
  )
}
