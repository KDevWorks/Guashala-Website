import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('gaushala_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('gaushala_user');
          localStorage.removeItem('gaushala_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await authService.login(email, password);
      setUser(data.user);
      localStorage.setItem('gaushala_user', JSON.stringify(data.user));
      localStorage.setItem('gaushala_token', data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await authService.register(userData);
      setUser(data.user);
      localStorage.setItem('gaushala_user', JSON.stringify(data.user));
      localStorage.setItem('gaushala_token', data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('gaushala_user');
    localStorage.removeItem('gaushala_token');
  };

  const updateProfile = async (userData) => {
    try {
      const { data } = await authService.updateProfile(userData);
      setUser(data.user);
      localStorage.setItem('gaushala_user', JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Update failed' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
