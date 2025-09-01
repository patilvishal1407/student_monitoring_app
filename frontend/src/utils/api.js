const API_BASE_URL = "http://localhost:3005"; // backend port

// helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`, // 👈 add token
      },
    });
    if (!response.ok) throw new Error(`GET ${endpoint} failed`);
    return await response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`, // 👈 add token
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed`);
    return await response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`, // 👈 add token
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`PUT ${endpoint} failed`);
    return await response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // 👈 add token
      },
    });
    if (!response.ok) throw new Error(`DELETE ${endpoint} failed`);
    return await response.json();
  },
};

export default api;
