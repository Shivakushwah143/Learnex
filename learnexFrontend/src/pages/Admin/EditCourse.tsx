import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/api';
import { Course } from '../../types';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { BookOpen, Upload, DollarSign, FileText, Eye, EyeOff } from 'lucide-react';

const EditCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [formData, setFormData] = useState({
    tittle: '',
    discription: '',
    price: 0,
    publish: false,
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const course = await courseService.getSingleCourseAdmin(courseId!);
      setFormData({
        tittle: course.tittle,
        discription: course.discription,
        price: course.price,
        publish: course.publish,
        image: course.image || ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch course');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await courseService.updateCourse(courseId!, formData);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      publish: e.target.checked
    }));
  };

  if (fetching) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Edit <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Course</span>
          </h1>
          <p className="text-xl text-gray-400">
            Update your course information
          </p>
        </div>

        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl"></div>
          
          <div className="relative bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Title */}
              <div>
                <label htmlFor="tittle" className="block text-sm font-medium text-gray-300 mb-2">
                  Course Title
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="tittle"
                    name="tittle"
                    type="text"
                    required
                    value={formData.tittle}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter course title"
                  />
                </div>
              </div>

              {/* Course Description */}
              <div>
                <label htmlFor="discription" className="block text-sm font-medium text-gray-300 mb-2">
                  Course Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="discription"
                    name="discription"
                    rows={4}
                    required
                    value={formData.discription}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
                    placeholder="Describe what students will learn in this course"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                  Course Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Course Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                  Course Image URL (Optional)
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                <div className="flex items-center space-x-3">
                  {formData.publish ? (
                    <Eye className="h-5 w-5 text-green-400" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-yellow-400" />
                  )}
                  <div>
                    <div className="text-white font-medium">
                      {formData.publish ? 'Published' : 'Draft'}
                    </div>
                    <div className="text-sm text-gray-400">
                      {formData.publish 
                        ? 'Course is visible to students' 
                        : 'Course is saved but not visible to students'
                      }
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.publish}
                    onChange={handleCheckboxChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <BookOpen className="h-5 w-5" />
                    <span>Update Course</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;