import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Sparkle } from 'lucide-react'
import { Link } from 'react-router-dom'
import RotatingShowcase from './RotatingShowcase'

const ModernHero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient-light bg-grid-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left lg:block flex flex-col items-center text-center lg:items-start">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-accent text-[10px] font-black uppercase tracking-widest mb-10"
            >
              <span className="flex size-1.5 rounded-full bg-accent animate-pulse"></span>
              New: AI Real-time Feedback
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-8"
            >
              Land your dream job <br />
              <span className="text-secondary opacity-40">with AI-powered</span> <br />
              <span className="text-gradient-modern">resumes.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-base text-secondary leading-relaxed mb-12"
            >
              Create, edit and download professional resumes with intelligent assistance 
              that helps you pass ATS systems and stand out to recruiters.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link 
                to="/app?state=register" 
                className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Started Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 flex flex-col items-start gap-6 lg:items-start items-center"
            >
               <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img 
                      key={i} 
                      src={`https://i.pravatar.cc/100?u=${i}`} 
                      className="size-12 rounded-full border-4 border-white shadow-lg shadow-black/5" 
                      alt="user" 
                    />
                  ))}
                  <div className="size-12 rounded-full border-4 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-lg shadow-black/5">
                    +2k
                  </div>
               </div>
               <div className="flex flex-col items-start gap-1 lg:items-start items-center">
                  <div className="flex items-center gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Trusted by 2,000+ professionals</p>
               </div>
            </motion.div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
             <RotatingShowcase />
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-40">
         <div className="absolute top-0 right-1/4 size-[500px] bg-accent/20 blur-[120px] rounded-full animate-float" />
         <div className="absolute bottom-0 left-1/4 size-[500px] bg-brand-blue/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
         <div className="absolute top-1/4 left-1/4 size-[300px] bg-brand-purple/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  )
}

export default ModernHero
