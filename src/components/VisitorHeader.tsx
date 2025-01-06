// VisitorHeader.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VisitorHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ff5e5b]/90 backdrop-blur-sm border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image alt="logo DietIA" src="/dietia-logo.png" className='!invert' width={80} height={80} />
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="px-4 py-2 text-white hover:text-gray-900 transition-colors"
          >
            Connexion
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Commencer gratuitement
          </Link>
        </div>
      </div>
    </header>
  );
};

export default VisitorHeader;
