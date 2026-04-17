import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, History, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MintedCarbonPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/projects');
      // Filter only approved projects that minted valid carbon within 1 year
      const validMinted = res.data.filter(p => 
        p.status === 'approved' && 
        (new Date(p.created_at).getTime() > Date.now() - 365 * 24 * 60 * 60 * 1000)
      );
      setProjects(validMinted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-[#0F766E]" size={48} />
      <p className="text-gray-500 font-bold">Synchronizing Ledger...</p>
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
            Active Carbon Minting History
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">Valid Registry Credits (Within 365 Days)</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-xl text-gray-900">Ledger Approvals</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {projects.map((p) => (
            <div key={p.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <p className="text-sm font-bold text-[#0F766E]">{p.submitted_by?.name || 'Unknown NGO'}</p>
                <h4 className="text-lg font-bold text-gray-900">{p.name}</h4>
                <p className="text-xs font-mono text-gray-500 mt-1 uppercase">TX: {p.tx_hash}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-gray-900 block">{p.credits_generated} T</span>
                <span className="text-xs font-bold text-gray-400 mt-0.5 inline-block">{new Date(p.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="p-12 text-center text-gray-500 italic flex items-center justify-center gap-2">
              <AlertCircle size={18} /> No active minted credits found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintedCarbonPage;
