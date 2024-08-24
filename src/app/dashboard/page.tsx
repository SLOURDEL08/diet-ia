'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Image from 'next/image';

const Dashboard: React.FC = () => {
  const { isAuthenticated, loading, user } = useAuth(); // Inclure `user` ici
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirige seulement après la vérification de l'authentification
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingScreen/>; // Affiche un message de chargement pendant la vérification
  }

  if (!isAuthenticated) {
    return null; // Empêche le contenu de se charger si l'utilisateur n'est pas connecté
  }

  return (
    <Layout className='bg-blue-300/10'>
      <div><h1>Bonjour, <b>{user?.nom}</b> !</h1> {/* Affiche le nom de l'utilisateur */}
      <p>Bienvenue sur votre tableau de bord !</p></div>
      

      <div className='space-y-6'>
        <span className='fontSyneBold text-2xl'>Ma sélection de plats</span>
        <div className='carousel-recipe flex flex-nowrap overflow-x-auto gap-8  pb-10'>
         <div className='bg-white  p-6 shadow-lg  rounded-3xl min-w-48	flex justify-center items-center	 flex-col gap-4'>
            <Image alt='recioe' src="/carpa.png"  width={200} height={200} />
            <button className='p-1 px-5 fontSyneMedium bg-blue-500 text-white text-sm rounded-full w-min'>Découvrir</button>
          </div>
         <div className='bg-white  p-6  shadow-lg rounded-3xl min-w-48	flex justify-center items-center	 flex-col gap-4'>
            <Image alt='recioe' src="/carpa.png"  width={200} height={200} />
            <button className='p-1 px-5 fontSyneMedium bg-blue-500 text-white text-sm rounded-full w-min'>Découvrir</button>
          </div>
         <div className='bg-white  p-6  shadow-lg rounded-3xl min-w-48	flex justify-center items-center	 flex-col gap-4'>
            <Image alt='recioe' src="/carpa.png"  width={200} height={200} />
            <button className='p-1 px-5 fontSyneMedium bg-blue-500 text-white text-sm rounded-full w-min'>Découvrir</button>
          </div>
         <div className='bg-white  p-6  shadow-lg rounded-3xl min-w-48	flex justify-center items-center	 flex-col gap-4'>
            <Image alt='recioe' src="/carpa.png"  width={200} height={200} />
            <button className='p-1 px-5 fontSyneMedium bg-blue-500 text-white text-sm rounded-full w-min'>Découvrir</button>
          </div>
         <div className='bg-white  p-6  shadow-lg rounded-3xl min-w-48	flex justify-center items-center	 flex-col gap-4'>
            <Image alt='recioe' src="/carpa.png"  width={200} height={200} />
            <button className='p-1 px-5 fontSyneMedium bg-blue-500 text-white text-sm rounded-full w-min'>Découvrir</button>
          </div>
         <div className='bg-white  p-6  shadow-lg rounded-3xl min-w-48	flex justify-center items-center	 flex-col gap-4'>
            <Image alt='recioe' src="/carpa.png"  width={200} height={200} />
            <button className='p-1 px-5 fontSyneMedium bg-blue-500 text-white text-sm rounded-full w-min'>Découvrir</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;