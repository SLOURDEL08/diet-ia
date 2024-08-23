'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

const Dashboard: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirige seulement après la vérification de l'authentification
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <p>Chargement...</p>; // Affiche un message de chargement pendant la vérification
  }

  if (!isAuthenticated) {
    return null; // Empêche le contenu de se charger si l'utilisateur n'est pas connecté
  }

  return (
    <Layout>
      <h1>Dashboard</h1>
      <p>Bienvenue sur votre tableau de bord !</p>
    </Layout>
  );
};

export default Dashboard;