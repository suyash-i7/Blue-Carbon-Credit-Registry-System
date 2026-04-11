import React from 'react';
import { motion } from 'framer-motion';
import { Plus, BarChart2, Globe, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NGODashboard = () => {
  const projects = [
    { id: 1, name: 'Mangrove Restoration A1', location: 'Mumbai Coast', area: '45 Ha', status: 'Approved', capture: '120 T/yr' },
    { id: 2, name: 'Seagrass Bed Protection', location: 'Lakshadweep', area: '120 Ha', status: 'Pending', capture: '450 T/yr' },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-manrope font-extrabold">NGO Dashboard</h1>
          <p className="text-gray-400">Managing Green Mangrove Inc. Portfolio</p>
        </div>
        <Link to="/ngo/submit" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Submit Project
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Globe className="text-teal-400" />} label="Active Projects" value="4" />
        <StatCard icon={<BarChart2 className="text-blue-400" />} label="Carbon Sequestered" value="2,450 T" />
        <StatCard icon={<CheckCircle className="text-green-400" />} label="Approved Credits" value="1,800" />
        <StatCard icon={<Clock className="text-orange-400" />} label="Pending Verification" value="2" />
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
                <th className="px-8 py-4 font-semibold">CO2 Capture</th>
                <th className="px-8 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="px-8 py-5">
                    <div className="font-bold group-hover:text-veridian-mist transition-colors">{p.name}</div>
                  </td>
                  <td className="px-8 py-5 text-gray-400">{p.location}</td>
                  <td className="px-8 py-5 text-gray-400">{p.area}</td>
                  <td className="px-8 py-5 text-veridian-mist font-semibold">{p.capture}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      p.status === 'Approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
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
