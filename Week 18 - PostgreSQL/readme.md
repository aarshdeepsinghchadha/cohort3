# TODO App - Plan Your Day

Welcome to the **TODO App**! This application allows you to plan your day by creating a personal to-do list. It is designed for users to sign up, sign in, and manage their tasks. You can create, edit, and delete tasks, but each user will only be able to manage their own to-do list.

## Tech Stack

- **Backend**: Node.js with PostgreSQL using Neon tech
- **Frontend**: React with TypeScript and Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)

## Features

- **Sign Up & Sign In**: Users can sign up and log in to their account.
- **Create, Edit, Delete Todo**: Users can manage their own to-do tasks.
- **Security**: Each user can only edit or delete their own tasks. You cannot manipulate another user's to-do list.
- **Responsive Design**: Tailwind CSS ensures the app is responsive and mobile-friendly.

## Installation Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-directory>
```

### 2. Backend Setup

1. Navigate to the **backend** folder.

```bash
cd backend
```

2. Install dependencies.

```bash
npm install
```

3. Create a `.env` file in the root of the **backend** folder and add the following environment variables:

```env
# Database Connection
PG_CONNECTION="your_postgresql_database_connection_url"

# JWT Secret Key
JWT_SECRET="your_secret_key"

# Server Port
PORT=3000
```

4. Run the backend server.

```bash
npm run dev
```

### 3. Frontend Setup

1. Navigate to the **frontend** folder.

```bash
cd frontend
```

2. Install dependencies.

```bash
npm install
```

3. Run the frontend server.

```bash
npm run dev
```

### 4. Database Setup

The database consists of two tables:

#### **Users Table**

| Column         | Type      | Description                             |
| -------------- | --------- | --------------------------------------- |
| `id`           | SERIAL    | Primary key (auto-incremented)          |
| `username`     | VARCHAR   | User's unique username                  |
| `email`        | VARCHAR   | User's email                            |
| `password`     | VARCHAR   | User's hashed password                  |
| `created_date` | TIMESTAMP | Date and time when the user was created |

#### **Todos Table**

| Column         | Type      | Description                             |
| -------------- | --------- | --------------------------------------- |
| `id`           | SERIAL    | Primary key (auto-incremented)          |
| `title`        | VARCHAR   | Title of the to-do item                 |
| `description`  | TEXT      | Description of the to-do item           |
| `done`         | BOOLEAN   | Status of the task (completed or not)   |
| `created_date` | TIMESTAMP | Date and time when the task was created |
| `user_id`      | INTEGER   | Foreign key, references `users(id)`     |

### 5. Relationships

- A **user** can have many **todos**.
- A **todo** belongs to one **user**.

### 6. Example Database Query (for creating tables) -- you can customize this and add constraints modifications on update and delete of the toods

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Todos table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  done BOOLEAN DEFAULT FALSE,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

## JWT Authentication

- When a user signs in, a **JWT token** is generated and sent to the client.
- The token is stored in **localStorage** or **sessionStorage** and is used to authenticate requests to protected endpoints.

## Recorded Video Link

As this is a fun project and won't be deployed, you can watch the recorded demo here:  
[Recorded Video Link](https://x.com/home)

## Future Improvements

- **Deployment**: In the future, the app will be deployed on a hosting platform.
- **User Roles**: Implement user roles for admins and regular users.
- **Task Prioritization**: Add features to prioritize tasks and set deadlines.

---

This README outlines the setup and features of your TODO app in a clear, organized way. It also provides installation instructions, database schema, and future improvement ideas. Let me know if you'd like any additional adjustments!
