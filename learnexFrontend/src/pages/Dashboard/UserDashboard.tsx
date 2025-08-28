import React, { useState, useEffect } from 'react';
import { courseService } from '../../services/api';
import { Course } from '../../types';
import CourseCard from '../../components/UI/CourseCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      const data = await courseService.getPurchasedCourses();
      setPurchasedCourses(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch purchased courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Learning Dashboard</span>
          </h1>
          <p className="text-xl text-gray-400">
            Track your progress and continue your learning journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              label: 'Enrolled Courses',
              value: purchasedCourses.length,
              color: 'purple',
              bg: 'purple-500/10',
              border: 'purple-500/30'
            },
            {
              icon: Clock,
              label: 'Hours Learning',
              value: '24h',
              color: 'blue',
              bg: 'blue-500/10',
              border: 'blue-500/30'
            },
            {
              icon: Award,
              label: 'Completed',
              value: '0',
              color: 'green',
              bg: 'green-500/10',
              border: 'green-500/30'
            },
            {
              icon: TrendingUp,
              label: 'Progress',
              value: '0%',
              color: 'yellow',
              bg: 'yellow-500/10',
              border: 'yellow-500/30'
            }
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300`}></div>
              <div className={`relative bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl border border-${stat.border}`}>
                <div className={`inline-flex p-2 bg-${stat.bg} border border-${stat.border} rounded-lg mb-3`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* My Courses Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>
          
          {purchasedCourses.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="inline-flex p-4 bg-gray-700/50 rounded-full mb-4">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Courses Yet</h3>
              <p className="text-gray-400 mb-6">
                Start your learning journey by enrolling in your first course
              </p>
              <a
                href="/courses"
                className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Browse Courses
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  isPurchased={true}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;