import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

interface ModelConfigOpt {
    temperature: number,
    maxOutputTokens: number,
}

export function getChatModel(modelConfigOpt: ModelConfigOpt): BaseChatModel {

    const googleApiKey = process.env.GOOGLE_API_KEY;
    const googleModel = 'gemini-2.0-flash-lite'

    if (!googleApiKey || !googleModel) {
        throw new Error('Google Gemini API Config Missing');
    }

    return new ChatGoogleGenerativeAI({
        model: googleModel,
        apiKey: googleApiKey,
        temperature: modelConfigOpt.temperature,
        maxOutputTokens: modelConfigOpt.maxOutputTokens,
    })
}