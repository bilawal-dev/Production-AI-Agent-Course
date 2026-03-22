import { invokeAgent, Providers, type Provider } from "./modalProviders";

import dotenv from 'dotenv';
dotenv.config();

const provider = process.env.PROVIDER;
const validProviders: string[] = Object.values(Providers);

if (!provider || !validProviders.includes(provider)) {
    console.error(`Invalid or missing PROVIDER. Expected one of: ${validProviders.join(', ')}, got: ${provider}`);
    process.exit(1);
}

invokeAgent('Hey, Tell Me About Yourself. Model | Company | Details Etc', provider as Provider).then((data) => {
    console.log(data);
});