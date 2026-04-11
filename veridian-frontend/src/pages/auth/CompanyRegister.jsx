import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, BarChart3, CloudRain, Wallet, CheckCircle2 } from 'lucide-react';

const CompanyRegister = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleFinalSubmit = () => navigate('/login');

  return (
    <div className="flex justify-center items-center py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[32px] w-full max-w-2xl flex flex-col gap-8"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-manrope font-extrabold tracking-tight">Corporate Enroll</h2>
            <p className="text-gray-400">Step {step} of 3: {step === 1 ? 'Business Identity' : step === 2 ? 'Emission Data' : 'Wallet Connection'}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 w-8 rounded-full transition-all ${step >= s ? 'bg-veridian-teal' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Company Registered Name</label>
              <input type="text" placeholder="Global Tech Corp." className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Industry Sector</label>
                <select className="input-field appearance-none">
                  <option>Manufacturing</option>
                  <option>Technology</option>
                  <option>Energy</option>
                  <option>Logistics</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Tax ID / EIN</label>
                <input type="text" placeholder="ABC-987654" className="input-field" />
              </div>
            </div>
            <button onClick={handleNext} className="btn-primary py-4 mt-4">Continue to Emission Data</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="p-6 bg-blue-500/10 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CloudRain className="text-blue-400" />
                <h4 className="font-bold">Annual Emission Target</h4>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Estimated Tonnes CO2 / Year</label>
                <input type="number" placeholder="5000" className="input-field" />
              </div>
            </div>
            <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-4 text-center">
              <div className="p-4 bg-veridian-teal/10 rounded-full">
                <BarChart3 size={32} className="text-veridian-mist" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Upload Audit Report</h4>
                <p className="text-sm text-gray-400">Proof of your annual emissions (PDF)</p>
              </div>
              <label className="px-6 py-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all font-semibold">
                Upload Proof
              </label>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 glass py-4 rounded-lg font-semibold">Back</button>
              <button onClick={handleNext} className="flex-[2] btn-primary py-4">Next: Wallet Connect</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8 items-center text-center">
            <div className="p-6 bg-orange-500/10 rounded-full">
              <Wallet size={48} className="text-orange-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Connect Corp Wallet</h3>
              <p className="text-gray-400 max-w-sm">Carbon tokens will be transferred directly to this address upon purchase approval.</p>
            </div>
            <button className="w-full py-4 glass rounded-xl border-orange-500/20 text-orange-400 font-bold hover:bg-orange-500/10 transition-all">
              Connect MetaMask
            </button>
            <div className="flex gap-4 w-full">
              <button onClick={() => setStep(2)} className="flex-1 glass py-4 rounded-lg font-semibold">Back</button>
              <button onClick={handleFinalSubmit} className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2">
                Complete Enrollment
                <CheckCircle2 size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CompanyRegister;
