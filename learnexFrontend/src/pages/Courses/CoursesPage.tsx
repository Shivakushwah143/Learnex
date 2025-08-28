import React, { useState, useEffect } from 'react';
import { courseService } from '../../services/api';
import { Course } from '../../types';
import CourseCard from '../../components/UI/CourseCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { Search, Filter, BookOpen } from 'lucide-react';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getPublishedCourses();
      setCourses(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (courseId: string) => {
    if (!token) {
      alert('Please login to purchase courses');
      return;
    }

    try {
      await courseService.purchaseCourse(courseId);
      alert('Course purchased successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to purchase course');
    }
  };

  const filteredCourses = courses.filter(course =>
    course.tittle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.discription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Courses</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover cutting-edge courses designed to accelerate your career in technology
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex p-4 bg-gray-800/50 rounded-full mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try different search terms' : 'No published courses available'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onPurchase={handlePurchase}
                showActions={!!token}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;