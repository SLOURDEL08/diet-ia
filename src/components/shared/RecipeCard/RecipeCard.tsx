import React from 'react';
import Image from 'next/image';
import { Clock, Activity } from 'lucide-react';

interface RecipeCardProps {
  recipe: {
    _id: string;
    title: string;
    image: string;
    rating: number;
    preparationTime: number;
    difficulty: string;
  };
  onFavoriteClick?: (id: string) => void;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
  showViewButton?: boolean;
  showCircle?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onFavoriteClick,
  isFavorite = false,
  showFavoriteButton = true,
  showViewButton = true,
  showCircle = true
}) => {
  return (
    <div
      className="
        rounded-3xl transition-all duration-300 
        min-w-72 p-4 flex flex-col gap-3
        bg-white border border-gray-200
        hover:shadow-md group
      "
    >
      {/* Image Container */}
      <div className="relative w-full h-[120px] overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={recipe.image}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {showViewButton && (
            <button 
              className="p-2 rounded-xl backdrop-blur-sm hover:bg-white/90 transition-all bg-white/70 shadow-sm hover:shadow"
            >
              <Image
                src="/strong.png"
                alt="view"
                width={18}
                height={18}
                className="opacity-70"
              />
            </button>
          )}
          {showFavoriteButton && onFavoriteClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick(recipe._id);
              }}
              className="p-2 rounded-xl backdrop-blur-sm hover:bg-white/90 transition-all bg-white/70 shadow-sm hover:shadow"
            >
              <Image
                src={isFavorite ? '/fav-check.png' : '/fav.png'}
                alt="favorite"
                width={18}
                height={18}
                className={!isFavorite ? 'opacity-70' : ''}
              />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <h3 className="fontSyneRegular text-base font-medium truncate max-w-[180px]">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
            <Image src="/star.png" alt="rating" width={16} height={16} />
            <span className="font-semibold text-sm">{recipe.rating}</span>
          </div>
        </div>

        {/* Info Row */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center h-7 w-7 rounded-full ${showCircle ? 'bg-gray-100' : ''}`}>
              <Clock className="w-4 h-4 text-[#ff5e5b]" />
            </div>
            <span className="text-xs text-gray-600">
              ≈ {recipe.preparationTime} min
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center h-7 w-7 rounded-full ${showCircle ? 'bg-gray-100' : ''}`}>
              <Activity className="w-4 h-4 text-[#ff5e5b]" />
            </div>
            <span className="text-xs text-gray-600">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;