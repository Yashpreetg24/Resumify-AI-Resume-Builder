import { Loader2, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {
  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {headers: { Authorization: token }})
      setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-end'>
        <button 
          disabled={isGenerating} 
          onClick={generateSummary} 
          className='flex items-center gap-3 px-8 h-12 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50'
        >
          {isGenerating ? <Loader2 className="size-4 animate-spin"/> : <Zap className="size-4"/>}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="relative group">
        <textarea 
          value={data || ""} 
          onChange={(e)=> onChange(e.target.value)} 
          rows={8} 
          className="w-full bg-white border border-slate-200/80 rounded-[2rem] px-8 py-8 text-sm font-medium text-primary placeholder:text-slate-300 focus:border-accent/30 focus:ring-4 focus:ring-accent/5 outline-none transition-all shadow-sm resize-none leading-relaxed"
          placeholder='Describe your professional journey, key achievements, and the value you bring to a potential employer...' 
        />
        <div className="absolute bottom-6 right-8 text-[10px] font-black text-secondary opacity-20 uppercase tracking-widest pointer-events-none">
          {data?.length || 0} / 1000
        </div>
      </div>
      
      <div className="p-6 bg-accent/5 border border-accent/10 rounded-2xl flex items-start gap-4">
         <div className="size-6 bg-accent/20 rounded-lg flex items-center justify-center text-accent shrink-0">
            <Zap size={12} />
         </div>
         <p className='text-[11px] text-accent/80 font-bold leading-relaxed uppercase tracking-wider'>
           Pro-tip: Focus on quantifiable results and use strong action verbs. Keep it between 3-4 sentences for maximum impact.
         </p>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
