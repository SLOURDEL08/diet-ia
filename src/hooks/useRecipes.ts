import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Recipe } from '@/types';  // Importez le type Recipe depuis le fichier de types commun

export const useRecipes = (initialFavorites: string[] = []) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useAuth();

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFavoriteRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      if (favorites.length === 0) {
        setFavoriteRecipes([]);
        return;
      }
      const response = await fetch(`/api/recipes?ids=${favorites.join(',')}`);
      if (response.ok) {
        const data = await response.json();
        setFavoriteRecipes(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, [favorites]);

  const handleFavoriteClick = async (recipeId: string) => {
    if (favorites.includes(recipeId)) {
      await removeFavorite(recipeId);
    } else {
      await addFavorite(recipeId);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    fetchFavoriteRecipes();
  }, [fetchFavoriteRecipes]);

  return {
    recipes,
    favoriteRecipes,
    isLoading,
    handleFavoriteClick,
    favorites
  };
};