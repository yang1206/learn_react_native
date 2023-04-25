import type { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'

import { client } from '../common'
import type { Post } from './types'

type Response = Post[]
type Variables = void // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const usePosts = createQuery<Response, Variables, AxiosError>(
  {
    primaryKey: 'posts',
    queryFn: async ({ queryKey: [primaryKey] }) => {
      const response = await client.get(`${primaryKey}`)
      return response.data.posts
    },
    enabled: data => !data,
  },
)
