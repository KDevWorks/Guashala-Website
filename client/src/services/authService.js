import api from './api';

export const login = async (email, password) => {
  // Mock implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@gaushala.org' && password === 'admin123') {
        resolve({ data: { user: { id: 1, name: 'Admin', email, role: 'admin' }, token: 'mock-jwt-token' } });
      } else if (email === 'user@example.com' && password === 'user123') {
        resolve({ data: { user: { id: 2, name: 'User', email, role: 'user' }, token: 'mock-jwt-token-user' } });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const register = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { id: 3, ...userData, role: 'user' }, token: 'mock-new-token' } });
    }, 1000);
  });
};

export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { message: 'Logged out successfully' } });
    }, 500);
  });
};

export const forgotPassword = async (email) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { message: 'Password reset link sent' } }), 1000);
  });
};

export const resetPassword = async (token, newPassword) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { message: 'Password reset successful' } }), 1000);
  });
};

export const getProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { user: { id: 2, name: 'User', email: 'user@example.com', role: 'user' } } }), 500);
  });
};

export const updateProfile = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { user: { ...userData } } }), 1000);
  });
};
