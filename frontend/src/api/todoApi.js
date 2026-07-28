// Yeh file backend ke saath saari communication handle karti hai.
// Har function fetch() use karta hai aur ek Promise return karta hai.
// Component ke andar hume sirf yeh functions call karne hain — fetch ki details yahin rehti hain.

const BASE_URL = "http://localhost:5000/api/todos";

// Har response ko check karta hai: agar backend ne error status bheja (4xx/5xx),
// to us error ka message nikal kar throw kar deta hai, taake component catch kar sake.
const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
};

// GET: sab todos fetch karo
export const fetchTodos = async () => {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
};

// POST: naya todo add karo
export const addTodo = async (text) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return handleResponse(response);
};

// PUT: todo update karo (text ya completed status)
export const updateTodo = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

// DELETE: todo remove karo
export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
