import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between mx-4 mt-4 rounded-2xl">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-veridian-teal p-2 rounded-lg group-hover:rotate-12 transition-transform">
          <Leaf className="text-white w-6 h-6" />
        </div>
        <span className="font-manrope font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-veridian-mist to-white">
          VERIDIAN
        </span>
      </Link>

      <div className="flex items-center gap-6">
        {!isAuthPage && (
          <>
            <Link to="/" className="hover:text-veridian-mist transition-colors font-medium">Platform</Link>
            <Link to="/login" className="flex items-center gap-2 btn-primary">
              <LogIn size={18} />
              Login
            </Link>
          </>
        )}
        {isAuthPage && (
          <Link to="/" className="text-veridian-mist hover:underline">Back to Home</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
