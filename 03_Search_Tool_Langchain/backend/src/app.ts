import express, { NextFunction, Request, Response } from 'express';

import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
import { ZodError } from 'zod';
import { handleError, handleSuccess } from './responseHandler';
import { webSearch } from './utils/webSearch';


const app = express();

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
    return handleSuccess(res, 200, 'Health Check Passed', null)
})

app.get('/', async (_req: Request, res: Response) => {
    const webSearchResponse = await webSearch(`Top 10 CS Universities in Pakistan`);
    return handleSuccess(res, 200, 'Web Search Completed', webSearchResponse)
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