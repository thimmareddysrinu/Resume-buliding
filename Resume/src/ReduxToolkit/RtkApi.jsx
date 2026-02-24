
// Step 1: Create API slice (src/services/api.js)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/endpoint',
    }),
  }),
})

export const { useGetDataQuery } = api