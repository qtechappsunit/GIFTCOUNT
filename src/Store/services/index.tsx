import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import endpoints, { BASE_URL } from '../constants'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (userData) => ({
                url: endpoints.SIGNUP,
                method: 'POST',
                body: userData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: endpoints.LOGIN,
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        })
    }),
})

export const { useCreateUserMutation, useLoginMutation } = authApi;