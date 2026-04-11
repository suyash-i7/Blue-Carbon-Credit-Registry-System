import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, BarChart2, Globe, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const NGODashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/ngo/projects');
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-veridian-mist" size={48} />
      <p className="text-gray-400 font-bold">Synchronizing Portfolio...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-manrope font-extrabold">NGO Dashboard</h1>
          <p className="text-gray-400">Managing {user?.name || 'Organization'} Portfolio</p>
        </div>
        <Link to="/ngo/submit" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Submit Project
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Globe className="text-teal-400" />} label="Total Projects" value={projects.length} />
        <StatCard 
          icon={<BarChart2 className="text-blue-400" />} 
          label="Estimated Sequestration" 
          value={`${projects.reduce((acc, curr) => acc + (curr.area * 10), 0)} T/yr`} 
        />
        <StatCard 
          icon={<CheckCircle className="text-green-400" />} 
          label="Approved Credits" 
          value={projects.filter(p => p.status === 'approved').reduce((acc, curr) => acc + Number(curr.credits_generated || 0), 0)} 
        />
        <StatCard 
          icon={<Clock className="text-orange-400" />} 
          label="Pending Verification" 
          value={projects.filter(p => p.status === 'pending').length} 
        />
      </div>

      {/* Projects List */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="font-bold text-xl">My Projects</h3>
          <button className="text-veridian-mist text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 text-sm uppercase tracking-wider">
                <th className="px-8 py-4 font-semibold">Project Name</th>
                <th className="px-8 py-4 font-semibold">Location</th>
                <th className="px-8 py-4 font-semibold">Area</th>
                <th className="px-8 py-4 font-semibold">Credits Generated</th>
                <th className="px-8 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="px-8 py-5">
                    <div className="font-bold group-hover:text-veridian-mist transition-colors">{p.name}</div>
                    {p.tx_hash && <p className="text-[10px] font-mono text-gray-600 truncate w-32">{p.tx_hash}</p>}
                  </td>
                  <td className="px-8 py-5 text-gray-400">{p.location}</td>
                  <td className="px-8 py-5 text-gray-400">{p.area} Ha</td>
                  <td className="px-8 py-5 text-veridian-mist font-semibold">
                    {p.credits_generated || 0} VCC
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      p.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                      p.status === 'pending' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-gray-500 italic">
                    No projects submitted yet. Click "Submit Project" to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="glass p-6 rounded-2xl flex flex-col gap-4">
    <div className="p-3 bg-white/5 rounded-xl w-fit">{icon}</div>
    <div>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
      <h4 className="text-2xl font-bold font-manrope">{value}</h4>
    </div>
  </div>
);

export default NGODashboard;
