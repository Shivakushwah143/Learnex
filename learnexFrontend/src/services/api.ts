import axios, { AxiosResponse } from 'axios';
import { Course, AuthResponse, ApiResponse, User } from '../types';

const API_BASE_URL = 'http://localhost:8080'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  adminSignup: async (userName: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/admin/signup', { userName, password });
    return response.data;
  },

  adminLogin: async (userName: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/admin/login', { userName, password });
    return response.data;
  },

  userLogin: async (userName: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/user/login', { userName, password });
    return response.data;
  },
  userSignup: async (userName: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/user/signup', { userName, password });
    return response.data;
  },

  getUserMe: async (): Promise<User> => {
    const response: AxiosResponse<User> = await api.get('/user/me');
    return response.data;
  },

  getAdminMe: async (): Promise<User> => {
    const response: AxiosResponse<User> = await api.get('/admin/me');
    return response.data;
  },
};

export const courseService = {
  createCourse: async (course: Omit<Course, '_id'>): Promise<ApiResponse<Course>> => {
    const response: AxiosResponse<ApiResponse<Course>> = await api.post('/admin/courses', course);
    return response.data;
  },

  getAllCoursesAdmin: async (): Promise<Course[]> => {
    const response: AxiosResponse<ApiResponse<Course[]>> = await api.get('/admin/courses');
    return response.data.courses || [];
  },

  updateCourse: async (courseId: string, course: Partial<Course>): Promise<ApiResponse<Course>> => {
    const response: AxiosResponse<ApiResponse<Course>> = await api.put(`/admin/courses/${courseId}`, course);
    return response.data;
  },

  deleteCourse: async (courseId: string): Promise<ApiResponse<void>> => {
    const response: AxiosResponse<ApiResponse<void>> = await api.delete(`/admin/courses/${courseId}`);
    return response.data;
  },

  getSingleCourseAdmin: async (courseId: string): Promise<Course> => {
    const response: AxiosResponse<ApiResponse<Course>> = await api.get(`/admin/courses/${courseId}`);
    return response.data.singleCourse!;
  },

  getPublishedCourses: async (): Promise<Course[]> => {
    const response: AxiosResponse<ApiResponse<Course[]>> = await api.get('/users/courses');
    return response.data.courses || [];
  },

  purchaseCourse: async (courseId: string): Promise<ApiResponse<void>> => {
    const response: AxiosResponse<ApiResponse<void>> = await api.post(`/users/courses/${courseId}`);
    return response.data;
  },

  getPurchasedCourses: async (): Promise<Course[]> => {
    const response: AxiosResponse<ApiResponse<Course[]>> = await api.get('/users/purchasedCourses');
    return response.data.purchasedCourses || [];
  },
};