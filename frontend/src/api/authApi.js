const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
};

export const signupUser = async ({ name, email, password, confirmPassword }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });
  return handleResponse(response);
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};