import {creatApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders = {
    'x-rapidapi-key': '71ba89d300msh7c1322da7df8e3ep1860a2jsn328d060f494f',
	'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
};
const baseUrl = 'https://coinranking1.p.rapidapi.com/coins';

const creatRequest = (url) => ({url, headers: cryptoApiHeaders});
export const cryptoApi = creatApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => creatRequest('/coins'),
        }),
    }),
})

export const {
    useGetCryptosQuery,
} = cryptoApi;xz
// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/stats',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl'
//     },
//     headers: {
//       'x-rapidapi-key': '71ba89d300msh7c1322da7df8e3ep1860a2jsn328d060f494f',
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
//     }
//   };