'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import VisitorHeader from './VisitorHeader';
import UserHeader from './UserHeader';
import LoadingScreen from './LoadingScreen';
import { usePathname, useSearchParams } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      // Simuler un délai de chargement
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    };

    handleRouteChange();

    // Ce useEffect se déclenchera à chaque changement de route
  }, [pathname, searchParams]);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className={`h-screen ${className}`}>
        {isAuthenticated ? (
          <div className="flex h-full">
            <UserHeader />
            <main className="flex-1 p-10 space-y-8 overflow-hidden overflow-y-scroll">
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
    </>
  );
};

export default Layout;