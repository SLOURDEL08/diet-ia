import React from 'react';
import VisitorHeader from './VisitorHeader';

interface VisitorLayoutProps {
  children: React.ReactNode;
}

const VisitorLayout: React.FC<VisitorLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VisitorHeader />
      <main className="">
        {children}
      </main>
    </div>
  );
};

export default VisitorLayout;