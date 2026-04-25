import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkle } from 'lucide-react'
import { Link } from 'react-router-dom'

const ModernCTA = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#101828] p-12 md:p-20 rounded-[2.5rem] text-center overflow-hidden border border-white/5 shadow-2xl shadow-black/20"
        >
          {/* High-Fidelity Background Glows */}
          <div className="absolute top-0 right-0 size-[500px] bg-accent/20 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 left-0 size-[500px] bg-brand-purple/10 blur-[120px] translate-y-1/2 -translate-x-1/2 rounded-full" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="size-16 rounded-2xl border border-white/10 flex items-center justify-center relative bg-white/5 shadow-2xl mb-8 backdrop-blur-xl rotate-12"
            >
               <Sparkle size={24} className="text-white" fill="currentColor" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-tight">
              Ready to land your <br />
              <span className="text-accent italic">dream job?</span>
            </h2>
            
            <div className="flex justify-center w-full">
              <Link 
                to="/app?state=register" 
                className="group px-10 py-4 bg-accent text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:bg-accent/90 active:scale-95 flex items-center gap-3 shadow-xl shadow-accent/20"
              >
                Get Started Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ModernCTA
