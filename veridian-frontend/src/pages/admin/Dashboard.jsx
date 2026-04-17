import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, TreePine, History, Check, X, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tokenRequests, setTokenRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, projectsRes, tokensRes] = await Promise.all([
        axios.get('/api/admin/pending-users'),
        axios.get('/api/admin/projects'),
        axios.get('/api/admin/token-requests')
      ]);
      setPendingUsers(usersRes.data);
      setProjects(projectsRes.data);
      setTokenRequests(tokensRes.data);
    } catch (err) {
      setError('Failed to fetch registry data. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (id) => {
    try {
      await axios.post('/api/admin/approve-user', { id });
      setPendingUsers(prev => prev.filter(u => u.id !== id));
      alert('User approved successfully!');
    } catch (err) {
      alert('Failed to approve user.');
    }
  };

  const handleApproveProject = async (id) => {
    try {
      await axios.post('/api/admin/approve-project', { id });
      setProjects(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
      alert('Project approved and tokens minted!');
    } catch (err) {
      alert('Failed to approve project. Ensure blockchain node is running.');
    }
  };

  const handleApproveToken = async (id) => {
    try {
      await axios.post('/api/admin/approve-request', { id });
      setTokenRequests(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' } : t));
      alert('Tokens transferred to corporate wallet!');
    } catch (err) {
      alert('Failed to approve token request.');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-[#0F766E]" size={48} />
      <p className="text-gray-500 font-bold">Synchronizing with Blockchain Ledger...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 p-6 bg-[#F5F7F6] min-h-screen">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-manrope font-extrabold flex items-center gap-3 text-gray-900">
            <ShieldCheck className="text-[#0F766E]" size={36} />
            Registry Administration
          </h1>
          <p className="text-gray-500 font-medium">System Oversight & Blockchain Governance</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Carbon Minted" value={`${projects.filter(p => p.status === 'approved').reduce((acc, curr) => acc + Number(curr.credits_generated || 0), 0)} T`} sub="LIFETIME" />
        <StatCard label="Pending Verifications" value={pendingUsers.length + projects.filter(p => p.status === 'pending').length} sub="ACTION REQUIRED" />
        <StatCard label="Registered NGOs" value="12" sub="ACTIVE" />
        <StatCard label="Corporate Clients" value="4" sub="ACTIVE" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Queue */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-900">System Queue</h3>
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase border border-orange-200">Needs Review</span>
          </div>
          <div className="divide-y divide-gray-100">
            {/* User Enrollments */}
            {pendingUsers.map((user) => (
              <QueueItem 
                key={user.id}
                type="User Enrollment"
                title={user.name}
                subtitle={`${user.role.toUpperCase()} | ${user.email}`}
                onApprove={() => handleApproveUser(user.id)}
                icon={<Users size={24} />}
                colorClass="bg-green-50 text-green-700 border border-green-100"
              />
            ))}
            {/* Project Submissions */}
            {projects.filter(p => p.status === 'pending').map((project) => (
              <QueueItem 
                key={project.id}
                type="Project Approval"
                title={project.name}
                subtitle={`${project.area} Hectares | ${project.location}`}
                onApprove={() => handleApproveProject(project.id)}
                icon={<TreePine size={24} />}
                colorClass="bg-[#E7F3F2] text-[#0F766E] border border-[#d0e9e7]"
              />
            ))}
            {/* Token Requests */}
            {tokenRequests.filter(t => t.status === 'pending').map((token) => (
              <QueueItem 
                key={token.id}
                type="Token Request"
                title={`Request by ${token.company_id?.name}`}
                subtitle={`${token.amount} VCC Tokens`}
                onApprove={() => handleApproveToken(token.id)}
                icon={<ExternalLink size={24} />}
                colorClass="bg-emerald-50 text-emerald-700 border border-emerald-100"
              />
            ))}

            {pendingUsers.length === 0 && projects.filter(p => p.status === 'pending').length === 0 && tokenRequests.filter(t => t.status === 'pending').length === 0 && (
              <div className="p-20 text-center text-gray-500 italic bg-white pb-20">
                All queues are clear. The registry is up to date.
              </div>
            )}
          </div>
        </div>

        {/* Blockchain Activity */}
        <div className="bg-white rounded-xl p-8 flex flex-col gap-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-xl text-gray-900 border-b border-gray-100 pb-4">On-Chain Activity</h3>
          <div className="flex flex-col gap-6">
            {projects.filter(p => p.tx_hash).slice(0, 5).map(p => (
              <div key={p.id} className="flex gap-4 items-start">
                <div className="w-1.5 h-full min-h-[40px] bg-[#0F766E] rounded-full mt-1" />
                <div>
                  <p className="text-xs font-mono text-[#0F766E] truncate w-40 bg-[#E7F3F2] px-2 py-0.5 rounded border border-[#d0e9e7]">{p.tx_hash}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Minted {p.credits_generated} Tokens</p>
                  <p className="text-xs text-gray-500 mt-0.5">{new Date(p.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {projects.filter(p => p.tx_hash).length === 0 && (
              <p className="text-sm text-gray-500 italic">No recent on-chain activity.</p>
            )}
          </div>
          <button className="mt-auto py-3 bg-white border border-gray-300 text-gray-700 rounded-lg w-full text-sm font-bold hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
            Full Ledger Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

const QueueItem = ({ type, title, subtitle, onApprove, icon, colorClass }) => (
  <div className="px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-all group bg-white">
    <div className="flex items-center gap-6">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{type}</p>
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
    <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
      <button className="p-2.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all shadow-sm">
        <X size={18} />
      </button>
      <button onClick={onApprove} className="p-2.5 bg-[#0F766E] text-white rounded-lg hover:bg-[#0c615a] transition-all shadow-sm">
        <Check size={18} />
      </button>
    </div>
  </div>
);

const StatCard = ({ label, value, sub }) => (
  <div className="bg-white rounded-xl p-6 relative overflow-hidden group border border-gray-200 shadow-sm">
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#E7F3F2] rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest relative z-10">{label}</p>
    <h4 className="text-3xl font-manrope font-extrabold mt-1 text-gray-900 relative z-10">{value}</h4>
    <p className="text-[10px] font-bold text-[#0F766E] mt-2 tracking-tighter relative z-10">{sub}</p>
  </div>
);

export default AdminDashboard;
