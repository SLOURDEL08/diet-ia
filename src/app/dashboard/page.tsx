'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Image from 'next/image';
import { LeftArrowed, RightArrowed } from '../ux/IconApp';
import RecipeCarouselDashboard from '@/components/shared/RecipeCaoursel/RecipeCarouselDashboard';
import TagFilter from '@/components/shared/TagFilter';

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
  const [activeIndex, setActiveIndex] = useState(0);
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
        setTimeout(() => {
          setIsLoading(false);
          setRecipesLoading(false);
          setTimeout(() => setShowContent(true), 50);
        }, 300);
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

  const scrollCarousel = (direction: 'left' | 'right') => {
    setActiveIndex(prevIndex => {
      if (direction === 'left') {
        return Math.max(0, prevIndex - 1);
      } else {
        return Math.min(recipes.length - 1, prevIndex + 1);
      }
    });
  };

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return null;

  const filteredRecipes = activeTags.length > 0
    ? recipes.filter(recipe => recipe.tags.some(tag => activeTags.includes(tag)))
    : recipes;

  return (
    <Layout>
      <div className=" space-y-8">
        {/* Header Section */}
        <div className="bg-gray-100 rounded-2xl p-6 border">
          <h1 className="text-3xl font-bold mb-6">
            Bonjour, <span className="text-[#ff5e5b] capitalize">{user?.nom}</span> !
          </h1>
          
          {/* Tags Section */}
          <TagFilter
            tags={['Poulet', 'Poisson', 'Vegan', 'Burger', 'Brasserie', 'Pizza']}
            activeTags={activeTags}
            onTagClick={handleTagClick}
            showCircle={true}
          />
        </div>

        {/* Recipe Carousel Section */}
        <div className="bg-white rounded-2xl p-6">
        
          
          <RecipeCarouselDashboard
            recipes={filteredRecipes}
            loading={recipesLoading}
            favorites={favorites}
            onFavoriteClick={handleFavoriteClick}
          />
        </div>

        {/* Dashboard Grid */}
<div className="grid grid-cols-12 gap-6">
  {/* Left Column - Dessert Ideas */}
  <div className="col-span-4 space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Quelques idées de dessert</h2>
      <button className="text-sm text-[#ff5e5b] hover:text-[#ff4b48] transition-colors">
        Voir tout
      </button>
    </div>
            
    {/* Dessert Cards */}
    {[1, 2].map((_, index) => (
      <div 
        key={index} 
        className="bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
      >
        <div className="flex gap-4">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden">
            <Image
              src={index === 0 ? '/illu-blog.jpg' : '/recipe/pate-saumon.webp'}
              alt="Dessert"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium truncate pr-4">Analyse rapide..</h3>
              <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all">
                <Image
                  src="/toprightt.png"
                  alt="More"
                  width={20}
                  height={20}
                  className="opacity-60"
                />
              </button>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum sodales.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-0.5 text-xs font-medium text-white rounded-lg bg-red-500 bg-opacity-70 flex items-center gap-1">
                <Image src="/tag-diet.png" alt="tag" width={9} height={9} />
                Healthy
              </span>
              <span className="px-2 py-0.5 text-xs font-medium text-white rounded-lg bg-green-500 bg-opacity-70 flex items-center gap-1">
                <Image src="/tag-diet.png" alt="tag" width={9} height={9} />
                Santé
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Middle Column - Quick Stats */}
  <div className="col-span-3 space-y-4">
    <h2 className="text-xl font-bold">Analyse rapide</h2>
            
    {/* Stat Cards */}
    {[
      { color: 'from-[#ff5e5b] to-[#ff8b89]', icon: '/strong.png', value: '2989', label: 'Calories brûlées' },
      { color: 'from-purple-500 to-purple-400', icon: '/heart.png', value: '150', label: 'Rythme cardiaque' },
      { color: 'from-green-500 to-green-400', icon: '/strong.png', value: '12', label: 'Exercices réalisés' }
    ].map((stat, index) => (
      <div 
        key={index} 
        className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
      >
        <div className="bg-white/90 p-2 rounded-xl shadow-sm">
          <Image
            src={stat.icon}
            alt="Icon"
            width={32}
            height={32}
            className="opacity-90"
          />
        </div>
        <div>
          <p className="text-xl font-bold text-white">
            {stat.value} <span className="text-xs font-normal">kcal</span>
          </p>
          <p className="text-sm text-white/90">{stat.label}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Right Column - Evolution Graph */}
  <div className="col-span-5 space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Mesurons votre évolution</h2>
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 transition-colors">
          Jour
        </button>
        <button className="px-3 py-1 rounded-lg text-sm bg-[#ff5e5b] text-white">
          Semaine
        </button>
        <button className="px-3 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 transition-colors">
          Mois
        </button>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 h-[300px] relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Image
        src="/graph.png"
        alt="Evolution graph"
        className="object-cover"
        fill
      />
    </div>
  </div>
</div>
      </div>
    </Layout>
  );
};

export default Dashboard;