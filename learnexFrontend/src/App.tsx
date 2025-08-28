import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import AdminSignup from './pages/Auth/AdminSignup';
import CoursesPage from './pages/Courses/CoursesPage';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCourse from './pages/Admin/CreateCourse';
import EditCourse from './pages/Admin/EditCourse';
import UserSignup from './pages/Auth/UserSignup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/courses" element={<CoursesPage />} />

            {/* Protected User Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireAuth={true} requireAdmin={false}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAuth={true} requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses/create" 
              element={
                <ProtectedRoute requireAuth={true} requireAdmin={true}>
                  <CreateCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses/edit/:courseId" 
              element={
                <ProtectedRoute requireAuth={true} requireAdmin={true}>
                  <EditCourse />
                </ProtectedRoute>
              } 
            />

            {/* Fallback Route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;