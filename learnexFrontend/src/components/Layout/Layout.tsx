import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Circuit board pattern background */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(110,59,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(110,59,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
             style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
        <div className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
             style={{ top: '20%', left: '80%', animationDelay: '1s' }}></div>
        <div className="absolute w-3 h-3 bg-purple-400/10 rounded-full animate-pulse"
             style={{ top: '70%', left: '20%', animationDelay: '2s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
             style={{ top: '80%', left: '90%', animationDelay: '3s' }}></div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;