import { tavily } from "@tavily/core";

const tavilyApiKey = process.env.TAVILY_API_KEY;

if (!tavilyApiKey) {
    throw new Error('Tavily API Key Config Missing');
}

export const tavilyClient = tavily({ apiKey: tavilyApiKey });