import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "What makes Resumify different?",
    answer: "Unlike traditional builders, Resumify combines professional design with real-time AI suggestions and built-in ATS optimization. We don't just help you format; we help you write content that actually lands interviews."
  },
  {
    question: "How does AI assistance work?",
    answer: "Our AI analyzes your career stage and target industry to suggest action-oriented bullet points, professional summaries, and skill keywords that match what recruiters are looking for."
  },
  {
    question: "Can I download my resume for free?",
    answer: "Yes! We offer a free tier that allows you to create and download a basic professional resume. Premium features like advanced AI analysis and exclusive templates are available on our pro plan."
  },
  {
    question: "Are templates ATS-friendly?",
    top: true,
    answer: "Every single template in our library is rigorously tested with major ATS platforms (Workday, Greenhouse, Lever) to ensure 100% readability and correct data parsing."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard AES-256 encryption for all data storage. Your personal information is private and is never shared with third parties without your explicit consent."
  },
  {
    question: "Can I create multiple resumes?",
    answer: "Yes, you can create and manage multiple versions of your resume tailored to different job applications from your central Command Center."
  }
]

const ModernFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faqs" className="py-24 bg-white relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-primary tracking-tight mb-6"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base text-secondary leading-relaxed"
          >
            Commonly asked questions about Resumify
          </motion.p>
        </div>

        <div className="space-y-3">
           {faqs.map((faq, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.05 }}
               className={`border border-slate-100 rounded-2xl transition-all duration-300 ${activeIndex === index ? 'bg-slate-50/30 shadow-sm border-slate-200' : 'hover:border-slate-200'}`}
             >
               <button
                 onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                 className="w-full flex items-center justify-between px-6 py-5 text-left"
               >
                 <div className="flex items-center gap-4">
                    <div className="size-1.5 bg-primary rounded-full" />
                    <span className="text-xs font-black text-primary uppercase tracking-widest">{faq.question}</span>
                 </div>
                 <ChevronDown 
                   size={16} 
                   className={`text-secondary transition-transform duration-500 ${activeIndex === index ? 'rotate-180' : ''}`} 
                 />
               </button>
               <AnimatePresence>
                 {activeIndex === index && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     className="overflow-hidden"
                   >
                     <div className="px-6 pb-6 pt-1 text-secondary leading-relaxed text-[13px] ml-5">
                       {faq.answer}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}

export default ModernFAQ
