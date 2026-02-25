# Data Science Integration & Proxy Guide

This document defines the communication contract between the Node.js API Gateway (Backend) and the Data Science RAG Chatbot Service.

## 1. Architecture Overview
The Node.js backend acts as a secure API Gateway. The frontend React application never communicates directly with the Data Science API. Instead, Node.js intercepts frontend requests, applies rate limiting and JWT authentication, and forwards a strict payload to the Data Science API.

* **Target Base URL:** Configured via `AI_SERVICE_URL` in the Node.js environment.
* **Target Endpoint:** `POST /api/query/`

## 2. Payload Contracts

### 2.1 Standard Query (Chat & Mentor)
When a user sends a message through the AI Mentor interface, Node.js forwards it using the `question` key.

**Sent by Node.js:**
\`\`\`json
{
  "question": "How do I calculate profit margins?"
}
\`\`\`

**Expected from Data Science:**
\`\`\`json
{
  "answer": "To calculate profit margins, you subtract your expenses..."
}
\`\`\`

### 2.2 System Prompts (Industry Suggestion)
During user onboarding, Node.js uses the Data Science RAG pipeline as a classification model. Node.js wraps the user's business idea in a strict system prompt to force a one-word answer.

**Sent by Node.js:**
\`\`\`json
{
  "question": "Selling organic soap. Based on these details, pick the best industry ID from this exact list: beauty, retail, small-scale, service, fashion. Return ONLY the word of the ID. No sentences. No punctuation."
}
\`\`\`

**Expected from Data Science:**
\`\`\`json
{
  "answer": "beauty"
}
\`\`\`
*(Note: Node.js applies a safety fallback. If the RAG model hallucinates or the server is down, Node.js defaults the user to "retail" to prevent the onboarding flow from breaking).*

## 3. Pending Action Items for Data Science Team
1. **Service Authentication:** The Data Science `/api/query/` endpoint is currently public. The Data Science team needs to implement an API Key or Bearer Token requirement. Once implemented, provide the secret to the Backend team so it can be added to the Node.js `fetch()` authorization headers.
2. **Response Latency:** Ensure the vector database retrieval and LLM generation stay under standard HTTP timeout limits (typically 10-15 seconds) to prevent the Node.js proxy from dropping the connection.