import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NGOsPage = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/users');
      setNgos(res.data.filter(u => u.role === 'ngo'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-[#0F766E]" size={48} />
      <p className="text-gray-500 font-bold">Fetching Registered NGOs...</p>
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
            Registered NGOs
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">Platform Project Submitting Partners</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-900">NGO Directory</h3>
          <span className="text-xs font-bold bg-[#E7F3F2] text-[#0F766E] px-3 py-1 rounded-full border border-[#d0e9e7]">
            {ngos.length} Partners
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          {ngos.map((ngo) => (
            <div key={ngo.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full border border-gray-200 text-gray-500">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{ngo.name}</h4>
                  <p className="text-sm font-medium text-gray-500">{ngo.email}</p>
                </div>
              </div>
              <div className="text-right flex flex-col gap-1">
                {ngo.approved ? (
                  <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-bold ml-auto">APPROVED</span>
                ) : (
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded text-xs font-bold ml-auto">PENDING</span>
                )}
                <span className="text-xs font-mono text-gray-400 max-w-[150px] truncate">{ngo.wallet_address || 'No Wallet Linked'}</span>
              </div>
            </div>
          ))}
          {ngos.length === 0 && (
            <div className="p-12 text-center text-gray-500 italic flex items-center justify-center gap-2">
              <AlertCircle size={18} /> No NGOs registered yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOsPage;
