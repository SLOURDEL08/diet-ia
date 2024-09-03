'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface User {
  id: string;
  nom: string;
  email: string;
  password: string;
  prenom?: string;
  avatar?: any;
  birthDate?: string;
  adress?: string;
  sexe?: string;
  phoneNumber?: string;
  dateInscription: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  refreshToken: () => Promise<void>;
  loading: boolean;
  favorites: string[];
  addFavorite: (recipeId: string) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  refreshToken: async () => {},
  loading: true,
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedFavorites = localStorage.getItem('favorites');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = useCallback((token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    setIsAuthenticated(false);
    setUser(null);
    setFavorites([]);
  }, []);

 const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Pas de token trouvé');
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { token: newToken, user } = await response.json();
        localStorage.setItem('token', newToken);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Échec du rafraîchissement du token');
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      logout();
    }
  }, [logout]);

  const addFavorite = useCallback(async (recipeId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/favorites/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (response.ok) {
        setFavorites(prev => {
          const newFavorites = [...prev, recipeId];
          localStorage.setItem('favorites', JSON.stringify(newFavorites));
          return newFavorites;
        });
      } else {
        throw new Error('Erreur lors de l\'ajout du favori');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du favori:', error);
    }
  }, []);

  const removeFavorite = useCallback(async (recipeId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/favorites/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (response.ok) {
        setFavorites(prev => {
          const newFavorites = prev.filter(id => id !== recipeId);
          localStorage.setItem('favorites', JSON.stringify(newFavorites));
          return newFavorites;
        });
      } else {
        throw new Error('Erreur lors de la suppression du favori');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error);
    }
  }, []);

return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout, 
        updateUser, 
        refreshToken, 
        loading,
        favorites,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};