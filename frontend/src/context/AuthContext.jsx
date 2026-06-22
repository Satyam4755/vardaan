import { createContext, useContext, useEffect, useState } from 'react';

import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const checkSession = async () => {
      try {
        const { data } = await apiClient.get('/auth/me');
        if (isActive) {
          setUser(data.user);
        }
      } catch (error) {
        if (isActive) {
          setUser(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      isActive = false;
    };
  }, []);

  const signup = async (formData) => {
    const { data } = await apiClient.post('/auth/signup', formData);
    setUser(data.user);
    return data;
  };

  const login = async (formData) => {
    const { data } = await apiClient.post('/auth/login', formData);
    setUser(data.user);
    return data;
  };

  const googleAuth = async (token) => {
    const { data } = await apiClient.post('/auth/google', { token });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await apiClient.post('/auth/logout');
    setUser(null);
  };

  const refreshUser = async () => {
    const { data } = await apiClient.get('/auth/me');
    setUser(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        googleAuth,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
