import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
import { ChevronLeft, Menu, X, Sparkle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector(state => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isBuilderPage = location.pathname.includes('/builder/');
  const isDashboard = location.pathname === '/app';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutUser = () => {
    const confirm = window.confirm('Are you sure you want to Log out?');
    if (confirm) {
      navigate('/');
      dispatch(logout());
    }
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQs', href: '#faqs' },
  ];

  if (isBuilderPage) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${isScrolled ? 'pt-2' : 'pt-6'}`}>
      <div className={`max-w-7xl mx-auto glass-light rounded-[2rem] px-8 py-3.5 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-lg border-white/20' : 'border-transparent shadow-none'}`}>
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          {(!isBuilderPage && location.pathname !== '/') && (
             <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-primary">
                <ChevronLeft size={20} />
             </button>
          )}
          {isDashboard ? (
             <div className="flex items-center gap-2 group cursor-default">
                <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-slate-900/20">
                   <Sparkle size={16} fill="currentColor" />
                </div>
                <div className="flex items-center gap-0">
                   <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-900 to-accent">Resumify</span>
                   <span className="text-xl font-black text-accent">.</span>
                </div>
             </div>
          ) : (
            <Link to="/" className="flex items-center gap-2 group">
               <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-slate-900/20">
                  <Sparkle size={16} fill="currentColor" />
               </div>
               <div className="flex items-center gap-0">
                  <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-900 to-accent">Resumify</span>
                  <span className="text-xl font-black text-accent">.</span>
               </div>
            </Link>
          )}
        </div>

        {/* Desktop Navigation */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-3">
               {!isDashboard && (
                 <button 
                  onClick={() => navigate('/app')}
                  className="hidden sm:block text-sm font-bold text-primary hover:text-accent transition-colors"
                 >
                   Dashboard
                 </button>
               )}
               <button 
                onClick={logoutUser} 
                className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
               >
                 Logout
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
               <Link to="/app?state=login" className="hidden sm:block text-sm font-bold text-primary hover:text-accent transition-colors">
                 Log in
               </Link>
               <Link 
                to="/app?state=register" 
                className="bg-primary text-white px-7 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25"
               >
                 Get started
               </Link>
            </div>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 glass-light rounded-3xl p-8 md:hidden shadow-2xl border border-white/40"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Sparkle size={120} fill="currentColor" />
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-primary"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-slate-100 my-2"></div>
              {!token && (
                <Link to="/app" className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-center">
                  Get started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
