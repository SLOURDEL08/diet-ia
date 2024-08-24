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
      <nav className="flex flex-col gap-3">
        {isAuthenticated && (
          <>
            <Link 
              href="/dashboard" 
              className={`flex  items-center gap-2 text-sm fontSyneMedium px-3 py-2 rounded-full ${pathname === '/dashboard' ? 'bg-white text-gray-800' : 'text-white'}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-5 h-5 ${pathname === '/dashboard' ? 'text-gray-800' : 'text-white'}`}
              >
                <path d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z" />
                <path d="M21 9L3 9" />
                <path d="M9 21L9 9" />
              </svg>
              Dashboard
            </Link>
            <Link 
              href="/mon-compte" 
              className={`flex  items-center text-sm gap-2 fontSyneMedium px-3 py-2 rounded-full ${pathname === '/mon-compte' ? 'bg-white text-gray-800' : 'text-white'}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-5 h-5 ${pathname === '/mon-compte' ? 'text-gray-800' : 'text-white'}`}
              >
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/>
                <path d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"/>
              </svg>
              Mon compte
            </Link>
            <button 
              onClick={logout} 
              className={`mt-4 fontSyneRegular text-sm flex gap-2 items-center text-left text-white py-2 px-4 rounded group ${pathname === '/logout' ? 'bg-gray-800' : 'bg-red-700'}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-4 h-4 ${pathname === '/logout' ? 'text-gray-800' : 'text-white'}`}
              >
                <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" />
              </svg>
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default UserHeader;