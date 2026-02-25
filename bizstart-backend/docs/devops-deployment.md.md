# DevOps Deployment Guide

This document outlines the infrastructure, environment, and deployment requirements for the BizStart AI Backend API Gateway.

## 1. Infrastructure Overview
* **Runtime:** Node.js (v18 or higher recommended)
* **Package Manager:** npm
* **Framework:** Express.js
* **Database:** TiDB (MySQL-compatible Serverless/Cloud DB)

## 2. Environment Variables
The application requires the following environment variables to be injected into the production environment (e.g., Render, Railway, AWS). 

**Server & Networking**
* `PORT` - The port the Node.js server runs on (Default: 5000).
* `FRONTEND_URL` - The exact URL of the production React frontend (e.g., `https://bizstartai.vercel.app`). **Critical:** This enforces strict CORS policies.

**Database (TiDB)**
* `DB_HOST` - TiDB host address.
* `DB_USER` - TiDB username.
* `DB_PASSWORD` - TiDB password.
* `DB_NAME` - `bizstart_db`
* `DB_PORT` - `4000` (Standard TiDB connection port).

**Security & Auth**
* `JWT_SECRET` - A strong, 256-bit randomly generated string for signing session tokens.
* `JWT_EXPIRES_IN` - Set to `7d` or `30d`.
* `GOOGLE_CLIENT_ID` - Google OAuth 2.0 Client ID for social login.

**Microservices**
* `AI_SERVICE_URL` - The base URL of the Data Science RAG API (e.g., `https://biz-start-ai-rust.vercel.app`).

## 3. Build & Run Commands

**Install Dependencies:**
\`\`\`bash
npm install
\`\`\`

**Start Production Server:**
*(Note: Ensure your `package.json` has a standard "start" script pointing to `server.js`)*
\`\`\`bash
npm start
\`\`\`

## 4. Health Checks & Monitoring
To verify that the deployment is successful and the server is running, configure your load balancer or CI/CD pipeline to ping the root endpoint.

* **Endpoint:** `GET /`
* **Expected Response (200 OK):**
  \`\`\`json
  { "message": "BizStart AI Backend Running" }
  \`\`\`

## 5. Database Synchronization
Currently, the application uses `sequelize.sync()` on startup to ensure tables exist. Ensure the TiDB cluster is fully provisioned and accessible over port 4000 before the Node.js application attempts to start, otherwise the server crash-loops.