# BizStart AI - Backend API Gateway

Welcome to the BizStart AI Backend repository! This Node.js/Express server acts as the central API Gateway, managing user authentication, TiDB database operations, and securely proxying AI requests to the Data Science RAG pipeline.

### Live API Base URL
**Production:** `https://bizstartai-backend.onrender.com/api`

---

## Backend Architecture

The backend follows a layered API Gateway architecture to separate concerns, protect the database, and securely route AI requests.

```text
Client (React Frontend)
        |
Routes (/api/auth, /api/ai, etc.)
        |
Middleware (JWT Auth, Joi Validation, Rate Limiting)
        |
Controllers (Business Logic & Request Handling)
        |
Services / API Gateway (Proxy to Data Science RAG API)
        |
Models (Sequelize ORM)
        |
Database (TiDB / MySQL)

```

---

## Documentation Directory

To keep this repository clean and organized for a cross-functional team, role-specific documentation is separated into the `docs/` folder. Please read the document relevant to your track:

* **[Frontend Team: API Integration Guide](docs/frontend-integration.md)** - Details on all endpoints, JSON bodies, authentication headers, and alias routes.
* **[Cybersecurity Team: Security & Audit Overview](docs/security-audit.md)** - Details on JWT handling, bcrypt hashing, database encryption, and proxy attack surfaces.
* **[DevOps Team: Deployment Guide](docs/devops-deployment.md)** - Infrastructure setup, CORS configuration, and server requirements.
* **[Data Science Team: RAG API Proxy Guide](docs/data-science-proxy.md)** - Contract for the JSON payloads sent between this Node.js API Gateway and the Rust/Python RAG pipeline.

---

## Tech Stack Overview

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** TiDB (MySQL compatible)
* **ORM:** Sequelize
* **Authentication:** JWT (Local Auth) & Google Auth Library (OAuth 2.0)
* **Rate Limiting:** express-rate-limit

---

## Environment Variables

Create a `.env` file in the root directory and configure the following variables before running the server:

```env
# Server & Network
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database (TiDB)
DB_HOST=localhost
DB_PORT=4000
DB_NAME=bizstart_db
DB_USER=root
DB_PASSWORD=your_db_password

# Authentication
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_cloud_oauth_client_id

# Microservices
AI_SERVICE_URL=[https://biz-start-ai-rust.vercel.app](https://biz-start-ai-rust.vercel.app)

```

---

## Local Setup Instructions

1. **Clone the repository:**
```bash
git clone [https://github.com/Starr365/BizStartAI.git](https://github.com/Starr365/BizStartAI.git)
cd BizStartAI/bizstart-backend

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure environment variables:**
Copy the `.env.example` file to `.env` and fill in your local database credentials and API keys.
4. **Start the development server:**
```bash
npm run dev

```


*The server will start on `http://localhost:5000` (or your configured port) and Sequelize will automatically synchronize your database tables.*

---

## Branching Strategy

* `main` -> Stable production branch (Deployed to Render).
* `feature/backend-mvp` -> Active development branch for the Minimum Viable Product.
* `feature/<feature-name>` -> For any new isolated features (e.g., `feature/course-migrations`).

```

---

And here is the matching **`.env.example`** file to commit alongside it:

```env
PORT=
FRONTEND_URL=
AI_SERVICE_URL=

DB_HOST=
DB_PORT=4000
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
GOOGLE_CLIENT_ID=

```
