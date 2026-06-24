import { createContext, useContext, useEffect, useState } from 'react';

import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const checkSession = async (retries = 5, delay = 3000) => {
      try {
        const { data } = await apiClient.get('/auth/me');
        if (isActive) {
          setUser(data.user);
          setLoading(false);
          console.log('[Auth] Session restored successfully.');
        }
      } catch (error) {
        const isNetworkOrServerError = !error.response || error.response.status >= 500;
        
        if (isNetworkOrServerError && retries > 0 && isActive) {
          console.log(`[Auth] Backend cold start or network error. Retrying in ${delay}ms... (${retries} attempts left)`);
          setTimeout(() => checkSession(retries - 1, delay), delay);
        } else if (isActive) {
          console.log(`[Auth] Session check failed definitively. Treating as unauthenticated.`, error.response?.status || 'Network error');
          setUser(null);
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
