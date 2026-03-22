import { z } from "zod";
import { createChatModel } from "./lc-model";

export const AskResultSchema = z.object({
    summary: z.string().min(1).max(1000),
    confidence: z.number().min(0).max(1)
});

export type AskResult = z.infer<typeof AskResultSchema>

export async function askResult(query: string): Promise<AskResult | undefined> {
    const { model } = createChatModel();

    const systemPrompt = "You are a helpful AI agent that answers user questions clearly and accurately. Return only the requested JSON."

    const userPrompt =
        `Answer the following question:\n` +
        `"${query}"\n` +
        `Return fields: summary (your answer as a clear, helpful response), confidence (0 - 1, how confident you are in your answer)`

    const modelWithStructure = model?.withStructuredOutput(AskResultSchema);

    const response = await modelWithStructure?.invoke([
        {
            role: 'system',
            content: systemPrompt
        },
        {
            role: 'human',
            content: userPrompt
        }
    ]);

    return response;
}