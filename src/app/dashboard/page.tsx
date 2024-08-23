'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoadingScreen from '@/components/LoadingScreen';

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
    <Layout>
      <h1>Bonjour, <b>{user?.nom}</b> !</h1> {/* Affiche le nom de l'utilisateur */}
      <p>Bienvenue sur votre tableau de bord !</p>
    </Layout>
  );
};

export default Dashboard;