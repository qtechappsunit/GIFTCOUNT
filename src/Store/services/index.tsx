import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import endpoints, {BASE_URL} from '../constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().authReducer.token;
      // console.log('state ===>', token)
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({}),
});


