# BizStart AI – Backend API

## Overview

The BizStart AI backend is a RESTful API built with:

* **Node.js**
* **Express.js**
* **Sequelize ORM (MySQL)**
* **JWT Authentication**
* **Joi Validation**
* **Rate Limiting**
* **Centralized Error Handling**
* **AI Service Abstraction Layer**

This backend handles:

* User authentication
* Conversation management
* Message handling
* AI response integration (via service abstraction)
* Secure, validated API access

---

# Backend Architecture

The backend follows a layered architecture:

```
Client (Frontend)
        ↓
Routes
        ↓
Middleware (Auth, Validation, Rate Limit)
        ↓
Controllers
        ↓
Services (AI abstraction)
        ↓
Models (Sequelize ORM)
        ↓
Database (MySQL)
```

### Architectural Principles

* Separation of concerns
* Centralized error handling
* Input validation before controller execution
* Authentication middleware for protected routes
* AI logic isolated in service layer
* Rate limiting applied to expensive endpoints

---

# Project Structure

```
bizstart-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── conversation.controller.js
│   │   └── message.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── validate.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── conversation.model.js
│   │   └── message.model.js
│   ├── services/
│   │   └── ai.service.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── conversation.validator.js
│   │   └── message.validator.js
│   ├── utils/
│   │   └── AppError.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

# API Base URL

```
http://localhost:5000/api
```

---

# Authentication

Authentication uses:

* JWT tokens
* Bearer authentication
* Password hashing with bcrypt

All protected routes require:

```
Authorization: Bearer <token>
```

---

# API Endpoints

## Auth Routes

### Register User

```
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

---

### Login User

```
POST /api/auth/login
```

Request Body:

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

## Conversation Routes (Protected)

### Create Conversation

```
POST /api/conversations
```

Request Body:

```json
{
  "title": "Business Idea Discussion"
}
```

---

### Get All User Conversations

```
GET /api/conversations
```

Returns all conversations belonging to authenticated user.

---

### Get Single Conversation

```
GET /api/conversations/:id
```

---

## Message Routes (Protected)

### Send Message (Triggers AI)

```
POST /api/messages
```

Request Body:

```json
{
  "conversation_id": 1,
  "content": "How do I start a small bakery business?"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "userMessage": { ... },
    "aiMessage": { ... }
  }
}
```

Note:

* This endpoint is rate limited.
* AI response is handled through `ai.service.js`.

---

### Get Messages by Conversation (Paginated)

```
GET /api/messages/:conversationId?page=1&limit=10
```

Query Parameters:

* page (default: 1)
* limit (default: 10)

---

# AI Service Integration

The backend does not directly embed AI logic in controllers.

Instead:

```
controllers → ai.service.js → external AI API
```

Current implementation is abstracted to allow:

* Hugging Face integration
* Custom ML API
* Microservice-based AI system

Expected AI response format:

```json
{
  "text": "Generated AI response",
  "tokens_used": 120
}
```

---

# Database

Database: MySQL
ORM: Sequelize

Models:

* User
* Conversation
* Message

Relationships:

* User has many Conversations
* Conversation has many Messages
* Message belongs to Conversation
* Conversation belongs to User

Tables are created using:

```
sequelize.sync()
```

---

# Middleware

### Authentication Middleware

Verifies JWT and attaches `req.user`.

### Validation Middleware

Validates request body using Joi schemas.

### Error Middleware

Centralized error formatting using `AppError`.

### Rate Limiting

* Global limiter on `/api`
* Strict limiter on `/api/messages`

---

# Environment Variables

Create `.env` file:

```
PORT=5000
DB_NAME=bizstart_ai
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=supersecretkey
FRONTEND_URL=http://localhost:5173
AI_SERVICE_URL=
HF_API_KEY=
```

---

# Setup Instructions

1. Clone repository:

```
git clone <repo-url>
```

2. Install dependencies:

```
npm install
```

3. Configure `.env`

4. Start server:

```
npm run dev
```

---

# Production Readiness Features

* Structured architecture
* Secure password hashing
* JWT authentication
* Input validation
* Rate limiting
* Centralized error handling
* Service abstraction layer for AI
* Pagination support

---

# Branch Strategy

* main → stable production branch
* feature/backend-mvp → initial full backend implementation
* future features → feature/<feature-name>

---

# Future Improvements

* Convert to Sequelize migrations
* Add Redis for distributed rate limiting
* Add logging system (Winston / Morgan)
* Add Docker support
* Add Swagger/OpenAPI documentation
* Deploy to cloud (Render, Railway, AWS)

