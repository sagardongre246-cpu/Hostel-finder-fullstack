// Test API Connection
import { API_BASE_URL } from '../services/api';

export const testBackendConnection = async () => {
  try {
    console.log('Testing connection to:', API_BASE_URL);
    
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connection successful:', data);
      return { success: true, data };
    } else {
      console.log('❌ Backend connection failed:', response.status, response.statusText);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error) {
    console.error('❌ Backend connection error:', error);
    return { success: false, error: error.message };
  }
};

// Test function to be called from browser console
window.testBackendConnection = testBackendConnection;