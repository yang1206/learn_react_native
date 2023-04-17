import type { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { useQuery } from '@tanstack/react-query'
import { client } from '../common'
import type { ThreeDResponse } from '../types/weather'

const key = 'd704c26ca0ff430a923f2ad6ac15ecfa'

type Variables = { location: string }

export const ues3d = createQuery<ThreeDResponse, Variables, AxiosError>(
  {
    primaryKey: 'weather/3d',
    queryFn: async ({ queryKey: [primaryKey, variables] }) => {
      const response = await client.get(`${primaryKey}?location=${variables.location}&key=${key}&lang=zh`)
      return response.data
    },
    enabled: (data, variables) => !data! && !!variables.location,
  },
)

export const uesCity = createQuery<any, Variables, AxiosError>(
  {
    primaryKey: 'city/lookup',
    queryFn: async ({ queryKey: [primaryKey, variables] }) => {
      const response = await client.get(`https://geoapi.qweather.com/v2/${primaryKey}?location=${variables.location}&key=${key}&lang=zh`)
      return response.data
    },
    enabled: (data, variables) => !data! && !!variables.location,
  },
)

type IndicesVariables = { location: string; type: string }

export const uesIndices = createQuery<any, IndicesVariables, AxiosError>(
  {
    primaryKey: 'indices/3d',
    queryFn: async ({ queryKey: [primaryKey, variables] }) => {
      const response = await client.get(`${primaryKey}?location=${variables.location}&type=${variables.type}&key=${key}&lang=zh`)
      return response.data
    },
    enabled: (data, variables) => !data! && !!variables.location,
  },
)

export function useThreeD({ location }: Variables) {
  return useQuery(['3d'], async () => {
    const response = await client.get(`3d?location=${location}&key=${key}&lang=zh`)
    return response.data
  }, { enabled: !!location })
}
