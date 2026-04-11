import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, User, Building2 } from 'lucide-react';

const LoginPage = () => {
  const [role, setRole] = useState('ngo');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy navigation based on role
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'ngo') navigate('/ngo/dashboard');
    else navigate('/company/dashboard');
  };

  return (
    <div className="flex justify-center items-center py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[32px] w-full max-w-md flex flex-col gap-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-manrope font-extrabold tracking-tight">Access Registry</h2>
          <p className="text-gray-400">Secure entry to Veridian Ledger</p>
        </div>

        {/* Role Selector */}
        <div className="flex p-1 bg-white/5 rounded-xl gap-1">
          {[
            { id: 'ngo', icon: <User size={16} />, label: 'NGO' },
            { id: 'admin', icon: <ShieldCheck size={16} />, label: 'Admin' },
            { id: 'company', icon: <Building2 size={16} />, label: 'Corp' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                role === r.id ? 'bg-veridian-teal text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="name@organization.com" 
                className="input-field pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Private Key / Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input-field pl-12"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-4 mt-4 text-lg">
            Sign In to {role.toUpperCase()}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Not registered?{' '}
          <button 
            onClick={() => navigate(`/register/${role === 'company' ? 'company' : 'ngo'}`)}
            className="text-veridian-mist font-bold hover:underline"
          >
            Request Access
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
