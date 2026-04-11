import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import NGORegister from './pages/auth/NGORegister';
import CompanyRegister from './pages/auth/CompanyRegister';
import NGODashboard from './pages/ngo/Dashboard';
import SubmitProject from './pages/ngo/SubmitProject';
import AdminDashboard from './pages/admin/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen text-white font-inter">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register/ngo" element={<NGORegister />} />
              <Route path="/register/company" element={<CompanyRegister />} />
              
              {/* Dashboards */}
              <Route path="/ngo/dashboard" element={<NGODashboard />} />
              <Route path="/ngo/submit" element={<SubmitProject />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/company/dashboard" element={<CompanyDashboard />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
