// src/components/LoadingScreen.tsx
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
        <p className="mt-4 text-lg text-gray-700">Chargement...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;