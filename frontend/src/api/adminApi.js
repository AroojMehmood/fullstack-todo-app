const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin`;

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

export const fetchAdminOverview = async () => {
  const response = await fetch(`${BASE_URL}/overview`, { headers: getAuthHeaders() });
  return handleResponse(response);
};