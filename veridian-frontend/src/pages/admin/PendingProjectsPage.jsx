import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TreePine, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PendingProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/projects');
      setProjects(res.data.filter(p => p.status === 'pending'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-[#0F766E]" size={48} />
      <p className="text-gray-500 font-bold">Fetching Projects...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 p-6 bg-[#F5F7F6] min-h-screen">
      <div className="flex items-center gap-4">
        <Link to="/admin/dashboard" className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft className="text-gray-600" size={24} />
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-manrope font-extrabold flex items-center gap-3 text-gray-900">
            Pending NGO Projects
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">Awaiting Minting Verification</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-xl text-gray-900">Verification Queue</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {projects.map((p) => (
            <div key={p.id} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors">
              <div className="p-4 rounded-xl bg-[#E7F3F2] text-[#0F766E] border border-[#d0e9e7]">
                <TreePine size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{p.submitted_by?.name || 'Unknown NGO'}</p>
                <h4 className="text-lg font-bold text-gray-900">{p.name}</h4>
                <p className="text-sm text-gray-600">{p.area} Hectares | {p.location}</p>
              </div>
              <div className="text-xs font-bold px-3 py-1 rounded bg-orange-100 text-orange-800 border border-orange-200">
                PENDING REVIEW
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="p-12 text-center text-gray-500 italic flex items-center justify-center gap-2">
              <AlertCircle size={18} /> No pending NGO projects at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingProjectsPage;
