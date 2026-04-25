import React from 'react'
import { motion } from 'framer-motion'
import { Edit3, CheckCircle2, Layout, Download, Sparkle } from 'lucide-react'

const features = [
  {
    title: "Smart Templates",
    description: "Choose from dozens of recruiter-approved templates that auto-format based on your content length.",
    icon: Layout,
    color: "bg-purple-500"
  },
  {
    title: "Real-Time AI Suggestions",
    description: "Get intelligent wording and phrasing improvements as you type, tailored to your target role.",
    icon: Edit3,
    color: "bg-blue-500"
  },
  {
    title: "ATS Optimization",
    description: "Instantly see your ATS compatibility score and get actionable tips to pass automated screening.",
    icon: CheckCircle2,
    color: "bg-green-500"
  },
  {
    title: "Export Options",
    description: "Download your pixel-perfect resume in PDF or editable DOCX formats, ready to send.",
    icon: Download,
    color: "bg-slate-800"
  }
]

const ModernFeatures = () => {
  return (
    <section id="features" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center justify-center gap-3"
          >
            The Platform
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-primary tracking-tight mb-8"
          >
            Build your resume
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-secondary leading-relaxed"
          >
            Our streamlined process helps you create a professional resume in 
            minutes with intelligent AI-powered tools.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -12 }}
                className="relative group"
              >
                {/* Premium Glass Card Background */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[2.5rem] -z-10 border border-white/60 shadow-2xl shadow-slate-200/50 group-hover:shadow-accent/10 transition-all duration-500" />
                
                {/* Glowing Backdrop */}
                <div className={`absolute -top-6 -right-6 size-32 ${feature.color} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`} />
                
                <div className="p-10 flex flex-col h-full relative z-10">
                  <div className="relative mb-10 self-start">
                     <motion.div 
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        className={`size-16 rounded-[1.5rem] ${feature.color} text-white flex items-center justify-center relative z-10 shadow-xl shadow-black/5 transition-all duration-300`}
                     >
                       <feature.icon size={28} strokeWidth={1.5} />
                     </motion.div>
                     <div className={`absolute inset-0 ${feature.color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full`} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-primary mb-4 tracking-tighter leading-tight group-hover:text-accent transition-colors">
                     {feature.title}
                  </h3>
                  
                  <p className="text-secondary leading-relaxed text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                    {feature.description}
                  </p>

                  <div className="mt-8 pt-8 border-t border-slate-100/50 flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Premium Feature <Sparkle size={10} fill="currentColor" />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default ModernFeatures
