import React, { useEffect, useRef, useState } from 'react';
import RecipeCard from '@/components/shared/RecipeCard/RecipeCard';
import RecipeCardSkeleton from '@/components/shared/RecipeCard/skeleton/carousel/skeleton';
import Image from 'next/image';

interface Recipe {
  _id: string;
  title: string;
  image: string;
  rating: number;
  preparationTime: number;
  difficulty: string;
  tags: string[];
}

interface RecipeCarouselDashboardProps {
  recipes: Recipe[];
  loading: boolean;
  favorites: string[];
  onFavoriteClick: (id: string) => void;
}

const ITEM_WIDTH = 288; // Largeur d'une carte
const GAP_WIDTH = 32; // Taille du gap
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + GAP_WIDTH;

const RecipeCarouselDashboard: React.FC<RecipeCarouselDashboardProps> = ({
  recipes,
  loading,
  favorites,
  onFavoriteClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex(prev => {
        const newIndex = prev - 1;
        return newIndex < 0 ? recipes.length - 1 : newIndex;
      });
    } else {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        return newIndex >= recipes.length ? 0 : newIndex;
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = currentIndex * TOTAL_ITEM_WIDTH;
    }
  }, [currentIndex]);

  const renderContent = () => {
    if (loading) {
      return Array(5).fill(null).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ));
    }

    return recipes.map((recipe, index) => (
      <div key={recipe._id} className="min-w-72">
        <RecipeCard
          recipe={recipe}
          onFavoriteClick={onFavoriteClick}
          isFavorite={favorites.includes(recipe._id)}
          showFavoriteButton={true}
          showViewButton={true}
          showCircle={true}
        />
      </div>
    ));
  };

  return (
    <div className="relative">
       <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold">
              Une sélection de plats pour atteindre vos objectifs
            </h2>
            <div className="flex gap-4">
        <button
          onClick={() => handleNavigation('left')}
          className="p-2 px-4 rounded-xl bg-gray-100 hover:bg-[#ff5e5b] hover:text-white group transition-colors"
          aria-label="Previous slide"
        >
          <Image alt='' width={20} height={20} src="/left-row.png" className='brightness-0 group-hover:opacity-100 group-hover:brightness-[99999] opacity-40 '/>
        </button>
        <button
          onClick={() => handleNavigation('right')}
          className="p-2 px-4 rounded-xl bg-gray-100 hover:bg-[#ff5e5b] group hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <Image alt='' width={20} height={20} src="/right-row.png" className='brightness-0 group-hover:opacity-100 group-hover:brightness-[99999] opacity-40'/>
        </button>
      </div>
          </div>
      <div 
        ref={carouselRef}
        className="flex gap-8 pt-8 overflow-x-hidden -mx-16 px-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {renderContent()}
      </div>
      
   
    </div>
  );
};

export default RecipeCarouselDashboard;