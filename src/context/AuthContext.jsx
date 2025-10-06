import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { authLocalService } from '../services/authLocal';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario logueado al cargar la aplicación
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Intentar con el servicio API primero
      const response = await authService.login(email, password);
      const { token, user: userData } = response;
      
      // Guardar token y datos del usuario
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('API Login error, trying local service:', error);
      
      // Fallback al servicio local
      try {
        const response = await authLocalService.login(email, password);
        const { token, user: userData } = response;
        
        // Guardar token y datos del usuario
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        
        return { success: true, user: userData };
      } catch (localError) {
        console.error('Local Login error:', localError);
        return { 
          success: false, 
          error: localError.message || 'Error al iniciar sesión' 
        };
      }
    }
  };

  const register = async (email, password, name) => {
    try {
      // Intentar con el servicio API primero
      const response = await authService.register(email, password, name);
      const { user: userData } = response;
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('API Register error, trying local service:', error);
      
      // Fallback al servicio local
      try {
        const response = await authLocalService.register(email, password, name);
        const { user: userData } = response;
        
        return { success: true, user: userData };
      } catch (localError) {
        console.error('Local Register error:', localError);
        return { 
          success: false, 
          error: localError.message || 'Error al registrarse' 
        };
      }
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const isOrganizer = () => {
    return hasRole('Organizer') || hasRole('Admin');
  };

  const isAdmin = () => {
    return hasRole('Admin');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    isOrganizer,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
