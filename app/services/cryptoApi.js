import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-key': '71ba89d300msh7c1322da7df8e3ep1860a2jsn328d060f494f',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', cryptoApiHeaders['x-rapidapi-key']);
            headers.set('x-rapidapi-host', cryptoApiHeaders['x-rapidapi-host']);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => `/coins?limit=${count || 10}`,
            transformResponse: (response) => response.data,
        }),
    }),
})

export const { useGetCryptosQuery } = cryptoApi;