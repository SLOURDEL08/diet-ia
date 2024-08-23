// src/components/UserHeader.tsx
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';

const UserHeader: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <aside className="bg-blue-500 text-white  w-64 h-full p-8 flex flex-col items-center">
      <Link href="/">
        <Image alt="logo DietIA" src="/dietia-logo.png" width={100} height={100} />
      </Link>
      <nav className="mt-10 flex flex-col space-y-4">
        {isAuthenticated && (
          <>
            <Link href="/dashboard" className="hover:underline">
              Tableau de bord
            </Link>
            <button onClick={logout} className="mt-4 text-left">
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default UserHeader;