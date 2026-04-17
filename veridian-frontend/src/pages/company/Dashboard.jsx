import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, LayoutDashboard, History, Leaf, ArrowUpRight, Clock, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const CompanyDashboard = () => {
  const [data, setData] = useState({ balance: 0, history: [] });
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('portfolio');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const expiryDate = new Date(`${currentYear}-12-31T23:59:59`).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = expiryDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
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

  const handleBuyTokens = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/company/buy-tokens', { amount: Number(requestAmount) });
      alert('Tokens successfully purchased and transferred to your ledger!');
      setShowRequestModal(false);
      setRequestAmount('');
      fetchTokens();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to buy tokens');
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-veridian-mist" size={48} />
      <p className="text-gray-400 font-bold">Querying Blockchain Inventory...</p>
    </div>
  );

  const pendingRequests = data.history.filter(h => h.status === 'pending');
  const approvedPurchases = data.history.filter(h => h.status === 'approved');

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
          Buy Carbon Tokens
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('portfolio')} 
          className={`px-6 py-3 rounded-t-xl font-bold transition-colors ${activeTab === 'portfolio' ? 'bg-white/10 text-veridian-mist border-b-2 border-veridian-mist' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
        >
          Total Credits Held
        </button>
        <button 
          onClick={() => setActiveTab('purchases')} 
          className={`px-6 py-3 rounded-t-xl font-bold transition-colors ${activeTab === 'purchases' ? 'bg-white/10 text-veridian-teal border-b-2 border-veridian-teal' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
        >
          Company Purchases ({approvedPurchases.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'portfolio' && (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-8"
          >
            {/* Credit Summary & Expiry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

              <div className="glass p-8 rounded-3xl border-l-4 border-red-500/50 flex flex-col gap-4 bg-gradient-to-br from-red-500/5 to-transparent">
                <Clock className="text-red-400" size={32} />
                <div>
                  <p className="text-gray-400 font-semibold text-sm uppercase">Global Expiry Timer</p>
                  <h3 className="text-lg font-manrope font-bold mb-2">All tokens expire on Dec 31, {new Date().getFullYear()}</h3>
                  <div className="flex gap-4 mt-4">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-red-100 bg-red-500/20 px-4 py-2 rounded-xl">{String(timeLeft.days).padStart(2, '0')}</div>
                      <span className="text-xs text-gray-400 mt-1 uppercase">Days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-red-100 bg-red-500/20 px-4 py-2 rounded-xl">{String(timeLeft.hours).padStart(2, '0')}</div>
                      <span className="text-xs text-gray-400 mt-1 uppercase">Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-red-100 bg-red-500/20 px-4 py-2 rounded-xl">{String(timeLeft.minutes).padStart(2, '0')}</div>
                      <span className="text-xs text-gray-400 mt-1 uppercase">Mins</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-red-100 bg-red-500/20 px-4 py-2 rounded-xl">{String(timeLeft.seconds).padStart(2, '0')}</div>
                      <span className="text-xs text-gray-400 mt-1 uppercase">Secs</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2">Irrespective of purchase/creation date, timer is ticking.</p>
              </div>
            </div>
            
            <div className="glass rounded-3xl overflow-hidden">
              <div className="px-8 py-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-xl">Approved Credits List</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                      <th className="px-8 py-4">Request ID</th>
                      <th className="px-8 py-4">Amount (Tokens)</th>
                      <th className="px-8 py-4">Approval Date</th>
                      <th className="px-8 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedPurchases.map((h) => (
                      <tr key={h.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-8 py-5 font-mono text-gray-400 text-xs">{h.id}</td>
                        <td className="px-8 py-5 text-xl font-bold">{h.amount} VCC</td>
                        <td className="px-8 py-5 text-gray-400">{new Date(h.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 rounded-lg text-xs font-bold border bg-veridian-teal/10 text-veridian-mist border-veridian-teal/20">
                            APPROVED / HELD
                          </span>
                        </td>
                      </tr>
                    ))}
                    {approvedPurchases.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-8 py-20 text-center text-gray-500 italic">
                          No approved tokens held.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}



        {activeTab === 'purchases' && (
          <motion.div 
            key="purchases"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            <div className="glass p-6 rounded-3xl border-l-4 border-veridian-teal flex items-center gap-4 bg-veridian-teal/5">
              <History className="text-veridian-teal" size={32} />
              <div>
                <h3 className="text-xl font-bold">Company Purchases & Blockchain Deployment</h3>
                <p className="text-gray-400 text-sm">Approved purchases transferred to your company wallet, displaying all contract details and transaction hashes.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {approvedPurchases.map(req => (
                <div key={req.id} className="glass rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-veridian-teal/20 transition-all">
                  <div 
                    className="p-6 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExpand(req.id)}
                  >
                    <div className="flex items-center gap-6">
                      <div className="bg-veridian-teal/10 p-4 rounded-xl">
                        <Leaf className="text-veridian-teal" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{req.amount} VCC</h4>
                        <p className="text-sm font-mono text-gray-500 mt-1">ID: {req.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-300">Transaction Hash</p>
                        <p className="text-xs text-veridian-mist font-mono max-w-[150px] truncate">{req.tx_hash || 'Pending Chain Sync...'}</p>
                      </div>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold border bg-veridian-teal/10 text-veridian-mist border-veridian-teal/20">
                        APPROVED
                      </span>
                      {expandedId === req.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                    </div>
                  </div>
                  
                  {/* Expanded Details for Completed Purchase */}
                  {expandedId === req.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 pb-6 pt-2 border-t border-white/5 bg-black/20"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                         <div className="space-y-1">
                          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Transaction Hash</p>
                          {req.tx_hash ? (
                            <a href={`https://sepolia.etherscan.io/tx/${req.tx_hash}`} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-blue-400 hover:underline flex items-center gap-1 break-all">
                              {req.tx_hash} <ArrowUpRight size={12} />
                            </a>
                          ) : (
                            <p className="font-mono text-sm text-gray-400">N/A</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Approval Date</p>
                          <p className="font-mono text-sm">{new Date(req.created_at).toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Tokens Transferred</p>
                          <p className="font-mono text-sm text-veridian-mist font-bold">{req.amount} VCC</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Destination Wallet</p>
                          <p className="font-mono text-sm text-gray-300">Company Blockchain Ledger</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              {approvedPurchases.length === 0 && (
                <div className="glass p-10 rounded-3xl text-center text-gray-500 italic">
                  No approved purchases found in your ledger.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buy Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 rounded-3xl w-full max-w-md flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold">Buy Carbon Tokens</h3>
            <p className="text-gray-400 text-sm">Purchase VCC tokens directly. Annual limit is 100 tokens per company. Tokens will be instantly transferred to your blockchain ledger.</p>
            <form onSubmit={handleBuyTokens} className="flex flex-col gap-4">
              <input 
                type="number" 
                placeholder="Amount (e.g. 50)" 
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
                  Confirm Purchase
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
