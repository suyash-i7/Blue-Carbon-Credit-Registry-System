import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, LayoutDashboard, History, Leaf, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';

const CompanyDashboard = () => {
  const credits = [
    { id: 1, batch: 'VER-2026-001', amount: 450, expires: '2026-07-10', status: 'Active' },
    { id: 2, batch: 'VER-2026-003', amount: 1200, expires: '2026-07-15', status: 'Active' },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-manrope font-extrabold">Corporate Portfolio</h1>
          <p className="text-gray-400">Ledger for TechGiant Corporation</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
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
            <h3 className="text-5xl font-manrope font-bold">1,650</h3>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
            <ArrowUpRight size={16} />
            OFFSETTING 1,650 TONNES CO2
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border-l-4 border-orange-500/50 flex flex-col gap-4">
          <Clock className="text-orange-400" size={32} />
          <div>
            <p className="text-gray-400 font-semibold text-sm uppercase">Expiring in 90 Days</p>
            <h3 className="text-5xl font-manrope font-bold">1,650</h3>
          </div>
          <p className="text-gray-500 text-sm">All current credits expire by July 2026</p>
        </div>

        <div className="glass p-8 rounded-3xl border-l-4 border-blue-500/50 flex flex-col gap-4">
          <AlertCircle className="text-blue-400" size={32} />
          <div>
            <p className="text-gray-400 font-semibold text-sm uppercase">Unmet Emission Target</p>
            <h3 className="text-5xl font-manrope font-bold">3,350</h3>
          </div>
          <p className="text-gray-500 text-sm">Based on annual 5k target recorded</p>
        </div>
      </div>

      {/* Credit Inventory */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="px-8 py-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-xl">Credit Inventory</h3>
          <div className="flex gap-4">
            <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Usage History</button>
            <button className="text-sm font-bold text-veridian-mist">Burn Credits</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-4">Allocation ID</th>
                <th className="px-8 py-4">Amount (Tokens)</th>
                <th className="px-8 py-4">Mint Date</th>
                <th className="px-8 py-4">Expiry Date</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 font-mono text-veridian-mist font-bold">{c.batch}</td>
                  <td className="px-8 py-5 text-xl font-bold">{c.amount}</td>
                  <td className="px-8 py-5 text-gray-400">2026-04-11</td>
                  <td className="px-8 py-5 text-orange-400 font-semibold">{c.expires}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-veridian-teal/10 text-veridian-mist rounded-lg text-xs font-bold border border-veridian-teal/20">
                      {c.status}
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

export default CompanyDashboard;
