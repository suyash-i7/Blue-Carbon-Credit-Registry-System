import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, MapPin, Ruler, Wind, ChevronRight, UploadCloud, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubmitProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    area: '',
    description: '',
    ecosystemType: 'Mangrove'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/ngo/projects', {
        name: formData.name,
        location: formData.location,
        area: Number(formData.area),
        description: formData.description
      });
      navigate('/ngo/dashboard');
    } catch (err) {
      setError('Failed to submit project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-manrope font-extrabold">New Carbon Project</h1>
        <p className="text-gray-400">Submit your blue carbon ecosystem for registry verification.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="glass rounded-3xl p-10 flex flex-col gap-10">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map(i => (
            <React.Fragment key={i}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= i ? 'bg-veridian-teal text-white shadow-lg shadow-veridian-teal/20' : 'bg-white/5 text-gray-400'}`}>
                {i}
              </div>
              {i < 3 && <div className={`flex-1 h-1 rounded-full ${step > i ? 'bg-veridian-teal' : 'bg-white/5'}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <TreePine size={16} className="text-veridian-mist" />
                  Project Name
                </label>
                <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Coastal Mangrove A1" className="input-field" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <MapPin size={16} className="text-veridian-mist" />
                  Geographic Location
                </label>
                <input name="location" value={formData.location} onChange={handleInputChange} type="text" placeholder="Lat: 19.076, Long: 72.877" className="input-field" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <Ruler size={16} className="text-veridian-mist" />
                  Total Area (Hectares)
                </label>
                <input name="area" value={formData.area} onChange={handleInputChange} type="number" placeholder="45" className="input-field" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <Wind size={16} className="text-veridian-mist" />
                  Carbon Capture Est. (T/yr)
                </label>
                <input type="number" placeholder="120" className="input-field" disabled={true} value={formData.area ? formData.area * 10 : ''} />
                <p className="text-[10px] text-gray-500">Calculated automatically on approval.</p>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary py-4 mt-4 flex items-center justify-center gap-2 text-lg">
              Next: Ecosystem Details
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-400 uppercase">Ecosystem Type</label>
              <div className="grid grid-cols-3 gap-4">
                {['Mangrove', 'Seagrass', 'Wetland'].map(type => (
                  <button 
                    key={type} 
                    onClick={() => setFormData({...formData, ecosystemType: type})}
                    className={`glass py-4 rounded-xl border transition-all font-bold ${formData.ecosystemType === type ? 'border-veridian-mist text-veridian-mist shadow-lg shadow-veridian-mist/10' : 'border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-400 uppercase">Description & Objectives</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Outline the restoration goals and ecological significance..." 
                className="input-field min-h-[150px]" 
              />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 glass py-4 rounded-xl font-bold">Back</button>
              <button onClick={() => setStep(3)} className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2">
                Next: Document Submission
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8">
            <div className="p-12 border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center gap-4 text-center hover:border-veridian-mist hover:bg-veridian-teal/5 transition-all cursor-pointer">
              <UploadCloud size={64} className="text-gray-500" />
              <div>
                <h4 className="text-2xl font-bold">Upload MRV Bundle</h4>
                <p className="text-gray-400">Drag and drop your project photos, GIS data, and ecological reports.</p>
              </div>
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold mt-4">Browse Files</button>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 glass py-4 rounded-xl font-bold">Back</button>
              <button 
                onClick={handleFinalSubmit} 
                className={`flex-[2] btn-primary py-4 font-bold flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Project to Registry'}
                {!loading && <CheckCircle2 size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubmitProject;
