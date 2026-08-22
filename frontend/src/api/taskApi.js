const BASE_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
};

// projectId de kar sirf us project ke tasks fetch kar sakte hain
export const fetchTasks = async (projectId) => {
  const url = projectId ? `${BASE_URL}?project=${projectId}` : BASE_URL;
  const response = await fetch(url, { headers: getAuthHeaders() });
  return handleResponse(response);
};

export const addTask = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};