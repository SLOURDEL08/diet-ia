'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Image from 'next/image';
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
}

const Dashboard: React.FC = () => {
  const { isAuthenticated, loading, user, favorites, addFavorite, removeFavorite } = useAuth();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else {
      fetchRecipes();
    }
  }, [isAuthenticated, loading, router]);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
        // Introduire un délai avant de montrer le contenu
        setTimeout(() => {
          setIsLoading(false);
          setRecipesLoading(false);
          setTimeout(() => setShowContent(true), 50); // Petit délai pour assurer que l'opacité 0 est appliquée
        }, 300); // Délai pour une transition en douceur
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
      setIsLoading(false);
      setRecipesLoading(false);
    }
  };

  const handleTagClick = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleFavoriteClick = async (recipeId: string) => {
    if (favorites.includes(recipeId)) {
      await removeFavorite(recipeId);
    } else {
      await addFavorite(recipeId);
    }
  };

  const handleButtonMouseEnter = (direction: string) => {
    setHoveredButton(direction);
  };

  const handleButtonMouseLeave = () => {
    setHoveredButton(null);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      const scrollAmount = 288;
      carouselRef.current.scrollTo({
        left: Math.max(currentScroll - scrollAmount, 0),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      const scrollAmount = 288;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: Math.min(currentScroll + scrollAmount, maxScroll),
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredRecipes = activeTags.length > 0
    ? recipes.filter(recipe => recipe.tags.some(tag => activeTags.includes(tag)))
    : recipes;
  
   const RecipeSkeleton = () => (
  <div
    className='rounded-3xl mt-1 hover:z-50 hoverrecipe hover:shadow-md border border-gray-200 transition group bg-white min-w-72 p-4 flex flex-col group items-center gap-2 transition-colors'
  >
    <div className='relative w-full h-[120px] overflow-hidden rounded-xl bg-gray-200 animate-pulse'>
      <div
        className='absolute top-2 right-2 p-2 rounded-xl cursor-pointer backdrop-blur-sm hover:bg-white/90 transition bg-white/70'
      >
        <div className='w-[18px] h-[18px] bg-gray-300 rounded-full'></div>
      </div>
      <div
        className='absolute top-2 right-12 p-2 rounded-xl cursor-pointer backdrop-blur-sm hover:bg-white/90 transition bg-white/70'
      >
        <div className='w-[18px] h-[18px] bg-gray-300 rounded-full'></div>
      </div>
    </div>
    <div className='w-full flex flex-col gap-2 items-center'>
      <div className='flex gap-4 w-full justify-between items-center'>
        <span className='fontSyneRegular text-base w-2/3 h-6 bg-gray-200 rounded animate-pulse'></span>
        <div className='flex gap-1 items-center'>
          <div className='w-5 h-5 bg-gray-200 rounded-full animate-pulse'></div>
          <span className='font-semibold text-sm w-8 h-4 bg-gray-200 rounded animate-pulse'></span>
        </div>
      </div>
      <div className='flex gap-4 w-full justify-start items-center'>
        <div className='flex justify-start items-center gap-2'>
          <div className='relative h-6 rounded-full w-6 ctn-icon-recipe bg-gray-400/15 flex gap-1 items-center'>
            <div className='w-4 h-4 bg-gray-300 rounded-full m-auto'></div>
          </div>
          <span className='text-xs w-16 h-4 bg-gray-200 rounded animate-pulse'></span>
        </div>
        <div className='flex justify-start items-center gap-2'>
          <div className='relative h-6 rounded-full w-6 bg-gray-400/15 ctn-icon-recipe flex gap-1 items-center'>
            <div className='w-4 h-4 bg-gray-300 rounded-full m-auto'></div>
          </div>
          <span className='text-xs w-16 h-4 bg-gray-200 rounded animate-pulse'></span>
        </div>
      </div>
    </div>
  </div>
);

  return (
    <Layout className='gradiend-layout'>
      <h1 className='fontSyneMedium text-3xl -mb-1'>Bonjour, <b>{user?.nom}</b> !</h1>
      
      <div className='space-y-4'>
        <div className='carousel-recipe flex flex-nowrap  gap-8'>
          {['Poulet', 'Poisson', 'Vegan', 'Burger', 'Brasserie', 'Pizza'].map((item) => {
            const isActive = activeTags.includes(item);
            return (
              <div
                key={item}
                className={`p-5 filterrecipe bordr shadow-perso overflow-visible border-gray-200 rounded-2xl min-w-24 flex justify-between items-center flex-col gap-2.5 cursor-pointer transition-colors group
                  ${isActive ? 'activerecipe text-white border-[#ff5e5b]' : 'bg-white hover:border-[#ff5e5b] hover:gradiend-app hover:text-white'}`}
                onClick={() => handleTagClick(item)}
              >
                <Image
                  alt={item}
                  src={`/${item.toLowerCase()}-white.svg`}
                  width={30}
                  height={30}
                  className={`transition-all duration-100 ${isActive ? 'filter-none' : 'filter invert group-hover:filter-none'}`}
                />
                <span className='fontSyneBold text-xs'>{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <span className='fontSyneBold text-2xl'>Une sélection de plats pour atteindre vos objectifs..</span>
        <div className='flex z-50 gap-2'>
          <button
            className=' pointer-events-auto group transform hover:bg-[#ff5e5b] p-1.5 px-4 bg-white rounded-full'
            onClick={scrollLeft}
            onMouseEnter={() => handleButtonMouseEnter('left')}
            onMouseLeave={handleButtonMouseLeave}
          > <LeftArrowed/>
           
          </button>
          <button
            className=' pointer-events-auto group transform hover:bg-[#ff5e5b] p-1.5 px-4 bg-white rounded-full'
            onClick={scrollRight}
            onMouseEnter={() => handleButtonMouseEnter('right')}
            onMouseLeave={handleButtonMouseLeave}
          >
         <RightArrowed/>

          </button>
        </div>
      </div>
      
      <div className='relative'>
          <div className="absolute inset-0 overcarou z-40"></div>

        <div
          ref={carouselRef}
          className='carousel-recipe  flex flex-nowrap z-10 pl-10 -ml-10 gap-8 py-8 -my-8 overflow-x-auto'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recipesLoading ? (
            // Skeletons
            Array(5).fill(null).map((_, index) => (
              <RecipeSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            // Recipes
            filteredRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className='rounded-3xl shadow-perso hover:z-50 hoverrecipe w-72 group bg-white min-w-72 flex flex-col items-center transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1'
                style={{ margin: '6px 0' }}
              >
                <div className='p-4 w-full'>
                  <div className='relative w-full h-[120px] overflow-hidden rounded-xl'>
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
                    />
                    <div
                      className='absolute top-2 right-2 p-2 rounded-xl cursor-pointer backdrop-blur-sm hover:bg-white/90 transition bg-white/70'
                      onClick={() => handleFavoriteClick(recipe._id)}
                    >
                      <Image
                        src={favorites.includes(recipe._id) ? '/fav-check.png' : '/fav.png'}
                        alt='favorite icon'
                        width={18}
                        height={18}
                        className={favorites.includes(recipe._id) ? '' : 'brightness-0'}
                      />
                    </div>
                    <div
                      className='absolute top-2 right-12 p-2 rounded-xl cursor-pointer backdrop-blur-sm hover:bg-white/90 transition bg-white/70'
                    >
                      <Image
                        src='/read.png'
                        alt='read icon'
                        width={18}
                        height={18}
                        className='brightness-0'
                      />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-2 items-center mt-2'>
                    <div className='flex gap-4 w-full justify-between items-center'>
                      <span className='fontSyneRegular ellipsis text-base'>{recipe.title}</span>
                      <div className='flex gap-1 items-center'>
                        <Image
                          src='/star.png'
                          alt='rating'
                          width={20}
                          height={20}
                        />
                        <span className='font-semibold text-sm'>{recipe.rating}</span>
                      </div>
                    </div>
                    <div className='flex gap-4 w-full justify-start items-center'>
                      <div className='flex justify-start items-center gap-2'>
                        <div className='relative h-6 rounded-full w-6 ctn-icon-recipe bg-gray-400/15 flex gap-1 items-center'>
                          <Image
                            src='/clock.png'
                            alt='clock'
                            className='p-1'
                            fill
                          />
                        </div>
                        <span className='text-xs'>≈ {recipe.preparationTime} minutes</span>
                      </div>
                      <div className='flex justify-start items-center gap-2'>
                        <div className='relative h-6 rounded-full w-6 bg-gray-400/15 ctn-icon-recipe flex gap-1 items-center'>
                          <Image
                            src='/speedometer.png'
                            alt='difficulty'
                            className='p-1'
                            fill
                          />
                        </div>
                        <span className='text-xs'>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

      <div className='flex h-64 min-h-80  gap-8'>
        <div className='w-[33%] flex flex-col gap-6 h-full'>
          <span className='text-xl fontSyneMedium'>{"Quelques idées de déssert"}</span>

          <div className='w-full border border-gray-200 flex p-4 gap-4 items-center bg-white h-full rounded-xl group'>
            <div className='relative min-w-24 w-24 h-full'>
              <Image
                src='/illu-blog.jpg'
                alt='clock'
                className='rounded-xl object-cover bg-white'
                fill
              />
            </div>

            <div className='flex flex-col gap-2  w-full'>
              <div className='justify-between flex items-center w-full'>
                <span className='text-sm fontSyneMedium'>Analyse rapide..</span>
                <Image
                  src='/toprightt.png'
                  alt='clock'
                  width={22}
                  height={22}
                  className='mr-2 p-1.5 rounded opacity-0 transition-all duration-300 group-hover:opacity-100 bg-transparent group-hover:bg-gray-400/15'
                />
              </div>

              <p className='-mt-1.5 text-xs font-extralight leading-5 limited-text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum sodales nibh sed fringilla. In pellentesque massa in bibendum ultricies. Morbi quis sodales ante. Proin a dapibus orci. Proin quis elit sit amet dui placerat varius quis non massa. Praesent et nibh ut ipsum egestas volutpat quis in lectus. Morbi finibus a ante sit amet volutpat. Praesent euismod massa leo, vitae volutpat sapien venenatis sed. Donec quis viverra orci, ac lacinia nibh. Phase
              </p>

              <div className='flex items-center gap-2'>
                <div className='p-0.5 px-1.5 gap-0.5 flex items-center fontSyneMedium text-white rounded bg-red-500/70 text-xxs'>
                  <Image
                    src='/tag-diet.png'
                    alt='clock'
                    width={9}
                    height={9}
                  />
                  <span className='text-xxs'>Healthy</span>
              </div>
              <div className='p-0.5 px-1.5 gap-0.5 flex items-center fontSyneMedium text-white rounded bg-green-500/70 text-xxs'>
                <Image
                  src='/tag-diet.png'
                  alt='clock'
                  width={9}
                  height={9}
                />
                <span className='text-xxs'>Santé</span>
              </div>
              <div className='p-0.5 px-1.5 gap-0.5 flex items-center fontSyneMedium text-white rounded bg-orange-500/70 text-xxs'>
                <Image
                  src='/tag-diet.png'
                  alt='clock'
                  width={9}
                  height={9}
                />
                <span className='text-xxs'>Santé</span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full p-4 flex border border-gray-200 items-center gap-4 bg-white h-full rounded-xl group'>
          <div className='relative min-w-24 w-24 h-full'>
            <Image
              src='/recipe/pate-saumon.webp'
              alt='clock'
              className='rounded-xl object-cover bg-white' 
              fill                
            />
          </div>
          
          <div className='flex flex-col gap-2'>
            <div className='justify-between flex items-center'>
              <span className='text-sm fontSyneMedium'>Analyse rapide..</span>
              <Image
                src='/toprightt.png'
                alt='clock'
                width={22}
                height={22}
                className='mr-2 p-1.5 rounded opacity-0 transition-all duration-300 group-hover:opacity-100 bg-transparent group-hover:bg-gray-400/15'
              />
            </div>
            <p className='-mt-1.5 text-xs font-extralight leading-5 limited-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum sodales nibh sed fringilla. In pellentesque massa in bibendum ultricies. Morbi quis sodales ante. Proin a dapibus orci. Proin quis elit sit amet dui placerat varius quis non massa. Praesent et nibh ut ipsum egestas volutpat quis in lectus. Morbi finibus a ante sit amet volutpat. Praesent euismod massa leo, vitae volutpat sapien venenatis sed. Donec quis viverra orci, ac lacinia nibh. Phase</p>
            <div className='flex items-center gap-2'>
              <div className='p-0.5 px-1.5 gap-0.5 flex items-center fontSyneMedium text-white rounded bg-yellow-500/70 text-xxs'>
                <Image
                  src='/tag-diet.png'
                  alt='clock'
                  width={9}
                  height={9}
                />
                <span className='text-xxs'>Healthy</span>
              </div>
              <div className='p-0.5 px-1.5 gap-0.5 flex items-center fontSyneMedium text-white rounded bg-blue-500/70 text-xxs'>
                <Image
                  src='/tag-diet.png'
                  alt='clock'
                  width={9}
                  height={9}
                />
                <span className='text-xxs'>Santé</span>
              </div>
              <div className='p-0.5 px-1.5 gap-0.5 flex items-center fontSyneMedium text-white rounded bg-red-500/70 text-xxs'>
                <Image
                  src='/tag-diet.png'
                  alt='clock'
                  width={9}
                  height={9}
                />
                <span className='text-xxs'>Santé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[22%] flex flex-col gap-6 h-full'>
        <span className='text-xl fontSyneMedium'>Analyse rapide..</span>

        <div className='w-full items-center  gap-4 p-4 flex   gradiend-red h-full rounded-xl'>
          <Image
            src='/strong.png'
            alt='clock'
            className='rounded-full p-1.5 bg-white' 
            width={38}
            height={38}
          />
          <div className='-mt-1'>
            <span className=' fontSyneBold text-xl text-white'>2989 <b className='font-extralight text-xs'> kcal</b></span>
            <p className='text-xs text-white'>Brulé depuis Dimanche</p>
          </div>
        </div>
        <div className='w-full items-center  gap-4 p-4 flex gradiend-purple  h-full rounded-xl'>
          <Image
            src='/heart.png'
            alt='clock'
            className='rounded-full p-1.5 bg-white' 
            width={38}
            height={38}
          />
          <div className='-mt-1'>
            <span className=' fontSyneBold text-xl text-white'>2989 <b className='font-extralight text-xs'> kcal</b></span>
            <p className='text-xs text-white'>Brulé depuis Dimanche</p>
          </div>
        </div>
        <div className='w-full items-center  gap-4 p-4 flex gradiend-green h-full rounded-xl'>
          <Image
            src='/strong.png'
            alt='clock'
            className='rounded-full p-1.5 bg-white' 
            width={38}
            height={38}
          />
          <div className='-mt-1'>
            <span className=' fontSyneBold text-xl text-white'>2989 <b className='font-extralight text-xs'> kcal</b></span>
            <p className='text-xs text-white'>Brulé depuis Dimanche</p>
          </div>
        </div>
      </div>
      <div className='w-[45%] flex flex-col gap-6 h-full'>
        <span className='text-xl fontSyneMedium'>Mesurons votre évolution</span>

        <div className='w-full border-gray-200 border relative bg-white rounded-xl h-full'>
          <Image
            src='/graph.png'
            alt='clock'
            className='rounded-xl object-cover'
            fill
          />
        </div>
      </div>
    </div>
  </Layout>
);
};

export default Dashboard;