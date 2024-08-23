'use client';

// src/components/Layout.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import VisitorHeader from './VisitorHeader';
import UserHeader from './UserHeader';
import LoadingScreen from './LoadingScreen';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <div className="h-screen">
      {isAuthenticated ? (
        <div className="flex h-full">
          <UserHeader />
          <main className="flex-1 overflow-auto p-6">
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