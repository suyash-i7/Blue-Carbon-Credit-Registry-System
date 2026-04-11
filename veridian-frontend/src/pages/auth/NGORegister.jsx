import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, FileText, Wallet, CheckCircle2 } from 'lucide-react';

const NGORegister = () => {
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
            <h2 className="text-3xl font-manrope font-extrabold tracking-tight">NGO Enrollment</h2>
            <p className="text-gray-400">Step {step} of 3: {step === 1 ? 'Organization Details' : step === 2 ? 'Verification' : 'Wallet Connection'}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 w-8 rounded-full transition-all ${step >= s ? 'bg-veridian-teal' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Organization Name</label>
                <input type="text" placeholder="Green Mangrove Inc." className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Registration ID</label>
                <input type="text" placeholder="NGO-123456" className="input-field" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Official Website</label>
              <input type="url" placeholder="https://projects.org" className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Headquarters Location</label>
              <input type="text" placeholder="Mumbai, India" className="input-field" />
            </div>
            <button onClick={handleNext} className="btn-primary py-4 mt-4">Continue to Verification</button>
          </motion.div>
        )}

        {step === 2 && ( step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-4 text-center">
              <div className="p-4 bg-veridian-teal/10 rounded-full">
                <FileText size={32} className="text-veridian-mist" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Upload Registration Documents</h4>
                <p className="text-sm text-gray-400">Upload PDF copy of your NGO certificate</p>
              </div>
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="px-6 py-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all font-semibold">
                Select Files
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Verification Note</label>
              <textarea placeholder="Briefly explain your primary focus in environmental conservation..." className="input-field min-h-[100px]" />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 glass py-4 rounded-lg font-semibold">Back</button>
              <button onClick={handleNext} className="flex-[2] btn-primary py-4">Next: Wallet Connect</button>
            </div>
          </motion.div>
        ))}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8 items-center text-center">
            <div className="p-6 bg-orange-500/10 rounded-full">
              <Wallet size={48} className="text-orange-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Connect MetaMask</h3>
              <p className="text-gray-400 max-w-sm">We use blockchain to track your contributions. Connect your wallet to receive carbon tokens after verification.</p>
            </div>
            <div className="w-full p-4 glass rounded-xl border-orange-500/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm">Not Connected</span>
              </div>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all">Connect</button>
            </div>
            <div className="flex gap-4 w-full">
              <button onClick={() => setStep(2)} className="flex-1 glass py-4 rounded-lg font-semibold">Back</button>
              <button onClick={handleFinalSubmit} className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2">
                Submit for Approval
                <CheckCircle2 size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NGORegister;
