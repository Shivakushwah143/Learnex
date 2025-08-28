import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, BookOpen, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="bg-gray-900/90 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur-sm group-hover:bg-blue-300/20 transition-all"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Learnx
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className="text-gray-300 hover:text-white transition-colors relative group"
            >
              Courses
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user && !isAdmin && (
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                My Learning
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
            {user && isAdmin && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                Admin Panel
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1 border border-purple-500/30">
                  <User className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">{user.userName}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 group"
                >
                  <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/admin/signup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;