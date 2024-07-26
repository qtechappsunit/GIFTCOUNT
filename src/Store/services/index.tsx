import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import endpoints, { BASE_URL } from '../constants'

export const authApi = createApi({
    reducerPath: 'authReducer',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (userData) => ({
                url: endpoints.SIGNUP,
                method: 'POST',
                body: userData
            })
        })
    }),
})

export const { useCreateUserMutation } = authApi;