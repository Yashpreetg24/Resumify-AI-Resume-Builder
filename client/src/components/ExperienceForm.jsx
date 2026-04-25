import { Briefcase, Loader2, Plus, Zap, Trash2, Calendar, Building2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const ExperienceForm = ({ data, onChange }) => {
    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1)

const addExperience = () =>{
    const newExperience = {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false
    };
    onChange([...data, newExperience])
}

const removeExperience = (index)=>{
    const updated = data.filter((_, i)=> i !== index);
    onChange(updated)
}

const updateExperience = (index, field, value)=>{
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value}
    onChange(updated)
}

 const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`

    try {
        const { data } = await api.post('api/ai/enhance-job-desc', {userContent: prompt}, { headers: { Authorization: token } })
        updateExperience(index, "description", data.enhancedContent)
    } catch (error) {
        toast.error(error.message)
    }finally{
        setGeneratingIndex(-1)
    }
 }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={addExperience} 
          className="flex items-center gap-2 px-6 h-11 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
        >
            <Plus size={14}/>
            Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="glass-light border-dashed border-2 border-slate-200 rounded-3xl p-12 flex flex-col items-center text-center opacity-60">
            <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
               <Briefcase size={28} strokeWidth={1} />
            </div>
            <p className="text-sm font-bold text-primary">No work history added.</p>
            <p className="text-[9px] font-black text-secondary uppercase tracking-widest mt-1">Add your first role to begin.</p>
        </div>
      ): (
        <div className="space-y-4">
            <AnimatePresence>
            {data.map((experience, index)=>(
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative group"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-secondary font-black text-[11px]">
                           {index + 1}
                        </div>
                        <button 
                          onClick={()=> removeExperience(index)} 
                          className="size-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        >
                            <Trash2 size={14}/>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Building2 size={11} className="text-accent" />
                              Company
                           </label>
                           <input value={experience.company || ""} onChange={(e)=>updateExperience(index, "company", e.target.value)} type="text" placeholder="e.g. Google" className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Briefcase size={11} className="text-accent" />
                              Role
                           </label>
                           <input value={experience.position || ""} onChange={(e)=>updateExperience(index, "position", e.target.value)} type="text" placeholder="e.g. Lead Designer" className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Calendar size={11} className="text-accent" />
                              From
                           </label>
                           <input value={experience.start_date || ""} onChange={(e)=>updateExperience(index, "start_date", e.target.value)} type="month" className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Calendar size={11} className="text-accent" />
                              To
                           </label>
                           <input value={experience.end_date || ""} onChange={(e)=>updateExperience(index, "end_date", e.target.value)} type="month" disabled={experience.is_current} className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all disabled:opacity-30"/>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 pl-1">
                        <input 
                          type="checkbox" 
                          id={`current-${index}`}
                          checked={experience.is_current || false} 
                          onChange={(e)=>updateExperience(index, "is_current", e.target.checked)} 
                          className="size-4 rounded border-slate-200 text-primary focus:ring-primary/10"
                        />
                        <label htmlFor={`current-${index}`} className="text-[10px] font-black text-secondary uppercase tracking-widest cursor-pointer opacity-60">I currently work here</label>
                    </div>

                    <div className="space-y-3 mt-8">
                        <div className="flex justify-end">
                            <button 
                              onClick={()=> generateDescription(index)} 
                              disabled={generatingIndex === index || !experience.position || !experience.company} 
                              className="flex items-center gap-2 px-5 h-9 bg-primary text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10 disabled:opacity-30"
                            >
                                {generatingIndex === index ? <Loader2 size={12} className="animate-spin"/> : <Zap size={12}/>}
                                AI Enhance
                            </button>
                        </div>
                        <textarea value={experience.description || ""} onChange={(e)=> updateExperience(index, "description", e.target.value)} rows={4} className="w-full bg-slate-50/30 border border-slate-200/80 rounded-xl px-5 py-4 text-[13px] font-medium text-primary placeholder:text-slate-300 focus:bg-white focus:border-accent/20 outline-none transition-all resize-none leading-relaxed" placeholder="Summarize your impact and achievements..."/>
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
