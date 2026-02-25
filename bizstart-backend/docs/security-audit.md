# Security Architecture & Audit Overview: BizStart AI Backend

## 1. System Overview

The BizStart AI backend serves as a centralized API Gateway and data access layer for a React-based frontend. It is built on Node.js/Express and manages user authentication, business profile data (stored in TiDB), and acts as a secure proxy to an external Data Science RAG Chatbot API.

**Tech Stack:**

* **Runtime:** Node.js / Express.js
* **Database:** TiDB (MySQL compatible) via Sequelize ORM
* **Authentication:** JWT (JSON Web Tokens) & Google OAuth 2.0
* **Validation:** Joi (Schema-based request validation)
* **External Integrations:** Data Science RAG API (Vercel deployment)

## 2. Architecture & Attack Surface

The system architecture introduces three primary zones of interaction that require security auditing:

1. **Public API Endpoints:** Routes exposed without authentication (Registration, Login, Initial AI Industry Suggestion).
2. **Protected API Endpoints:** Routes requiring a valid JWT (Dashboards, Chat, Profile Management).
3. **Server-to-Server Proxy:** The Node.js backend executing backend `fetch()` calls to the external Data Science AI Service.

## 3. Authentication & Authorization

### 3.1 Local Authentication

* **Method:** Phone Number/Email and Password.
* **Hashing:** Passwords are hashed using `bcrypt` before database insertion.
* **Audit Request:** Verify password complexity enforcement and bcrypt salt rounds.

### 3.2 Google OAuth

* **Method:** Frontend retrieves Google Access Token; backend verifies it via Google Auth Library.
* **Audit Request:** Ensure the backend properly validates the OAuth token audience and issuer to prevent token substitution attacks.

### 3.3 Session Management

* **Method:** Stateless JWT (Bearer Tokens) passed in the `Authorization` header.
* **Audit Request:** Verify JWT signing algorithm (e.g., HS256), secret strength (`JWT_SECRET`), and token expiration lifecycle (`JWT_EXPIRES_IN`).

## 4. Data Protection & Privacy

### 4.1 Data at Rest (TiDB)

The system stores the following Personally Identifiable Information (PII) and business intellectual property:

* User Names, Emails, and Phone Numbers.
* Proprietary Business Ideas and Financial/Stage metrics.
* Complete histories of user conversations with the AI.

**Audit Request:** Verify that the connection string to TiDB enforces SSL/TLS encryption.

### 4.2 Data in Transit

All traffic between the React frontend and the Node.js API must occur over HTTPS in production.

## 5. Security Controls Implemented

### 5.1 Cross-Origin Resource Sharing (CORS)

CORS is dynamically configured to reject requests from unauthorized origins.

* **Mechanism:** Validates incoming requests against the `FRONTEND_URL` environment variable.

### 5.2 Input Validation

* **Mechanism:** `joi` validation middleware is applied to routes before controller execution to prevent NoSQL/SQL injection and malformed payloads.

### 5.3 Rate Limiting

* **Mechanism:** `express-rate-limit` is applied globally to the `/api` route, with stricter limits on the `/api/messages` and `/api/ai` endpoints.
* **Audit Request:** Review current threshold limits to ensure they effectively mitigate brute-force and DDoS attempts without degrading user experience.

## 6. External Integration: Data Science AI Proxy

This is a critical security boundary. To protect API keys and pipeline architecture, the React frontend never speaks directly to the Data Science RAG API.

**The Proxy Flow:**

1. Frontend sends a JWT-authenticated request containing a `message` to `POST /api/ai/chat`.
2. The Node.js API Gateway intercepts, strips frontend headers, and constructs a new Server-to-Server POST request to the `AI_SERVICE_URL`.
3. Node.js payload format: `{ "question": "<user_input>" }`.

**Audit Request (High Priority):**

* **Prompt Injection:** Assess the system's vulnerability to prompt injection attacks passed through the Node.js gateway into the Data Science RAG pipeline.
* **Service Authentication:** Currently, the Data Science pipeline (`https://biz-start-ai-rust.vercel.app/api/query/`) acts as a public endpoint. We require the security team to define a secure handshake (e.g., internal API keys or mTLS) between the Node.js API Gateway and the Data Science Vercel deployment to prevent unauthorized public access to the AI compute resources.

## 7. Requested Action Items for the Security Team

Please perform the following reviews before production deployment:

1. **Penetration Testing:** Target the `/api/auth/register`, `/api/auth/login`, and `/api/ai/*` routes for standard OWASP Top 10 vulnerabilities (XSS, Injection, Broken Access Control).
2. **Dependency Audit:** Run SCA (Software Composition Analysis) on the backend `package.json` to identify vulnerable packages.
3. **Proxy Hardening:** Work with the Data Science team to implement authorization headers on the RAG pipeline, and update the Node.js `ai.controller.js` to pass this secure header.
4. **Error Handling Review:** Verify that the centralized `error.middleware.js` does not leak stack traces or database schema details to the client in the production environment.