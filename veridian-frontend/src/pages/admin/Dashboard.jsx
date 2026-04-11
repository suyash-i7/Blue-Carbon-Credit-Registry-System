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
      <Loader2 className="animate-spin text-veridian-mist" size={48} />
      <p className="text-gray-400 font-bold">Synchronizing with Blockchain Ledger...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-manrope font-extrabold flex items-center gap-3">
            <ShieldCheck className="text-veridian-mist" size={36} />
            Registry Administration
          </h1>
          <p className="text-gray-400">System Oversight & Blockchain Governance</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
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
        <div className="lg:col-span-2 glass rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-bold text-xl">System Queue</h3>
            <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded tracking-tighter uppercase">Needs Review</span>
          </div>
          <div className="divide-y divide-white/5">
            {/* User Enrollments */}
            {pendingUsers.map((user) => (
              <QueueItem 
                key={user.id}
                type="User Enrollment"
                title={user.name}
                subtitle={`${user.role.toUpperCase()} | ${user.email}`}
                onApprove={() => handleApproveUser(user.id)}
                icon={<Users size={24} />}
                colorClass="bg-green-500/10 text-green-400"
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
                colorClass="bg-blue-500/10 text-blue-400"
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
                colorClass="bg-purple-500/10 text-purple-400"
              />
            ))}

            {pendingUsers.length === 0 && projects.filter(p => p.status === 'pending').length === 0 && tokenRequests.filter(t => t.status === 'pending').length === 0 && (
              <div className="p-20 text-center text-gray-500 italic">
                All queues are clear. The registry is up to date.
              </div>
            )}
          </div>
        </div>

        {/* Blockchain Activity */}
        <div className="glass rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="font-bold text-xl border-b border-white/10 pb-4">On-Chain Activity</h3>
          <div className="flex flex-col gap-6">
            {projects.filter(p => p.tx_hash).slice(0, 5).map(p => (
              <div key={p.id} className="flex gap-4 items-start">
                <div className="w-2 h-10 bg-veridian-teal rounded-full mt-1" />
                <div>
                  <p className="text-xs font-mono text-veridian-mist truncate w-32">{p.tx_hash}</p>
                  <p className="text-sm font-semibold">Minted {p.credits_generated} Tokens</p>
                  <p className="text-xs text-gray-500">{new Date(p.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-auto py-3 glass rounded-xl w-full text-sm font-bold hover:bg-white/10 transition-all">
            Full Ledger Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

const QueueItem = ({ type, title, subtitle, onApprove, icon, colorClass }) => (
  <div className="px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all group">
    <div className="flex items-center gap-6">
      <div className={`p-4 rounded-2xl ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{type}</p>
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
        <X size={20} />
      </button>
      <button onClick={onApprove} className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all">
        <Check size={20} />
      </button>
    </div>
  </div>
);

const StatCard = ({ label, value, sub }) => (
  <div className="glass rounded-2xl p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-veridian-teal/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-manrope font-extrabold mt-1">{value}</h4>
    <p className="text-[10px] font-bold text-veridian-mist mt-2 tracking-tighter">{sub}</p>
  </div>
);

export default AdminDashboard;
