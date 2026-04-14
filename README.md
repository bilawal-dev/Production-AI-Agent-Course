# Production AI Agent Course

Projects built while following [Production-grade AI Agents with LangChain.js, LangGraph.js, RAG, Next.js, LangSmith & real JS/TS projects](https://www.udemy.com/) on Udemy.

A JS/TS-native path to building real, shippable agentic systems — not toy demos.

## Projects

| # | Project | Description |
|---|---------|-------------|
| 01 | [Hello Agent](./01_Hello_Agent) | Multi-provider LLM setup (OpenAI, Gemini, Groq) with a clean provider factory |
| 02 | [JSON Structured Output](./02_Json_Structured_Output) | Strict Q&A pipeline with Zod schemas, guaranteed JSON responses, Next.js frontend |
| 03 | [Search Tool (LangChain)](./03_Search_Tool_Langchain) | Search agent with Tavily web search, LCEL pipeline, Next.js UI |
| 04 | [LCEL Web Search Chatbot](./04_LCEL_Web_Search_Chatbot) | Chatbot routing between direct LLM answers and Tavily web search via LCEL chains |
| 05 | [RAG Implementation](./05_RAG_Implementation) | Light RAG with document ingestion, in-memory vector store, and grounded answers with citations |
| 06 | [LangGraph Task Manager Agent](./06_Langgraph_Task_Manager_Agent) | Workflow agent with validate → plan → approve → execute nodes and human-in-the-loop |
| 07 | [Policy Agent with Vector DB](./07_Policy_Agent_With_Vector_DB) | Conversational RAG over PDFs with MongoDB vector store and citation-backed answers |

## Stack

- **Language:** TypeScript / Node.js
- **Frameworks:** LangChain.js, LangGraph.js, Next.js
- **LLM Providers:** OpenAI, Google Gemini, Groq
- **Tools:** Tavily Search, Zod schemas
- **Vector Stores:** In-memory, MongoDB Atlas Vector Search
- **Observability:** LangSmith

## Setup

Each project has its own dependencies. `cd` into the project folder and:

```bash
npm install
cp .env.example .env  # add your API keys
npm run dev
```
