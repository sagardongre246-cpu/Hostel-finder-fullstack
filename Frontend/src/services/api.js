// API Configuration and Helper Functions
const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'https://hostel-finder-backend-qa15.onrender.com';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers
  });
};

// API Functions
export const api = {
  // Authentication APIs
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      return response;
    },

    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      return response;
    },

    logout: async () => {
      const response = await makeAuthenticatedRequest('/api/auth/logout', {
        method: 'POST'
      });
      localStorage.removeItem('authToken');
      return response;
    }
  },

  // Hostels APIs
  hostels: {
    getAll: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `/api/hostels?${queryParams}` : '/api/hostels';
      return makeAuthenticatedRequest(url);
    },

    getById: async (id) => {
      return makeAuthenticatedRequest(`/api/hostels/${id}`);
    },

    search: async (searchParams) => {
      const response = await fetch(`${API_BASE_URL}/api/hostels/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams)
      });
      return response;
    }
  },

  // Bookings APIs
  bookings: {
    create: async (bookingData) => {
      return makeAuthenticatedRequest('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });
    },

    getMyBookings: async () => {
      return makeAuthenticatedRequest('/api/bookings/my-bookings');
    },

    getById: async (id) => {
      return makeAuthenticatedRequest(`/api/bookings/${id}`);
    },

    cancel: async (id) => {
      return makeAuthenticatedRequest(`/api/bookings/${id}/cancel`, {
        method: 'PUT'
      });
    }
  },

  // Users APIs
  users: {
    getProfile: async () => {
      return makeAuthenticatedRequest('/api/users/profile');
    },

    updateProfile: async (userData) => {
      return makeAuthenticatedRequest('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(userData)
      });
    }
  }
};

// Export individual functions for convenience
export const { auth, hostels, bookings, users } = api;

// Export base URL for direct use
export { API_BASE_URL };