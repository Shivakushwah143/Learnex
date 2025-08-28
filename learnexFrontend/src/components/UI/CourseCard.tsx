import React from 'react';
import { Course } from '../../types';
import { BookOpen, DollarSign, Eye, ShoppingCart } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onPurchase?: (courseId: string) => void;
  showActions?: boolean;
  isPurchased?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onPurchase, 
  showActions = true, 
  isPurchased = false 
}) => {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
      
      <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={course.image || `https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800`}
            alt={course.tittle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
          
          {/* Status indicator */}
          <div className="absolute top-3 right-3">
            {isPurchased ? (
              <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-xs rounded-full backdrop-blur-sm">
                Purchased
              </span>
            ) : course.publish ? (
              <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-xs rounded-full backdrop-blur-sm">
                Published
              </span>
            ) : (
              <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs rounded-full backdrop-blur-sm">
                Draft
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {course.tittle}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {course.discription}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-green-400">
              <DollarSign className="h-5 w-5" />
              <span className="text-lg font-bold">${course.price}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <BookOpen className="h-4 w-4" />
              <span>Course</span>
            </div>
          </div>

          {showActions && !isPurchased && (
            <button
              onClick={() => onPurchase?.(course._id)}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 group/btn"
            >
              <ShoppingCart className="h-4 w-4 group-hover/btn:animate-bounce" />
              <span>Purchase Course</span>
            </button>
          )}

          {isPurchased && (
            <button className="w-full py-3 bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg flex items-center justify-center space-x-2 cursor-default">
              <Eye className="h-4 w-4" />
              <span>Access Course</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;