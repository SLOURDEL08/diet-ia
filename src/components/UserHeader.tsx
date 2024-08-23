import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Importer usePathname

const UserHeader: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname(); // Obtenir le chemin actuel

  return (
    <aside className="bg-blue-500 text-white w-64 h-full p-8 flex flex-col">
      <Link href="/" className="mb-8 flex justify-center">
        <Image alt="logo DietIA" src="/dietia-logo.png" width={100} height={100} />
      </Link>
      <nav className="flex flex-col space-y-4">
        {isAuthenticated && (
          <>
            <Link 
              href="/dashboard" 
              className={`fontSyne px-4 py-2 rounded ${pathname === '/dashboard' ? 'bg-white text-gray-800' : 'text-white fontSyne'}`}
            >
              Tableau de bord
            </Link>
            <Link 
              href="/mon-compte" 
              className={` px-4 py-2 rounded ${pathname === '/mon-compte' ? 'bg-white text-gray-800' : 'text-white'}`}
            >
              Mon compte
            </Link>
            {/* Ajoutez d'autres liens de la même manière */}
            <button 
              onClick={logout} 
              className="mt-4 text-left bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default UserHeader;