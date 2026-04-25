import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkle, Target, Zap, MessageSquare, Plus, ShieldCheck, Briefcase, ChevronRight } from 'lucide-react';

const RotatingShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const layers = [
    {
      id: 'ats',
      title: 'ATS Intelligence',
      subtitle: 'Real-time scan results',
      icon: <Target size={20} />,
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-white/50 rounded-2xl border border-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-secondary uppercase">Score Analysis</span>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-full">92% Match</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '92%' }}
                className="h-full bg-gradient-to-r from-green-400 to-green-600" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-secondary uppercase px-1">Top Suggestions</p>
            {[
              { text: 'Add "Cross-functional Leadership"', color: 'text-indigo-500' },
              { text: 'Quantify impact in Revenue growth', color: 'text-green-500' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/40 rounded-xl border border-white/60">
                <div className="size-2 rounded-full bg-current" style={{ color: i === 0 ? '#6366f1' : '#22c55e' }} />
                <span className="text-[11px] font-semibold text-primary">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      style: { bg: 'bg-white/80 backdrop-blur-xl', text: 'text-primary' }
    },
    {
      id: 'resume',
      title: 'Modern Resume',
      subtitle: 'High-fidelity preview',
      icon: <Briefcase size={20} />,
      content: (
        <div className="space-y-6 relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 blur-3xl -z-10 rounded-full" />
           
           <div className="flex items-start justify-between relative">
              <div className="flex items-center gap-4">
                 <div className="size-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm p-0.5">
                    <img src="https://i.pravatar.cc/100?u=ethan" className="w-full h-full object-cover rounded-xl opacity-90" alt="avatar" />
                 </div>
                 <div className="space-y-2">
                    <div className="w-28 h-4.5 bg-primary/10 rounded-md" />
                    <div className="flex gap-2">
                       <div className="w-16 h-2 bg-slate-100 rounded-full" />
                       <div className="w-12 h-2 bg-slate-50 rounded-full" />
                    </div>
                 </div>
              </div>
              <div className="px-3 py-1 bg-gradient-to-br from-accent to-indigo-700 text-white rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg shadow-accent/20">
                 PRO
              </div>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="w-12 h-2.5 bg-slate-200/50 rounded-full" />
                 <div className="flex-1 h-[1px] bg-slate-100" />
              </div>
              <div className="space-y-2.5">
                 <div className="w-full h-2 bg-slate-50 rounded-full" />
                 <div className="w-[95%] h-2 bg-slate-50 rounded-full" />
                 <div className="w-[85%] h-2 bg-slate-50 rounded-full" />
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                 {['React', 'UI Design', 'Node.js'].map((s, i) => (
                    <div key={i} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-md text-[7px] font-bold text-secondary uppercase">
                       {s}
                    </div>
                 ))}
              </div>

              <div className="pt-4 space-y-4">
                 <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <div className="w-24 h-3 bg-slate-100 rounded" />
                    <div className="w-10 h-2 bg-slate-50 rounded" />
                 </div>
                 <div className="space-y-2">
                    <div className="w-full h-1.5 bg-slate-50/50 rounded-full" />
                    <div className="w-full h-1.5 bg-slate-50/50 rounded-full" />
                 </div>
              </div>
           </div>
        </div>
      ),
      style: { bg: 'bg-white', text: 'text-primary' }
    },
    {
      id: 'ai',
      title: 'AI Co-pilot',
      subtitle: 'Powering your growth',
      icon: <Sparkle size={20} fill="currentColor" />,
      content: (
        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-accent" />
              <span className="text-[12px] font-bold text-white">Optimize for FAANG</span>
            </div>
            <Plus size={16} className="text-white/20" />
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
            <MessageSquare size={16} className="text-accent" />
            <span className="text-[12px] font-bold text-white">Ask AI to rephrase</span>
          </div>
          <div className="p-4 bg-black/20 rounded-2xl border border-white/5 flex items-center gap-4">
             <div className="flex-1 text-[11px] text-white/60 italic">How can I help you?</div>
             <div className="size-8 rounded-lg bg-accent text-white flex items-center justify-center">
                <Sparkle size={14} />
             </div>
          </div>
        </div>
      ),
      style: { bg: 'bg-primary', text: 'text-white' }
    }
  ];

  return (
    <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center perspective-1000 scale-75 md:scale-90 lg:scale-100">
      {/* Decorative Glows */}
      <div className="absolute inset-0 -z-20 blur-[140px] opacity-40">
         <div className={`absolute top-0 right-0 size-80 rounded-full transition-colors duration-1000 ${activeIndex === 2 ? 'bg-indigo-600' : 'bg-purple-600'}`} />
         <div className={`absolute bottom-0 left-0 size-80 rounded-full transition-colors duration-1000 ${activeIndex === 0 ? 'bg-green-600' : 'bg-blue-600'}`} />
      </div>

      <div className="relative w-full h-full transform-style-3d">
        <AnimatePresence mode="popLayout">
          {layers.map((layer, index) => {
            // Determine position based on activeIndex
            const position = (index - activeIndex + 3) % 3;
            
            const variants = {
              0: { z: 120, x: 60, y: 80, scale: 1, opacity: 1, rotateY: 0, rotateX: 0 }, // Front
              1: { z: 0, x: 0, y: 0, scale: 0.95, opacity: 0.8, rotateY: 15, rotateX: -5 }, // Middle
              2: { z: -100, x: -60, y: -40, scale: 0.9, opacity: 0.4, rotateY: 30, rotateX: -10 }, // Back
            };

            return (
              <motion.div
                key={layer.id}
                initial={variants[2]}
                animate={variants[position]}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.8
                }}
                className={`absolute w-[85%] ${layer.style.bg} rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] p-8 border ${index === 2 ? 'border-white/10' : 'border-white/80'} overflow-hidden cursor-pointer group`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className={`text-lg font-extrabold ${layer.style.text} tracking-tighter`}>{layer.title}</h3>
                    <p className={`text-[10px] ${index === 2 ? 'text-white/40' : 'text-secondary'} font-medium uppercase tracking-widest`}>{layer.subtitle}</p>
                  </div>
                  <div className={`size-10 rounded-xl ${index === 2 ? 'bg-white/10 text-white' : 'bg-indigo-50 text-indigo-600'} flex items-center justify-center`}>
                    {layer.icon}
                  </div>
                </div>
                
                {layer.content}

                <div className={`absolute bottom-4 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${layer.style.text}`}>
                   <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
                   <ChevronRight size={12} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
         {layers.map((_, i) => (
           <button 
             key={i}
             onClick={() => setActiveIndex(i)}
             className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-primary' : 'w-2 bg-slate-300'}`}
           />
         ))}
      </div>
    </div>
  );
};

export default RotatingShowcase;
