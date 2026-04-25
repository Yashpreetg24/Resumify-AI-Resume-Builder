import React from 'react'
import { motion } from 'framer-motion'
import { Quote, CheckCircle2, Sparkle } from 'lucide-react'

const testimonials = [
  {
    name: "Emily Rodriguez",
    role: "@emily_design",
    image: "https://i.pravatar.cc/100?u=emily",
    quote: "The ATS scanner feature is a game-changer. It caught so many missing keywords that I wouldn't have thought to include. Export to PDF is flawless."
  },
  {
    name: "Mark T.",
    role: "@marktech",
    image: "https://i.pravatar.cc/100?u=mark",
    quote: "I've tried 4 other builders. This is the only one that didn't mess up my formatting when I had too many bullet points. The auto-spacing is magic."
  },
  {
    name: "Sarah Jenkins",
    role: "@sarahj_dev",
    image: "https://i.pravatar.cc/100?u=sarah",
    quote: "The AI suggestions completely transformed my summary section. I went from getting no callbacks to three interviews in one week. Highly recommend!"
  },
  {
    name: "David Chen",
    role: "@davidchen_pm",
    image: "https://i.pravatar.cc/100?u=david",
    quote: "As a Product Manager, I need a clean, structured resume. The templates here are exactly what recruiters are looking for. Worth every penny."
  }
]

const ModernTestimonials = () => {
  return (
    <section id="testimonials" className="py-32 mesh-gradient-light relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-primary tracking-tight mb-8"
          >
            Don't just take our words
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-secondary leading-relaxed"
          >
            Join thousands of professionals who landed their dream jobs using Resumify.
          </motion.p>
        </div>

        <div className="relative overflow-hidden py-10 -mx-6">
           {/* Fade Edges */}
           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

           <motion.div 
             className="flex gap-8 w-fit"
             animate={{ x: ["0%", "-50%"] }}
             transition={{
               duration: 40,
               ease: "linear",
               repeat: Infinity
             }}
           >
              {[...testimonials, ...testimonials].map((t, index) => (
                <div
                  key={index}
                  className="relative group w-[380px] shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50 rounded-[2.5rem] -z-10 border border-slate-200/60 group-hover:border-accent/30 transition-colors shadow-xl shadow-slate-200/20" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2.5rem] -z-20 transition-all group-hover:shadow-2xl group-hover:shadow-accent/5 group-hover:-translate-y-1" />
                  
                  <div className="p-9 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-4">
                          <div className="relative">
                             <img src={t.image} alt={t.name} className="size-14 rounded-2xl border-2 border-white shadow-xl object-cover" />
                             <div className="absolute -bottom-1 -right-1 size-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                                <CheckCircle2 size={10} fill="currentColor" />
                             </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-primary leading-none mb-1.5 tracking-tight">{t.name}</h4>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">{t.role}</span>
                               <span className="size-1 rounded-full bg-slate-300" />
                               <span className="text-[10px] text-accent font-black uppercase tracking-widest">Verified</span>
                            </div>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-1 mb-6">
                       {[1,2,3,4,5].map(star => (
                         <Sparkle key={star} size={12} fill="#fbbf24" className="text-amber-400" />
                       ))}
                    </div>

                    <div className="relative flex-1">
                       <Quote className="absolute -top-6 -left-6 size-12 text-accent/5 -z-0 rotate-12" />
                       <p className="text-[13px] text-secondary leading-relaxed relative z-10 font-medium italic">
                          "{t.quote}"
                       </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Resumify Impact</span>
                       <div className="flex gap-1">
                          <div className="size-1.5 rounded-full bg-accent" />
                          <div className="size-1.5 rounded-full bg-accent/40" />
                          <div className="size-1.5 rounded-full bg-accent/20" />
                       </div>
                    </div>
                  </div>
                </div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ModernTestimonials
