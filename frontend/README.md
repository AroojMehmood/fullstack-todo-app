# TaskFlow - Full Stack Todo App

TaskFlow is a full-stack Todo application built with React, Node.js, Express.js, and MongoDB. It includes user authentication, protected Todo routes, and complete Todo management functionality.

## Features

- User Signup
- User Login
- JWT-based Authentication
- Secure Logout
- Protected Todo routes
- Create new Todos
- Edit Todos
- Mark Todos as completed or incomplete
- Delete Todos
- User-specific Todos
- MongoDB database integration
- Loading states
- Error handling
- Responsive user interface
- Modern glassmorphism-inspired design

## Tech Stack

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Project Structure

```text
fullstack-todo-app/
│
├── frontend/
│   ├── styles/
│   │   └── App.css
│   │
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── index.html
│   ├── .gitignore
│   └── README.md
│
└── backend/
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── authController.js
    │   └── todoController.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── models/
    │   ├── User.js
    │   └── Todo.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   └── todoRoutes.js
    │
    ├── .env
    ├── .gitignore
    ├── server.js
    └── package.json
```

## Authentication

TaskFlow uses JWT authentication to protect user accounts and Todo data.

Users first create an account using the Signup page. After registration, they can log in using their email and password.

After successful login, the server provides an authentication token. This token is sent with protected Todo requests.

Only authenticated users can access the Todo functionality.

## Todo Management

After logging in, users can:

1. Add a new Todo.
2. Mark a Todo as completed.
3. Edit an existing Todo.
4. Delete a Todo.
5. View their own Todos.
6. Logout from the application.

Each user's Todos are associated with their account, so users cannot access another user's Todo data.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create a new user account |
| POST | `/api/auth/login` | Login to an existing account |

### Todos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get the logged-in user's Todos |
| POST | `/api/todos` | Create a new Todo |
| PUT | `/api/todos/:id` | Update a Todo |
| DELETE | `/api/todos/:id` | Delete a Todo |

Todo endpoints require a valid JWT token.

## Database

MongoDB is used to permanently store users and Todo data.

Mongoose is used to define database models and communicate with MongoDB.

The backend connects to MongoDB using a connection string stored in an environment variable.

## Environment Variables

The backend uses a `.env` file for sensitive configuration.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

The actual `.env` file should never be uploaded to GitHub.

## Running the Project Locally

### Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables.

Start the backend:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Then open the local URL provided by Vite in the browser.

## Security

- Passwords are hashed before being stored in the database.
- JWT tokens are used for authentication.
- Protected routes require authentication.
- MongoDB credentials and JWT secrets are stored in environment variables.
- `.env` is excluded from Git tracking.

## Future Improvements

Possible future improvements include:

- Todo search and filtering
- Todo categories
- Due dates and reminders
- User profile
- Dark mode
- Deployment
- Improved dashboard and statistics

## Author

**Arooj Mehmood**

BS Computer Science Student

## License

This project was created for learning and development purposes.