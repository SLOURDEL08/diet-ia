import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute transition duration-1000 bg-white/10 backdrop-blur-sm inset-0  z-50 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-black border-solid rounded-full animate-spin"></div>
        <style jsx>{`
          .animate-spin {
            border-top-color: #000;
            border-radius: 50%;
            border-width: 4px;
            border-style: solid;
            border-color: #ffffff transparent transparent transparent;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingScreen;