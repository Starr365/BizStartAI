# Frontend API Integration Guide

This document outlines how the React frontend connects to the Node.js Backend API Gateway.

## Base Configuration

**Base URL (Development):** `http://localhost:5000`
**Base URL (Production):** Provided by DevOps via `VITE_API_URL=https://bizstartai-backend.onrender.com` environment variable.

### Authentication Header

Most routes require the user to be logged in. When making `fetch` requests to protected routes, you must include the user's JWT token in the headers:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}

```

---

## 1. Authentication Endpoints

### Register a New User

* **Endpoint:** `POST /api/auth/register`
* **Auth Required:** No

**Request Body:**

```json
{
  "name": "Jane Doe",
  "phoneNumber": "08012345678",
  "password": "securepassword123"
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "data": { "id": 1, "name": "Jane Doe" }
}

```

### Login

* **Endpoint:** `POST /api/auth/login`
* **Auth Required:** No

**Request Body:**

```json
{
  "phoneNumber": "08012345678",
  "password": "securepassword123"
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR..." 
}

```

### Google Login

* **Endpoint:** `POST /api/auth/google`
* **Auth Required:** No

**Request Body:**

```json
{
  "credential": "eyJhbGciOiJSUzI1NiIs..." // The Google ID Token from the React Google Login component
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Google login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "data": { "id": 2, "name": "Jane Doe", "email": "jane@example.com" }
}

```

*(Note: Always save the returned `token` to `localStorage`)*

---

## 2. Onboarding Flow Endpoints

### AI Industry Suggestion

Use this route during the `IdeaStage`, `EarlyStage`, and `GrowthStage` screens to get an industry suggestion from the AI.

* **Endpoint:** `POST /api/ai/suggest-industry`
* **Auth Required:** No

**Request Body:**

```json
{
  "text": "Selling organic soap for babies and mothers."
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "industry": "beauty"
}

```

### Save Business Profile

Call this route when the user clicks "Continue" on the final `Industry.jsx` screen to save their progress to the database.

* **Endpoint:** `POST /api/users/business-profile`
* **Auth Required:** Yes

**Request Body:**

```json
{
  "business_name": "Mama T's Glow Shop",
  "business_stage": "early",
  "description": "Selling organic soap",
  "industry": "beauty"
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Profile saved successfully",
  "data": { ... }
}

```

---

## 3. Dashboard Endpoints

### Get Main Dashboard Data

Use this to populate the `Dashboard.jsx` screen. It returns the user's name, their business profile, and their recent AI chats.

* **Endpoint:** `GET /api/users/dashboard`
* **Auth Required:** Yes

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com" },
    "businessProfile": { "business_stage": "early", "industry": "beauty" },
    "recentConversations": []
  }
}

```

### Get AI Course Recommendations

Use this to generate personalized course recommendations for the `Dashboard.jsx` screen.

* **Endpoint:** `POST /api/ai/recommendations`
* **Auth Required:** No (Currently Public)

**Request Body:**

```json
{
  "businessName": "Mama T's",
  "industry": "beauty",
  "stage": "early"
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "title": "Market Entry Strategy",
      "description": "Learn how to find customers for your beauty business.",
      "lessons": 5,
      "duration": 25,
      "level": "Beginner"
    },
    {
      "title": "Scaling Operations",
      "description": "Build a solid growth plan for your early stage idea.",
      "lessons": 4,
      "duration": 20,
      "level": "Beginner"
    }
  ]
}

```

### Get Progress Dashboard Data

Use this to populate the `ProgressDashboard.jsx` screen.

* **Endpoint:** `GET /api/users/progress`
* **Auth Required:** Yes

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "name": "Jane",
    "completedModules": 3,
    "totalModules": 8,
    "progressPercent": 37,
    "summary": [ ... ],
    "courses": [ ... ]
  }
}

```

---

## 4. AI Mentor Chat

### Send a Chat Message

Use this endpoint in `AIMentor.jsx` to communicate with the AI.

* **Endpoint:** `POST /api/ai/chat`
* **Auth Required:** Yes

**Request Body:**

```json
{
  "message": "How do I calculate profit margins for my soap?"
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "reply": "To calculate your profit margin, you need to subtract your total expenses from your total revenue..."
}

```

---

## Standard Error Handling

If an error occurs (e.g., wrong password, missing fields), the API will return an error format that the frontend should catch:

**Response (400 or 500 range):**

```json
{
  "success": false,
  "message": "Invalid phone number or password"
}

```