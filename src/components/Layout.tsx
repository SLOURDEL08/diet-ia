'use client';

// src/components/Layout.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import VisitorHeader from './VisitorHeader';
import UserHeader from './UserHeader';
import LoadingScreen from './LoadingScreen';

interface LayoutProps {
  children: React.ReactNode;
  className?: string; // Ajouter une prop optionnelle pour la classe
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement pour la démonstration
    const timer = setTimeout(() => setLoading(false), 500); // Vous pouvez ajuster ce délai en fonction de vos besoins

    return () => clearTimeout(timer); // Nettoyage du timer lorsque le composant est démonté
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`h-screen ${className}`}>
      {isAuthenticated ? (
        <div className="flex h-full "> {/* Assurez-vous que space-y-4 est appliqué ici */}
          <UserHeader />
          <main className="flex-1 space-y-8 overflow-auto p-10">
            {children}
          </main>
        </div>
      ) : (
        <>
          <VisitorHeader />
          <main className="p-6">
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default Layout;