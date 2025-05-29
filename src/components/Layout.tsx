import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Layout({ 
  children, 
  title = "SafeWork App",
  showBackButton = false,
  onBack
}: LayoutProps) {
  const location = useLocation();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      {/* header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        {showBackButton && (
          <button 
            onClick={onBack} 
            className="mr-3 text-gray-600 text-lg"
            aria-label="Go back"
          >
            ←
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </header>
      
      {/* main */}
      <main className="flex-1 p-4">
        {children}
      </main>
      
      {/* bottom nav */}
      <nav className="bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <Link 
            to="/dashboard" 
            className={`p-3 flex flex-col items-center ${
              location.pathname === '/dashboard' ? 'text-primary-500' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          
          <Link 
            to="/create-report" 
            className={`p-3 flex flex-col items-center ${
              location.pathname === '/create-report' ? 'text-primary-500' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">➕</span>
            <span className="text-xs">Report</span>
          </Link>
          
          <Link
            to="/manage-workplace"
            className={`p-3 flex flex-col items-center ${
              location.pathname === '/manage-workplace' ? 'text-primary-500' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">📍</span>
            <span className="text-xs">Workplaces</span>
          </Link>

          <Link 
            to="/profile" 
            className={`p-3 flex flex-col items-center ${
              location.pathname === '/profile' ? 'text-primary-500' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
