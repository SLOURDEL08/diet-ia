// src/components/VisitorHeader.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VisitorHeader: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white w-full p-4 flex justify-between items-center">
      <Link href="/">
        <Image alt="logo DietIA" src="/dietia-logo.png" width={100} height={100} />
      </Link>
      <div>
        <Link href="/login" className="hover:underline mr-4">
          Connexion
        </Link>
        <Link href="/register" className="hover:underline">
          Inscription
        </Link>
      </div>
    </header>
  );
};

export default VisitorHeader;