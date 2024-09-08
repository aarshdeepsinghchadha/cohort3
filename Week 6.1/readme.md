
# Week 6 Todo Assignment

This project is a **To-Do Application** built using **Node.js** (Express) for the backend and **HTML, Bootstrap, and Axios** for the frontend. The app features JWT-based authentication and allows users to manage their tasks securely.

## Features

### Backend (Node.js with Express)

1. **JWT Authentication**: Provides secure login/logout and protects routes.
2. **User Management**: Handles user sign-up, sign-in, and session validation using **ZOD** for validation.
3. **Task Management API**: Supports CRUD operations (Create, Read, Update, Delete) for managing to-dos.
4. **Express Middleware**: Custom middleware for authorization, error handling, and validation.
5. **Axios**: Facilitates HTTP requests between the frontend and backend.

### Frontend (HTML, Bootstrap, Axios)

1. **Authentication UI**: Includes sign-in and sign-up forms to manage user sessions.
2. **Task List UI**: Allows users to create, view, edit, delete, and mark tasks as done.
3. **Responsive Design**: Built with **Bootstrap**, ensuring a mobile-friendly interface.
4. **Dynamic DOM Manipulation**: Uses JavaScript to update tasks in real-time.
5. **Token Management**: Stores JWT tokens in **localStorage** to manage authentication.

## API Endpoints

### Authentication
- **POST /signup**: Registers a new user.
- **POST /signin**: Authenticates and logs in a user, returning a JWT token.
- **POST /logout**: Logs out the current user.

### Task Management
- **GET /todos**: Fetches all tasks for the logged-in user.
- **POST /todos**: Creates a new task.
- **PUT /todos/:id**: Updates a specific task (e.g., mark as done/undone).
- **DELETE /todos/:id**: Deletes a specific task.

## Frontend Screenshots

### Sign-up and Sign-in Forms
![Sign-up Form](https://prod-files-secure.s3.us-west-2.amazonaws.com/8baf2741-359c-47f4-b184-efd7123c0029/ea2fa18b-3c7d-420e-89e7-169e625a972d/image.png)

### Alerts for ZOD Validation
![Alerts](https://prod-files-secure.s3.us-west-2.amazonaws.com/8baf2741-359c-47f4-b184-efd7123c0029/111faada-4baa-49f2-a5e4-7ff712bc2cd5/image.png)

![ZOD Error Handling](https://prod-files-secure.s3.us-west-2.amazonaws.com/8baf2741-359c-47f4-b184-efd7123c0029/f8356ce3-1c66-4426-97ed-947cc31b2d95/image.png)

### User-specific Task List and JWT Token Storage
![Task List](https://prod-files-secure.s3.us-west-2.amazonaws.com/8baf2741-359c-47f4-b184-efd7123c0029/ed07e34e-ea16-4963-83c8-7152b64b396d/image.png)
![Token in LocalStorage](https://prod-files-secure.s3.us-west-2.amazonaws.com/8baf2741-359c-47f4-b184-efd7123c0029/d8da08ad-4c55-4ebc-9c9b-a51f13b0fe14/image.png)

### Edit, Delete, and Mark Task as Done
![Edit Task](https://prod-files-secure.s3.us-west-2.amazonaws.com/8baf2741-359c-47f4-b184-efd7123c0029/39e7046e-df00-4016-917a-4fb3ef84a05a/image.png)
![Task Completed](https://prod-files-secure.s3.us-west-2.amazonaws.com/8baf2741-359c-47f4-b184-efd7123c0029/cb5bdab1-2209-4205-901c-719fbd1ddcd2/image.png)

## Getting Started

### Prerequisites
- **Node.js** must be installed on your system.
- Install either **npm** or **yarn** as the package manager.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/todo-app.git
   ```

2. Navigate to the project directory:
   ```
   cd todo-app
   ```

3. Install project dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   npm run start
   ```

2. Open `index.html` in your browser to access the frontend.

### Configuration

- **Backend**: Configure JWT secrets and database connections in your `.env` file.
- **Frontend**: Ensure the correct API URLs are configured in your JavaScript for the Axios requests.

## Technologies Used

- **Backend**: Node.js, Express, ZOD (validation), JWT (authentication)
- **Frontend**: HTML, Bootstrap, Axios (HTTP requests)
- **Database**: MongoDB (or other databases can be configured)

---

Created by Aarshdeep Chadha
```

This version includes clean formatting, making it easier to read without too much syntax or styling complexity. You can copy and use this as your `README.md` file.