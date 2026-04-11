import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, LayoutDashboard, History, Leaf, ArrowUpRight, Clock, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const CompanyDashboard = () => {
  const [data, setData] = useState({ balance: 0, history: [] });
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const { data: resData } = await axios.get('/api/company/tokens');
      setData({ balance: resData.balance, history: resData.history });
    } catch (error) {
      console.error('Failed to fetch token data');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestTokens = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/company/request-tokens', { amount: Number(requestAmount) });
      alert('Token request sent to admin!');
      setShowRequestModal(false);
      setRequestAmount('');
      fetchTokens();
    } catch (error) {
      alert('Failed to request tokens');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-veridian-mist" size={48} />
      <p className="text-gray-400 font-bold">Querying Blockchain Inventory...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-manrope font-extrabold">Corporate Portfolio</h1>
          <p className="text-gray-400">Ledger for {user?.name || 'Loading...'}</p>
        </div>
        <button 
          onClick={() => setShowRequestModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <ShoppingCart size={20} />
          Request New Tokens
        </button>
      </div>

      {/* Credit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl border-l-4 border-veridian-mist flex flex-col gap-4">
          <Leaf className="text-veridian-mist" size={32} />
          <div>
            <p className="text-gray-400 font-semibold text-sm uppercase">Total Credits Held</p>
            <h3 className="text-5xl font-manrope font-bold">{data.balance}</h3>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
            <ArrowUpRight size={16} />
            OFFSETTING {data.balance} TONNES CO2
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border-l-4 border-orange-500/50 flex flex-col gap-4">
          <Clock className="text-orange-400" size={32} />
          <div>
            <p className="text-gray-400 font-semibold text-sm uppercase">Expiring Projects</p>
            <h3 className="text-5xl font-manrope font-bold">{data.history.filter(h => h.status === 'approved').length}</h3>
          </div>
          <p className="text-gray-500 text-sm">Credits are valid for 90 days from approval</p>
        </div>

        <div className="glass p-8 rounded-3xl border-l-4 border-blue-500/50 flex flex-col gap-4">
          <AlertCircle className="text-blue-400" size={32} />
          <div>
            <p className="text-gray-400 font-semibold text-sm uppercase">Pending Requests</p>
            <h3 className="text-5xl font-manrope font-bold">{data.history.filter(h => h.status === 'pending').length}</h3>
          </div>
          <p className="text-gray-500 text-sm">Awaiting admin blockchain transfer</p>
        </div>
      </div>

      {/* Credit Inventory */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="px-8 py-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-xl">Request History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-4">Request ID</th>
                <th className="px-8 py-4">Amount (Tokens)</th>
                <th className="px-8 py-4">Submission Date</th>
                <th className="px-8 py-4">Transaction Hash</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.history.map((h) => (
                <tr key={h.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 font-mono text-gray-400 text-xs">{h.id}</td>
                  <td className="px-8 py-5 text-xl font-bold">{h.amount} VCC</td>
                  <td className="px-8 py-5 text-gray-400">{new Date(h.created_at).toLocaleDateString()}</td>
                  <td className="px-8 py-5 font-mono text-veridian-mist text-xs truncate max-w-[100px]">{h.tx_hash || 'N/A'}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      h.status === 'approved' ? 'bg-veridian-teal/10 text-veridian-mist border-veridian-teal/20' : 
                      h.status === 'pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {h.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {data.history.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-gray-500 italic">
                    No token requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-3xl w-full max-w-md flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold">Request Carbon Tokens</h3>
            <p className="text-gray-400 text-sm">The admin will review your request and transfer tokens from the registry pool.</p>
            <form onSubmit={handleRequestTokens} className="flex flex-col gap-4">
              <input 
                type="number" 
                placeholder="Amount (e.g. 500)" 
                className="input-field"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
                required
              />
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 glass py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl font-bold"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
