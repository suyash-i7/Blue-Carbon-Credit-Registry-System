import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, TreePine, History, Check, X, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
  const pendingRequests = [
    { id: 1, type: 'NGO Registration', name: 'Coastal Trust', date: '2026-04-10', status: 'Pending' },
    { id: 2, type: 'Project Approval', name: 'Sundarbans Phase 2', date: '2026-04-11', status: 'Pending' },
    { id: 3, type: 'Token Purchase', name: 'TechGiant Corp', date: '2026-04-11', status: 'Pending' },
  ];

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
        <div className="flex gap-4">
          <button className="glass px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
            <History size={18} />
            Audit Logs
          </button>
          <button className="btn-primary">System Health</button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Carbon Minted" value="54,200 T" sub="LIFETIME" />
        <StatCard label="Registered NGOs" value="128" sub="+3 THIS WEEK" />
        <StatCard label="Corporate Clients" value="42" sub="ACTIVE" />
        <StatCard label="Admin Pool" value="12,500" sub="TOKENS" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Queue */}
        <div className="lg:col-span-2 glass rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-bold text-xl">Verification Queue</h3>
            <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded tracking-tighter uppercase">Action Required</span>
          </div>
          <div className="divide-y divide-white/5">
            {pendingRequests.map((req) => (
              <div key={req.id} className="px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${
                    req.type.includes('NGO') ? 'bg-green-500/10 text-green-400' : 
                    req.type.includes('Project') ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {req.type.includes('NGO') ? <Users size={24} /> : req.type.includes('Project') ? <TreePine size={24} /> : <ExternalLink size={24} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{req.type}</p>
                    <h4 className="text-lg font-bold">{req.name}</h4>
                    <p className="text-sm text-gray-400">Submitted on {req.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 text-white transition-all">
                    <X size={20} />
                  </button>
                  <button className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 text-white transition-all">
                    <Check size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Activity */}
        <div className="glass rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="font-bold text-xl border-b border-white/10 pb-4">On-Chain Activity</h3>
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-2 h-10 bg-veridian-teal rounded-full mt-1" />
                <div>
                  <p className="text-xs font-mono text-veridian-mist">0x71c...{842 + i}</p>
                  <p className="text-sm font-semibold">Minted 450 Tokens</p>
                  <p className="text-xs text-gray-500">2 mins ago</p>
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

const StatCard = ({ label, value, sub }) => (
  <div className="glass rounded-2xl p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-veridian-teal/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-manrope font-extrabold mt-1">{value}</h4>
    <p className="text-[10px] font-bold text-veridian-mist mt-2 tracking-tighter">{sub}</p>
  </div>
);

export default AdminDashboard;
