import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { z, ZodError } from 'zod';
import { askResult } from './ask-core';
import { handleError, handleSuccess } from './responseHandler';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
    return handleSuccess(res, 200, 'Health Check Passed', null)
})

const chatSchema = z.object({
    query: z.string('Chat Query Is Required').min(3, 'Chat Query Must Be 3 Chars').max(1000, 'Chat Query Must Be Atmost 1000 Chars').trim(),
})

app.post('/ask', async (req: Request, res: Response) => {
    try {
        const { query } = chatSchema.parse(req.body);

        const response = await askResult(query);

        if (!response) {
            throw new Error('Failed To Generate Response');
        }

        return handleSuccess(res, 200, 'Query Answered Successfully', response)

    } catch (error: any) {
        throw error;
    }
})

// * Global Error-Handling Middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    // * Displaying Validation Error From Zod
    if (error instanceof ZodError) {
        return handleError(res, 400, error.issues[0]?.message || 'Input Validation Error');
    }

    return handleError(res, 500, error.message);
});

export default app;