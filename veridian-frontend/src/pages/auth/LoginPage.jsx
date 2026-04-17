import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, User, Building2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [role, setRole] = useState('ngo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      if (result.role === 'admin') navigate('/admin/dashboard');
      else if (result.role === 'ngo') navigate('/ngo/dashboard');
      else navigate('/company/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[32px] w-full max-w-md flex flex-col gap-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-manrope font-extrabold tracking-tight text-gray-900">Access Registry</h2>
          <p className="text-gray-500">Secure entry to Veridian Ledger</p>
        </div>

        {location.state?.message && (
          <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl flex items-center gap-3 text-[#0F766E] text-sm font-medium">
            <Info size={18} />
            {location.state.message}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Role Selector */}
        <div className="flex p-1 bg-gray-100 rounded-xl gap-1 border border-gray-200">
          {[
            { id: 'ngo', icon: <User size={16} />, label: 'NGO' },
            { id: 'admin', icon: <ShieldCheck size={16} />, label: 'Admin' },
            { id: 'company', icon: <Building2 size={16} />, label: 'Corp' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                role === r.id ? 'bg-[#0F766E] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com" 
                className="input-field pl-12"
                required
              />
            </div>
            {role === 'admin' && (
              <p className="text-[10px] text-gray-500 ml-1">Note: Only authorized admin emails can access this portal.</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Private Key / Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="input-field pl-12"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn-primary w-full py-4 mt-4 text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : `Sign In to ${role.toUpperCase()}`}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Not registered?{' '}
          <button 
            onClick={() => navigate(`/register/${role === 'company' ? 'company' : 'ngo'}`)}
            className="text-[#0F766E] font-bold hover:underline"
          >
            Request Access
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
