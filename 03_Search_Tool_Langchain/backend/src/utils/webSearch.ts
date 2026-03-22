import { tavilyClient } from "./tavilyClient";

export async function webSearch(query: string) {
    try {
        const tavilyResponse = await tavilyClient.search(query, {
            searchDepth: 'basic',
            maxResults: 5,
            includeAnswer: false,
            includeImages: false,
        });

        const webSearchResults = tavilyResponse.results;

        return webSearchResults.map((webSearchResult) => {
            return {
                title: webSearchResult.title,
                url: webSearchResult.url,
                content: webSearchResult.content,
            }
        })
    } catch (error: any) {
        throw error;
    }
}