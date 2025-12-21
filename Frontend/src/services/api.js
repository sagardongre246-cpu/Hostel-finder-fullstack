// API Configuration
const API_BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://hostel-finder-backend-gq15.onrender.com";

// Get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Common authenticated request handler
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};

// API object
export const api = {
  // ================= AUTH =================
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    },

    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    },

    logout: async () => {
      const data = await makeAuthenticatedRequest("/api/auth/logout", {
        method: "POST",
      });
      localStorage.removeItem("authToken");
      return data;
    },
  },

  // ================= HOSTELS =================
  hostels: {
    getAll: async (filters = {}) => {
      const query = new URLSearchParams(filters).toString();
      const url = query ? `/api/hostels?${query}` : "/api/hostels";
      return makeAuthenticatedRequest(url);
    },

    getById: async (id) => {
      return makeAuthenticatedRequest(`/api/hostels/${id}`);
    },

    search: async (searchParams) => {
      const response = await fetch(`${API_BASE_URL}/api/hostels/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchParams),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Search failed");
      }

      return data;
    },
  },

  // ================= BOOKINGS =================
  bookings: {
    create: async (bookingData) => {
      return makeAuthenticatedRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
      });
    },

    getMyBookings: async () => {
      return makeAuthenticatedRequest("/api/bookings/my-bookings");
    },

    getById: async (id) => {
      return makeAuthenticatedRequest(`/api/bookings/${id}`);
    },

    cancel: async (id) => {
      return makeAuthenticatedRequest(`/api/bookings/${id}/cancel`, {
        method: "PUT",
      });
    },
  },

  // ================= USERS =================
  users: {
    getProfile: async () => {
      return makeAuthenticatedRequest("/api/users/profile");
    },

    updateProfile: async (userData) => {
      return makeAuthenticatedRequest("/api/users/profile", {
        method: "PUT",
        body: JSON.stringify(userData),
      });
    },
  },
};

// Named exports (clean usage)
export const { auth, hostels, bookings, users } = api;

// Base URL export
export { API_BASE_URL };
