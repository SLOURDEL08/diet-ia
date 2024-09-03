// src/app/UserHeader.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { DashboardIcon, AccountIcon, LogoutIcon, TargetIcon, AnalyticsIcon, PreferenceIcon, RecipeIcon } from '@/app/ux/IconApp';

const UserHeader: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="z-50 relative gradiend-app text-white w-64 min-w-64 h-full p-8 flex flex-col gap-8">
      <Link href="/" className=" flex justify-center">
        <Image alt="logo DietIA" src="/dietia-logo-white.png" width={100} height={100} className='w-24 h-[45px]' />
      </Link>
      <hr className='w-full border-white/20 ' />
      <nav className="flex flex-col gap-3">
        {isAuthenticated && (
          <>
            {[
              {
                href: '/dashboard',
                label: 'Dashboard',
                icon: <DashboardIcon />,
              },
                {
                href: '/mes-recettes',
                label: 'Mes recettes',
                icon: <RecipeIcon />,
              },
             
              {
                href: '/mon-d',
                label: 'Mon objectif',
                icon: <TargetIcon />,
              },
             
              {
                href: '/mes-preferences',
                label: 'Mes préférences',
                icon: <PreferenceIcon />,
              },
              {
                href: '/analytics',
                label: 'Analytics',
                icon: <AnalyticsIcon />,
              },
               {
                href: '/mon-compte',
                label: 'Mon compte',
                icon: <AccountIcon />,
              }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm fontSyneMedium px-4 py-2 rounded-full group transition-colors duration-200 ease-in-out
                  ${pathname === item.href 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white hover:text-black'
                  }`}
              >
                <span className={` ${pathname === item.href ? 'text-black' : 'group-hover:text-black'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={logout}
              className="  absolute bottom-4 left-1/2 -translate-x-1/2 fontSyneRegular bg-black text-sm flex gap-2 items-center  py-2.5 px-6 rounded-full group transition-colors duration-200 ease-in-out text-white hover:bg-white hover:text-black"
            >
              <span className="transition-colors text-white duration-200 ease-in-out group-hover:text-black">
                <LogoutIcon />
              </span>
              <span>Déconnexion</span>
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default UserHeader;