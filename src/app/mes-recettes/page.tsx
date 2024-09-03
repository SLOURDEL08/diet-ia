'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import Image from 'next/image';
import LoadingScreen from '@/components/LoadingScreen';
import { useRouter } from 'next/navigation';
import TagSelector from '@/components/TagSelector';
import { LeftArrowed, RightArrowed } from '../ux/IconApp';

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

const MesRecettes = () => {
  const { user, favorites, isAuthenticated, loading } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);

 

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else {
      fetchFavoriteRecipes();
    }
  }, [isAuthenticated, loading, router]);

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
      } else {
        console.error('Erreur lors de la récupération des recettes favorites');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 50);
      }, 300);
    }
  }, [favorites]);

  const changeSelectedRecipe = (direction: 'left' | 'right'): { newRecipe: Recipe; isWrapping: boolean } | null => {
    if (filteredRecipes.length === 0) return null;
    const currentIndex = filteredRecipes.findIndex(recipe => recipe._id === selectedRecipe?._id);
    let newIndex = direction === 'left' 
      ? (currentIndex - 1 + filteredRecipes.length) % filteredRecipes.length
      : (currentIndex + 1) % filteredRecipes.length;
    return { 
      newRecipe: filteredRecipes[newIndex], 
      isWrapping: (direction === 'right' && newIndex === 0) || (direction === 'left' && newIndex === filteredRecipes.length - 1)
    };
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const result = changeSelectedRecipe(direction);
    if (!result) return;

    const { newRecipe, isWrapping } = result;
    setSelectedRecipe(newRecipe);

    if (carouselRef.current) {
      if (isWrapping) {
        carouselRef.current.scrollTo({
          left: direction === 'right' ? 0 : carouselRef.current.scrollWidth - carouselRef.current.clientWidth,
          behavior: 'smooth'
        });
      } else {
        const recipeWidth = 288;
        const newScrollPosition = direction === 'left'
          ? carouselRef.current.scrollLeft - recipeWidth
          : carouselRef.current.scrollLeft + recipeWidth;
        
        carouselRef.current.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    if (carouselRef.current) {
      const recipeElement = carouselRef.current.querySelector(`[data-recipe-id="${recipe._id}"]`) as HTMLElement;
      if (recipeElement) {
        const scrollLeft = recipeElement.offsetLeft - carouselRef.current.offsetWidth / 2 + recipeElement.offsetWidth / 2;
        carouselRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleTagsChange = (newTags: string[]) => {
    setSelectedTags(newTags);
  };

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      const filtered = selectedTags.length > 0
        ? favoriteRecipes.filter(recipe => recipe.tags.some(tag => selectedTags.includes(tag)))
        : favoriteRecipes;
      setFilteredRecipes(filtered);
      if (filtered.length > 0 && (!selectedRecipe || !filtered.some(r => r._id === selectedRecipe._id))) {
        setSelectedRecipe(filtered[0]);
      }
    }
  }, [favoriteRecipes, selectedTags, selectedRecipe]);

  const SelectedRecipeSkeleton = () => (
    <div className="bg-gray-100 p-8 shadow-sm rounded-3xl overflow-hidden border border-gray-200/50 animate-pulse">
      <div className="flex gap-10">
        <div className="w-[30%] max-h bg-gray-300 rounded-3xl"></div>
        <div className="w-[70%] space-y-8">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
          <div className="flex gap-6">
            <div className="h-7 w-32 bg-gray-300 rounded"></div>
            <div className="h-7 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="h-8 w-24 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const FavoriteRecipeSkeleton = () => (
    <div className="flex-none w-72 rounded-3xl border border-gray-200 bg-white p-4 flex flex-col items-center gap-2 animate-pulse">
      <div className="w-full h-[120px] bg-gray-300 rounded-xl"></div>
      <div className="w-full flex flex-col gap-2 items-center">
        <div className="flex gap-4 w-full justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="flex gap-4 w-full justify-start items-center">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return       <LoadingScreen />
;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout className="">
      <div className="w-full">
       <div className='flex justify-between items-start mb-8'>
          <h2 className='fontSyneBold text-3xl leading-none'>Mes recettes favorites..</h2>
              <TagSelector
              tags={['Poulet', 'Poisson', 'Vegan', 'Burger', 'Brasserie', 'Pizza']}
              selectedTags={selectedTags}
              onTagsChange={handleTagsChange}
            />
        </div>
       
        <div className="space-y-8">
            
          {isLoading ? (
            <SelectedRecipeSkeleton />
          ) : (
            selectedRecipe && (
              <div className="bg-gray-10  p-8 rounded-3xl overflow-hidden z-10  shadow-perso">
                <div className="flex gap-10">
                  <div className="w-[30%] relative flex">
                    <div className=" ">
                      <Image
                        src={selectedRecipe.image}
                        alt={selectedRecipe.title}
                        layout="fill"
                        objectFit="cover"
                        className='rounded-2xl'
                      />
                    </div>
                    <div className="absolute flex items-center top-4 left-4 bg-white/40 shadow backdrop-blur-sm px-2 gap-1 py-1 rounded-full ">
                      <Image
                        src="/star.png"
                        alt={selectedRecipe.title}
                        className='rounded-2xl'
                        width={18}
                      
                        height={18}
                      />
                      <span className="text-sm font-semibold text-[#fff]">{selectedRecipe.rating}</span>
                    </div>
                  </div>
                  <div className="w-[70%] space-y-8">
                    <div className="flex justify-between items-start ">
                      <div className='space-y-3'>
                        <h2 className="text-2xl  font-medium text-gray-900">{selectedRecipe.title}</h2>
                        <div className="flex flex-wrap gap-4">
                          {selectedRecipe.tags.map((tag, index) => (
                            <span key={index} className="bg-[#ff5e5b] hover:border-[#ff5e5b] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="z-10 transform hover:bg-[#ff5e5b] group p-1.5 px-4 bg-white group rounded-full transition duration-300"
                          onClick={() => scrollCarousel('left')}
                        >
                          <LeftArrowed/>
                        </button>
                        <button
                          className="z-10 transform hover:bg-[#ff5e5b] group p-1.5 px-4 bg-white group rounded-full transition duration-300"
                          onClick={() => scrollCarousel('right')}
                        >
                          <RightArrowed/>
                        </button>
                      </div>
                    </div>
                  
                    <p className="text-gray-500 fontSyneRegular mb-6">{selectedRecipe.description}</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-2 mr-2">
                          <Image src="/clock.png" alt="Préparation" width={24} height={24} />
                        </div>
                        <div>
                          <span className="block text-sm text-gray-500">Temps de préparation</span>
                          <span className="font-semibold">{selectedRecipe.preparationTime} min</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-2 mr-2">
                          <Image src="/speedometer.png" alt="Difficulté" width={24} height={24} />
                        </div>
                        <div>
                          <span className="block text-sm text-gray-500">Niveau de difficulté</span>
                          <span className="font-semibold">{selectedRecipe.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul className="flex flex-wrap items-center gap-6">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex bg-gray-100  rounded-full w-fit py-1.5 px-3 items-center">
                            <span className="w-1.5 h-1.5 bg-[#ff5e5b] rounded-full mr-2"></span>
                            <span className="text-gray-700">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="relative ">
          <div className="absolute inset-0 top-8 overcarou z-40"></div>

        <div
          ref={carouselRef}
          className='carousel-recipe  flex flex-nowrap z-10 pl-10 -ml-10 gap-8 py-8 -my-8 overflow-x-auto'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading ? (
            // Skeletons
            Array(5).fill(null).map((_, index) => (
              <FavoriteRecipeSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            // Recipes
            filteredRecipes.map((recipe) => (
                <div
                  key={recipe._id}
                  data-recipe-id={recipe._id}
                  className={`flex-none w-72 rounded-3xl hover:z-50 hover:bg-[#ff5e5b] group hover:shadow-md shadow-perso border-gray-200 transition group bg-white p-4 flex flex-col group items-center gap-2 transition-colors cursor-pointer ${selectedRecipe && selectedRecipe._id === recipe._id ? 'activerecipe' : ''}`}
                  onClick={() => handleRecipeClick(recipe)}
                >
    <div className="relative w-full h-[120px] overflow-hidden rounded-xl">
      <Image
        src={recipe.image}
        alt={recipe.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
     
    </div>
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="flex gap-4 w-full justify-between items-center">
        <span className={`fontSyneRegular group-hover:text-white ellipsis text-base ${selectedRecipe && selectedRecipe._id === recipe._id ? 'text-white' : ''}`}>{recipe.title}</span>
        <div className="flex gap-1 items-center">
          <Image src="/star.png" alt="rating" width={20} height={20} />
          <span className={`font-semibold group-hover:text-white text-sm ${selectedRecipe && selectedRecipe._id === recipe._id ? 'text-white' : ''}`}>{recipe.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex gap-4 w-full justify-start items-center">
        <div className="flex justify-start items-center gap-2">
          <div className={`relative detailblock h-6 group-hover:bg-white rounded-full w-6 ctn-icon-recipe ${selectedRecipe && selectedRecipe._id === recipe._id ? 'bg-white/30' : 'bg-gray-400/15'} flex gap-1 items-center`}>
            <Image
              src="/clock.png"
              alt="clock"
              className="p-1"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className={`text-xs group-hover:text-white ${selectedRecipe && selectedRecipe._id === recipe._id ? 'text-white' : ''}`}>≈ {recipe.preparationTime} minutes</span>
        </div>
        <div className="flex justify-start items-center gap-2">
          <div className={`relative detailblock group-hover:bg-white h-6 rounded-full w-6 ${selectedRecipe && selectedRecipe._id === recipe._id ? 'bg-white/30' : 'bg-gray-400/15'} ctn-icon-recipe flex gap-1 items-center`}>
            <Image
              src="/speedometer.png"
              alt="difficulty"
              className="p-1"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className={`text-xs group-hover:text-white ${selectedRecipe && selectedRecipe._id === recipe._id ? 'text-white' : ''}`}>{recipe.difficulty}</span>
        </div>
      </div>
    </div>
  </div>
)))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MesRecettes;