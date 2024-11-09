# Task Manager API

This is a RESTful API for managing tasks, allowing users to register, log in, and manage tasks. It is built with **Express.js** and uses **MongoDB** as the database. The API includes user authentication via **JWT tokens** and cookie-based sessions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Task Endpoints](#task-endpoints)
- [Environment Variables](#environment-variables)
- [Technologies](#technologies)
- [License](#license)

## Features

- User registration and login with JWT authentication.
- Task creation, updating, deletion, and fetching.
- Secure endpoints with authentication middleware.
- Persistent session management via cookies.

## Installation

Follow these steps to set up the API locally:

1. **Clone the repository**:

git clone https://github.com/yourusername/task-manager-api.git
cd task-manager-api
Install dependencies:

npm install
Set up environment variables:

Copy the .env.example file to a new .env file and update the necessary values.

Example .env:

PORT=3000
JWT_SECRET=your-secret-key
MONGO_URI=your-mongo-db-uri

Run the API:

npm start
The server should now be running at http://localhost:3000.

**API Endpoints**

# User Endpoints

1.POST /api/auth/register
 -Register a new user.
Body:
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}

2.POST /api/auth/login
 -Log in an existing user.
Body:
{
  "email": "user@example.com",
  "password": "password123"
}

3.POST /api/auth/logout
 -Log out the user by clearing the session token.

# Task Endpoints

1.GET /api/tasks
 -Get a list of tasks for the authenticated user.

1.POST /api/tasks
 -Create a new task.
Body:
{
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2024-12-31"
}

2.PATCH /api/tasks/:id
-Update a task by ID.
Body (optional fields):
{
  "title": "Updated Title",
  "dueDate": "2024-12-25",
  "complete": true
}

3.DELETE /api/tasks/:id
 -Delete a task by ID.

# Environment Variables
The following environment variables need to be set up:

PORT: The port on which the API will run (default is 3000).
JWT_SECRET: The secret key used to sign the JWT token.
MONGO_URI: The URI to connect to your MongoDB database.

# Technologies
Node.js (v16+)
Express.js
MongoDB
JWT for authentication
Cookie-Parser for handling cookies
Zod for input validation
bcryptjs for password hashing