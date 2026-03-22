import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatGroq } from "@langchain/groq";

enum Provider {
    Gemini = 'gemini',
    Groq = 'groq',
}

type ChatModelResult = {
    model: BaseChatModel | null;
    provider: Provider | null;
};

export function createChatModel(): ChatModelResult {

    const provider = process.env.PROVIDER;

    const modelConfig: Record<string, any> = {
        temperature: 0,
    }

    switch (provider) {
        case (Provider.Gemini):
            return {
                model: new ChatGoogleGenerativeAI({
                    model: "gemini-2.5-flash-lite",
                    ...modelConfig
                }),
                provider
            }
        case (Provider.Groq):
            return {
                model: new ChatGroq({
                    model: "llama-3.3-70b-versatile",
                    ...modelConfig
                }),
                provider
            }
        default:
            return {
                model: null,
                provider: null,

            }
    }
};