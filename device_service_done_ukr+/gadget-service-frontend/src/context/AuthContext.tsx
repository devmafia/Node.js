// AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => void
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); 
  }, []);

  const login = (email: string, password: string) => {
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('authToken', response.data.token);
        if (!isAuthenticated) {  // Only set state if it's not already authenticated
          setIsAuthenticated(true);
        }
      })
      .catch(error => console.error('Login failed:', error));
  };
  

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

