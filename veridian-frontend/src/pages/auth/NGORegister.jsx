import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, FileText, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const NGORegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    regId: '',
    website: '',
    location: '',
    walletAddress: '',
    password: '',
    email: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', 'ngo');
    data.append('walletAddress', formData.walletAddress);
    if (file) data.append('documents', file);

    const result = await authRegister(data);
    if (result.success) {
      navigate('/login', { state: { message: 'Registration successful! Please wait for admin approval.' } });
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
            <h2 className="text-3xl font-manrope font-extrabold tracking-tight">NGO Enrollment</h2>
            <p className="text-gray-400">Step {step} of 3: {step === 1 ? 'Account & Organization' : step === 2 ? 'Verification' : 'Security & Wallet'}</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">NGO Name</label>
                <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Green Mangrove Inc." className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Authorized Email</label>
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="contact@ngo.org" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Registration ID</label>
                <input name="regId" value={formData.regId} onChange={handleInputChange} type="text" placeholder="NGO-123456" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Official Website</label>
                <input name="website" value={formData.website} onChange={handleInputChange} type="url" placeholder="https://projects.org" className="input-field" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Headquarters Location</label>
              <input name="location" value={formData.location} onChange={handleInputChange} type="text" placeholder="Mumbai, India" className="input-field" />
            </div>
            <button onClick={handleNext} className="btn-primary py-4 mt-4">Continue to Verification</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-4 text-center">
              <div className="p-4 bg-veridian-teal/10 rounded-full">
                <FileText size={32} className="text-veridian-mist" />
              </div>
              <div>
                <h4 className="font-bold text-lg">{file ? file.name : 'Upload Registration Documents'}</h4>
                <p className="text-sm text-gray-400">{file ? `Size: ${(file.size / 1024).toFixed(2)} KB` : 'Upload PDF copy of your NGO certificate'}</p>
              </div>
              <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} accept=".pdf" />
              <label htmlFor="file-upload" className="px-6 py-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all font-semibold">
                {file ? 'Change File' : 'Select PDF'}
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Verification Note</label>
              <textarea placeholder="Briefly explain your primary focus in environmental conservation..." className="input-field min-h-[100px]" />
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
              <label className="text-sm font-medium text-gray-300 ml-1">Set Password</label>
              <input name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="••••••••" className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Wallet Address (MetaMask)</label>
              <input name="walletAddress" value={formData.walletAddress} onChange={handleInputChange} type="text" placeholder="0x..." className="input-field font-mono text-sm" />
            </div>
            <div className="p-6 bg-orange-500/10 rounded-2xl flex items-center gap-5 border border-orange-500/20">
              <Wallet size={40} className="text-orange-400 shrink-0" />
              <div className="space-y-1 text-sm">
                <p className="font-bold text-white">Blockchain Identity</p>
                <p className="text-gray-400">This address will receive verified carbon tokens. Ensure it's correct.</p>
              </div>
            </div>
            <div className="flex gap-4 w-full pt-4">
              <button onClick={() => setStep(2)} className="flex-1 glass py-4 rounded-lg font-semibold">Back</button>
              <button 
                onClick={handleFinalSubmit} 
                className={`flex-[2] btn-primary py-4 flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Submit Enrollment'}
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
