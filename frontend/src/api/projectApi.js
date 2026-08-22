const BASE_URL = `${import.meta.env.VITE_API_URL}/api/projects`;

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

export const fetchProjects = async () => {
  const response = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const addProject = async ({ title, description, status }) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description, status }),
  });
  return handleResponse(response);
};

export const updateProject = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

export const deleteProject = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};