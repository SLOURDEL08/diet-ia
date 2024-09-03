'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement initial
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {loading && <LoadingScreen />}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}