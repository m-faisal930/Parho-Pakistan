import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem('authorization')
  );
  useEffect(() => {
    if (token) localStorage.setItem('authorization', token);
    else localStorage.removeItem('authorization');
  }, [token]);
  const login = async (email, pwd) => {
    const { data } = await api.post('/auth/login', { email, password: pwd });
    console.log(data);
    setToken(data.tokens.token);
  };
  const logout = () => setToken(null);
  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
