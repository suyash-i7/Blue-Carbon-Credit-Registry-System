import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, FileText, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const NGORegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    regId: '',
    website: '',
    location: '',
    password: '',
    confirmPassword: '',
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', 'ngo');
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
            <h2 className="text-3xl font-manrope font-extrabold tracking-tight text-gray-900">NGO Enrollment</h2>
            <p className="text-gray-500">Step {step} of 3: {step === 1 ? 'Account & Organization' : step === 2 ? 'Verification Documents' : 'Security & Access'}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 w-8 rounded-full transition-all ${step >= s ? 'bg-[#0F766E]' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">NGO Name</label>
                <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Green Mangrove Foundation" className="input-field" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Authorized Email</label>
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="contact@ngo.org" className="input-field" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Registration ID</label>
                <input name="regId" value={formData.regId} onChange={handleInputChange} type="text" placeholder="NGO-123456" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Official Website</label>
                <input name="website" value={formData.website} onChange={handleInputChange} type="url" placeholder="https://greenmangrove.org" className="input-field" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Headquarters Location</label>
              <input name="location" value={formData.location} onChange={handleInputChange} type="text" placeholder="Mumbai, India" className="input-field" />
            </div>
            <button 
              onClick={() => {
                if (!formData.name || !formData.email) {
                  setError('Please fill in required fields.');
                  return;
                }
                setError('');
                handleNext();
              }} 
              className="btn-primary py-4 mt-4"
            >
              Continue to Verification
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="p-8 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center gap-4 text-center bg-gray-50">
              <div className="p-4 bg-[#E7F3F2] rounded-full">
                <FileText size={32} className="text-[#0F766E]" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">{file ? file.name : 'Upload Registration Certificate'}</h4>
                <p className="text-sm text-gray-500">{file ? `Size: ${(file.size / 1024).toFixed(2)} KB` : 'Upload PDF copy of government/tax registration certificate'}</p>
              </div>
              <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} accept=".pdf" />
              <label htmlFor="file-upload" className="px-6 py-2.5 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition-all font-semibold text-gray-700 shadow-sm">
                {file ? 'Change File' : 'Select PDF Document'}
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Focus & Objectives</label>
              <textarea placeholder="Briefly describe your primary focus in blue carbon and coastal ecosystem conservation..." className="input-field min-h-[100px]" />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 p-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-gray-700">Back</button>
              <button onClick={handleNext} className="flex-[2] btn-primary py-4">Next: Account Security</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Create Password</label>
              <input name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="••••••••" className="input-field" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
              <input name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} type="password" placeholder="••••••••" className="input-field" required />
            </div>
            
            <div className="p-6 bg-teal-50 rounded-2xl flex items-center gap-5 border border-teal-200">
              <ShieldCheck size={40} className="text-[#0F766E] shrink-0" />
              <div className="space-y-1 text-sm">
                <p className="font-bold text-gray-900">Official Registry Account</p>
                <p className="text-gray-600">Once approved by registry administrators, your organization can submit projects and receive verified carbon credits directly to your account.</p>
              </div>
            </div>
            
            <div className="flex gap-4 w-full pt-4">
              <button onClick={() => setStep(2)} className="flex-1 p-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-gray-700">Back</button>
              <button 
                onClick={handleFinalSubmit} 
                className={`flex-[2] btn-primary py-4 flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Enrollment'}
                {!loading && <CheckCircle2 size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NGORegister;
