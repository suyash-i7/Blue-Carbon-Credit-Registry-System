import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Globe, ArrowRight, Zap, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center pt-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-veridian-mist text-sm font-semibold"
        >
          <Zap size={16} />
          Blockchain Powered Carbon Credits
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-manrope font-extrabold leading-tight tracking-tight"
        >
          Transparent <br />
          <span className="text-gradient">Blue Carbon</span> Registry
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-xl text-gray-400 font-inter"
        >
          Veridian is the next generation registry for Blue Carbon Credits, leveraging blockchain for immutable tracking, smart contract-based expiry, and real-world impact.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mt-8"
        >
          <Link to="/login" className="btn-primary py-4 px-10 flex items-center gap-2 text-lg">
            Get Started
            <ArrowRight size={20} />
          </Link>
          <button className="glass py-4 px-10 rounded-lg font-semibold hover:bg-white/5 transition-all text-lg">
            View Projects
          </button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Droplets className="text-blue-400" />, label: 'CO2 Captured', value: '12.4M Tons' },
          { icon: <Shield className="text-green-400" />, label: 'Verified Projects', value: '840+' },
          { icon: <Globe className="text-teal-400" />, label: 'Global Reach', value: '42 Countries' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-3xl flex flex-col items-center gap-4 text-center"
          >
            <div className="p-4 bg-white/5 rounded-2xl">
              {React.cloneElement(stat.icon, { size: 32 })}
            </div>
            <h3 className="text-4xl font-manrope font-bold">{stat.value}</h3>
            <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Roles Section */}
      <section className="flex flex-col gap-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-manrope font-bold">Choose Your Role</h2>
          <p className="text-gray-400">Join the ecosystem as an NGO, Company, or Public Auditor.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RoleCard 
            title="NGO / Project Developer" 
            desc="Register your blue carbon projects, submit MRV data, and receive carbon tokens for your ecosystem restoration efforts."
            link="/register/ngo"
            color="border-green-500/30"
          />
          <RoleCard 
            title="Registry Admin" 
            desc="Verify project submissions, manage carbon token minting, and ensure compliance with international carbon standards."
            link="/login"
            color="border-blue-500/30"
          />
          <RoleCard 
            title="Enterprise Client" 
            desc="Purchase verified carbon credits to offset your corporate emissions and track impact with 90-day expiry assurance."
            link="/register/company"
            color="border-teal-500/30"
          />
        </div>
      </section>
    </div>
  );
};

const RoleCard = ({ title, desc, link, color }) => (
  <Link to={link} className={`glass p-8 rounded-3xl group hover:bg-white/5 transition-all flex flex-col gap-6 border-b-4 ${color}`}>
    <h3 className="text-2xl font-bold font-manrope group-hover:text-veridian-mist transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
    <div className="mt-auto flex items-center gap-2 text-veridian-mist font-semibold">
      Register Now <ArrowRight size={18} />
    </div>
  </Link>
);

export default LandingPage;
