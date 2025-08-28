import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/api';
import { Course } from '../../types';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { BookOpen, Plus, Edit, Trash2, Eye, Users, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCoursesAdmin();
      setCourses(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await courseService.deleteCourse(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete course');
    }
  };

  const publishedCourses = courses.filter(course => course.publish);
  const draftCourses = courses.filter(course => !course.publish);
  const totalRevenue = courses.reduce((sum, course) => sum + course.price, 0);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-400">
              Manage your courses and track your teaching progress
            </p>
          </div>
          <Link
            to="/admin/courses/create"
            className="group mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
            <span>Create Course</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              label: 'Total Courses',
              value: courses.length,
              color: 'purple',
              bg: 'purple-500/10',
              border: 'purple-500/30'
            },
            {
              icon: Eye,
              label: 'Published',
              value: publishedCourses.length,
              color: 'green',
              bg: 'green-500/10',
              border: 'green-500/30'
            },
            {
              icon: Edit,
              label: 'Drafts',
              value: draftCourses.length,
              color: 'yellow',
              bg: 'yellow-500/10',
              border: 'yellow-500/30'
            },
            {
              icon: DollarSign,
              label: 'Total Value',
              value: `$${totalRevenue}`,
              color: 'blue',
              bg: 'blue-500/10',
              border: 'blue-500/30'
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

        {/* Courses Table */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold text-white">Your Courses</h2>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-4 bg-gray-700/50 rounded-full mb-4">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Courses Yet</h3>
              <p className="text-gray-400 mb-6">
                Create your first course to start teaching
              </p>
              <Link
                to="/admin/courses/create"
                className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Price</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4 overflow-hidden">
                            <img
                              src={course.image || `https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=200`}
                              alt={course.tittle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-white font-medium">{course.tittle}</div>
                            <div className="text-gray-400 text-sm truncate max-w-xs">
                              {course.discription}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full border ${
                          course.publish
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                        }`}>
                          {course.publish ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-400 font-medium">${course.price}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/admin/courses/edit/${course._id}`}
                            className="p-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="p-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;