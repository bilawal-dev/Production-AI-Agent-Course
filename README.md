# Production AI Agent Course

Projects built while following [Production-grade AI Agents with LangChain.js, LangGraph.js, RAG, Next.js, LangSmith & real JS/TS projects](https://www.udemy.com/) on Udemy.

A JS/TS-native path to building real, shippable agentic systems — not toy demos.

## Projects

| # | Project | Description |
|---|---------|-------------|
| 01 | [Hello Agent](./01_Hello_Agent) | Multi-provider LLM setup (OpenAI, Gemini, Groq) with a clean provider factory |
| 02 | [JSON Structured Output](./02_Json_Structured_Output) | Strict Q&A pipeline with Zod schemas, guaranteed JSON responses, Next.js frontend |
| 03 | [Search Tool (LangChain)](./03_Search_Tool_Langchain) | Search agent with Tavily web search, LCEL pipeline, Next.js UI |

## Stack

- **Language:** TypeScript / Node.js
- **Frameworks:** LangChain.js, LangGraph.js, Next.js
- **LLM Providers:** OpenAI, Google Gemini, Groq
- **Tools:** Tavily Search, Zod schemas
- **Observability:** LangSmith

## Setup

Each project has its own dependencies. `cd` into the project folder and:

```bash
npm install
cp .env.example .env  # add your API keys
npm run dev
```
