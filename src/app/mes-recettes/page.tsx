'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import Image from 'next/image';
import LoadingScreen from '@/components/LoadingScreen';
import { useRouter } from 'next/navigation';
import TagSelector from '@/components/TagSelector';
import RecipeCarouselMesRecettes from '@/components/shared/RecipeCaoursel/RecipeCarouselMesRecettes';
import { SelectedRecipeCardSkeleton } from '@/components/shared/RecipeCard/skeleton/selectedRecipe/skeleton';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  preparationTime: number;
  difficulty: string;
  rating: number;
  image: string;
  tags: string[];
  ingredients: string[];
}

const MesRecettes: React.FC = () => {
  const { user, favorites, isAuthenticated, loading } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

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
        setSelectedRecipe(data[0]);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [favorites]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else {
      fetchFavoriteRecipes();
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      const filtered = selectedTags.length === 0
        ? favoriteRecipes
        : favoriteRecipes.filter((recipe) =>
            selectedTags.every((tag) => recipe.tags.includes(tag))
          );
      setFilteredRecipes(filtered);
      setSelectedRecipe(filtered[0] || null);
    }
  }, [favoriteRecipes, selectedTags]);

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return null;

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Mes recettes favorites
          </h1>
          <TagSelector
            tags={['Poulet', 'Poisson', 'Vegan', 'Burger', 'Brasserie', 'Pizza']}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        </div>

        {/* Selected Recipe Section */}
        {isLoading ? (
          <SelectedRecipeCardSkeleton />
        ) : selectedRecipe ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex gap-8">
              {/* Image Section */}
              <div className="w-1/3 relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-4 left-4 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full gap-2">
                  <Image src="/star.png" alt="rating" width={16} height={16} />
                  <span className="font-semibold text-sm">{selectedRecipe.rating}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-3">{selectedRecipe.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipe.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {selectedRecipe.description}
                </p>

                <div className="flex gap-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <Image src="/clock.png" alt="Temps" width={24} height={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Temps de préparation</p>
                      <p className="font-semibold">{selectedRecipe.preparationTime} min</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <Image src="/speedometer.png" alt="Difficulté" width={24} height={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Niveau de difficulté</p>
                      <p className="font-semibold">{selectedRecipe.difficulty}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Ingrédients</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-[#ff5e5b] rounded-full"></span>
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Carousel Section */}
        <div className="bg-white rounded-2xl shadow-sm">
          <RecipeCarouselMesRecettes
            recipes={filteredRecipes}
            loading={isLoading}
            favorites={favorites}
            onFavoriteClick={() => {}}
            onRecipeSelect={setSelectedRecipe}
            selectedRecipe={selectedRecipe}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MesRecettes;