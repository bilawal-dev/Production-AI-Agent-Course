export const Providers = {
    Gemini: 'gemini',
    OpenAI: 'openai',
    Groq: 'groq',
} as const;

export type Provider = (typeof Providers)[keyof typeof Providers];

interface GeminiRequest {
    contents: Array<{
        parts: Array<{
            text: string
        }>,
        role: 'user' | 'model'
    }>
}

interface GeminiResponse {
    candidates?: Array<{
        content?: {
            role?: string;
            parts?: Array<{
                text?: string;
            }>;
        };
        finishReason?: string;
    }>;
    modelVersion?: string;
    promptFeedback?: unknown;
    error?: {
        message: string;
    };
}

interface GroqRequest {
    messages: Array<{
        content: string,
        role: 'user'
    }>
    model: string
}

interface GroqResponse {
    id: string,
    object: string,
    created: string,
    model: string,
    choices: Array<{
        index: number,
        message: {
            role: string,
            content: string,
        }
    }>
}

interface AgentResponse {
    response: string | undefined;
    model: string | undefined;
}

async function invokeGemini(message: string): Promise<AgentResponse> {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_MODEL = 'gemini-2.5-flash-lite';
    const GEMINI_CONTENT_GENERATE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

    const body: GeminiRequest = {
        contents: [
            {
                role: 'user',
                parts: [{ text: message }],
            },
        ],
    };

    const response = await fetch(GEMINI_CONTENT_GENERATE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY as string,
        },
        body: JSON.stringify(body),
    });

    const data: GeminiResponse = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("Gemini returned no text");
    }

    return {
        response: text,
        model: data.modelVersion,
    };
}

async function invokeGroq(message: string): Promise<AgentResponse> {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GROQ_MODEL = 'llama-3.1-8b-instant';
    const GROQ_CONTENT_GENERATE_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    const body: GroqRequest = {
        model: GROQ_MODEL,
        messages: [
            {
                role: 'user',
                content: message,
            },
        ],
    };

    const response = await fetch(GROQ_CONTENT_GENERATE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
    });

    const data: GroqResponse = await response.json();

    return {
        response: data.choices[0]?.message?.content,
        model: data.model,
    };
}

export async function invokeAgent(message: string, provider: Provider): Promise<AgentResponse> {
    try {
        switch (provider) {
            case 'gemini':
                return await invokeGemini(message);
            case 'groq':
                return await invokeGroq(message);
            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            response: undefined,
            model: undefined,
        };
    }
}