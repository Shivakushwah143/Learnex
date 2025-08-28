import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-purple-500/20 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 w-8 h-8 m-auto border-2 border-blue-400/40 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;