import React, { useEffect, useRef, useState } from 'react';
import RecipeCard from '@/components/shared/RecipeCard/RecipeCard';
import { SelectedRecipeCardSkeleton } from '../RecipeCard/skeleton/selectedRecipe/skeleton';
import RecipeCardSkeleton from '../RecipeCard/skeleton/carousel/skeleton';

interface Recipe {
  _id: string;
  title: string;
  image: string;
  rating: number;
  preparationTime: number;
  difficulty: string;
  tags: string[];
  description: string;
  ingredients: string[];
}

interface RecipeCarouselMesRecettesProps {
  recipes: Recipe[];
  loading: boolean;
  favorites: string[];
  onFavoriteClick: (id: string) => void;
  onRecipeSelect: (recipe: Recipe) => void;
  selectedRecipe: Recipe | null;
}

const RecipeCarouselMesRecettes: React.FC<RecipeCarouselMesRecettesProps> = ({
  recipes,
  loading,
  favorites,
  onFavoriteClick,
  onRecipeSelect,
  selectedRecipe,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedRecipe) {
      const index = recipes.findIndex(recipe => recipe._id === selectedRecipe._id);
      setCurrentIndex(index);
    }
  }, [selectedRecipe, recipes]);

  const handleNavigation = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex(prev => {
        const newIndex = prev - 1;
        const validIndex = newIndex < 0 ? recipes.length - 1 : newIndex;
        onRecipeSelect(recipes[validIndex]);
        return validIndex;
      });
    } else {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        const validIndex = newIndex >= recipes.length ? 0 : newIndex;
        onRecipeSelect(recipes[validIndex]);
        return validIndex;
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = currentIndex * (288 + 32); // width + gap
    }
  }, [currentIndex]);

  const renderContent = () => {
    if (loading) {
      return Array(5).fill(null).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ));
    }

    return recipes.map((recipe, index) => (
      <div
        key={recipe._id}
        className="min-w-72 transition-all duration-300 cursor-pointer"
        onClick={() => {
          setCurrentIndex(index);
          onRecipeSelect(recipe);
        }}
      >
        <RecipeCard
          recipe={recipe}
          isActive={index === currentIndex}
          onFavoriteClick={onFavoriteClick}
          isFavorite={favorites.includes(recipe._id)}
          showFavoriteButton={false}
          showViewButton={false}
          showCircle={false}
        />
      </div>
    ));
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="sticky top-4 z-10 flex justify-end mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleNavigation('left')}
            className="p-2 px-4 rounded-xl bg-gray-100 hover:bg-[#ff5e5b] hover:text-white transition-colors"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => handleNavigation('right')}
            className="p-2 px-4 rounded-xl bg-gray-100 hover:bg-[#ff5e5b] hover:text-white transition-colors"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div 
        ref={carouselRef}
        className="flex gap-8 py-8 overflow-x-hidden scroll-smooth"
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default RecipeCarouselMesRecettes;