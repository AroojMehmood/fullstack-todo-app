# Full Stack Todo App

A simple full-stack Todo application built with **React (Vite)** on the frontend and **Node.js + Express** on the backend. Data is stored in-memory (no database required).

## Folder Structure

```
todo-app/
├── backend/
│   ├── controllers/
│   │   └── todoController.js
│   ├── data/
│   │   └── todos.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── todoApi.js
    │   ├── components/
    │   │   ├── TodoForm.jsx
    │   │   ├── TodoItem.jsx
    │   │   ├── TodoList.jsx
    │   │   ├── Loader.jsx
    │   │   └── ErrorMessage.jsx
    │   ├── styles/
    │   │   └── App.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## How to Run

### 1. Backend (runs on http://localhost:5000)

```bash
cd backend
npm install
npm start
```

You should see: `✅ Server running on http://localhost:5000`

### 2. Frontend (runs on http://localhost:5173)

Open a **new terminal window/tab**, keep the backend running:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

> **Important:** Both servers must run at the same time — backend on port 5000, frontend on port 5173.

## API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|-----------------------|
| GET    | /api/todos        | Get all todos         |
| POST   | /api/todos        | Create a new todo     |
| PUT    | /api/todos/:id     | Update a todo (text and/or completed) |
| DELETE | /api/todos/:id     | Delete a todo         |

## Notes

- Data resets whenever the backend server restarts, since it's stored in a JavaScript array in memory (not a database).
- CORS is enabled on the backend so the frontend (port 5173) can talk to it (port 5000).
