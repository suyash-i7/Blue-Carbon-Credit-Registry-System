import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, BarChart3, CloudRain, Wallet, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CompanyRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    industry: 'Technology',
    taxId: '',
    emissionTarget: '',
    walletAddress: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', 'company');
    data.append('walletAddress', formData.walletAddress);
    if (file) data.append('documents', file);

    const result = await authRegister(data);
    if (result.success) {
      navigate('/login', { state: { message: 'Corporate registration successful! Awaiting admin approval.' } });
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

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
            <p className="text-gray-400">Step {step} of 3: {step === 1 ? 'Business Identity' : step === 2 ? 'Emission Data' : 'Security & Wallet'}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 w-8 rounded-full transition-all ${step >= s ? 'bg-veridian-teal' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Company Registered Name</label>
              <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Global Tech Corp." className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Business Email</label>
              <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="sustainability@corp.com" className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Industry Sector</label>
                <select name="industry" value={formData.industry} onChange={handleInputChange} className="input-field appearance-none">
                  <option>Manufacturing</option>
                  <option>Technology</option>
                  <option>Energy</option>
                  <option>Logistics</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Tax ID / EIN</label>
                <input name="taxId" value={formData.taxId} onChange={handleInputChange} type="text" placeholder="ABC-987654" className="input-field" />
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
                <input name="emissionTarget" value={formData.emissionTarget} onChange={handleInputChange} type="number" placeholder="5000" className="input-field" />
              </div>
            </div>
            <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-4 text-center">
              <div className="p-4 bg-veridian-teal/10 rounded-full">
                <BarChart3 size={32} className="text-veridian-mist" />
              </div>
              <div>
                <h4 className="font-bold text-lg">{file ? file.name : 'Upload Audit Report'}</h4>
                <p className="text-sm text-gray-400">Proof of your annual emissions (PDF)</p>
              </div>
              <input type="file" className="hidden" id="file-upload-corp" onChange={(e) => setFile(e.target.files[0])} accept=".pdf" />
              <label htmlFor="file-upload-corp" className="px-6 py-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all font-semibold">
                {file ? 'Change Report' : 'Upload PDF'}
              </label>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 glass py-4 rounded-lg font-semibold">Back</button>
              <button onClick={handleNext} className="flex-[2] btn-primary py-4">Next: Security & Wallet</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Account Password</label>
              <input name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="••••••••" className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Corporate Wallet (MetaMask)</label>
              <input name="walletAddress" value={formData.walletAddress} onChange={handleInputChange} type="text" placeholder="0x..." className="input-field font-mono text-sm" />
            </div>
            <div className="p-6 bg-orange-500/10 rounded-2xl flex items-center gap-5 border border-orange-500/20 text-center">
              <Wallet size={40} className="text-orange-400 shrink-0" />
              <div className="space-y-1 text-sm text-left">
                <p className="font-bold text-white">Direct Transfer Enabled</p>
                <p className="text-gray-400">Tokens will be delivered here after admin approval of your purchase.</p>
              </div>
            </div>
            <div className="flex gap-4 w-full pt-4">
              <button onClick={() => setStep(2)} className="flex-1 glass py-4 rounded-lg font-semibold">Back</button>
              <button 
                onClick={handleFinalSubmit} 
                className={`flex-[2] btn-primary py-4 flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Complete Enrollment'}
                {!loading && <CheckCircle2 size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CompanyRegister;
