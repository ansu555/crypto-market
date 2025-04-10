import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';   

const cryptoNewsHeaders = {
    'x-rapidapi-key': '71ba89d300msh7c1322da7df8e3ep1860a2jsn328d060f494f',
    'x-rapidapi-host': 'news-api65.p.rapidapi.com'
}

const baseUrl = 'https://news-api65.p.rapidapi.com/api/v1/crypto/articles/search';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/v1/search?q=${newsCategory}&lang=en&country=us&sort_by=publishedAt&page=1&size=${count}`),
            transformResponse: (response) => {
                // Transform API response to match expected format in components
                if (response && response.articles) {
                    return {
                        articles: response.articles.map(article => ({
                            id: article.id || article.url || Math.random().toString(),
                            title: article.title,
                            snippet: article.description || article.content || article.summary || '',
                            source: article.source?.name || article.provider?.name || 'Unknown',
                            date: new Date(article.publishedAt || article.published_at || Date.now()).toLocaleDateString(),
                            url: article.url,
                            imageUrl: article.image?.url || article.image || article.urlToImage || '/placeholder.svg',
                            tags: article.keywords || article.topics || article.categories || ['cryptocurrency'],
                        }))
                    };
                }
                return { articles: [] };
            }
        })
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;