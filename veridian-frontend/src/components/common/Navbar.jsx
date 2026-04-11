import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-6 z-50 mx-auto max-w-7xl px-4">
      <div className="glass flex items-center justify-between px-8 py-4 rounded-2xl border border-white/10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-veridian-teal to-veridian-mist rounded-xl shadow-lg shadow-veridian-teal/20 group-hover:scale-110 transition-transform">
            <Shield size={24} className="text-white" />
          </div>
          <span className="text-2xl font-manrope font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Veridian<span className="text-veridian-mist">Registry</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-8 font-semibold text-sm">
          {!user ? (
            <>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Platform</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Protocol</Link>
              <Link to="/login" className="btn-primary px-6 py-2.5">
                Portal Login
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col items-end mr-2">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">{user.role}</span>
                <span className="text-sm font-bold text-veridian-mist">{user.name}</span>
              </div>
              <Link 
                to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'ngo' ? '/ngo/dashboard' : '/company/dashboard'} 
                className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
