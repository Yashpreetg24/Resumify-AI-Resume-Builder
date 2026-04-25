import { GraduationCap, Plus, Trash2, Calendar, School } from 'lucide-react';
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EducationForm = ({ data, onChange }) => {
const addEducation = () =>{
    const newEducation = {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "",
        gpa: ""
    };
    onChange([...data, newEducation])
}

const removeEducation = (index)=>{
    const updated = data.filter((_, i)=> i !== index);
    onChange(updated)
}

const updateEducation = (index, field, value)=>{
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value}
    onChange(updated)
}

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={addEducation} 
          className="flex items-center gap-2 px-6 h-11 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
        >
            <Plus size={14}/>
            Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="glass-light border-dashed border-2 border-slate-200 rounded-3xl p-12 flex flex-col items-center text-center opacity-60">
            <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
               <GraduationCap size={28} strokeWidth={1} />
            </div>
            <p className="text-sm font-bold text-primary">No academic history added.</p>
            <p className="text-[9px] font-black text-secondary uppercase tracking-widest mt-1">Add your first degree to begin.</p>
        </div>
      ): (
        <div className="space-y-4">
            <AnimatePresence>
            {data.map((education, index)=>(
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
                          onClick={()=> removeEducation(index)} 
                          className="size-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        >
                            <Trash2 size={14}/>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 md:col-span-2">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <School size={11} className="text-accent" />
                              Institution
                           </label>
                           <input value={education.institution || ""} onChange={(e)=>updateEducation(index, "institution", e.target.value)} type="text" placeholder="e.g. Stanford University" className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <GraduationCap size={11} className="text-accent" />
                              Degree
                           </label>
                           <input value={education.degree || ""} onChange={(e)=>updateEducation(index, "degree", e.target.value)} type="text" placeholder="e.g. Bachelor of Science" className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Calendar size={11} className="text-accent" />
                              Graduation
                           </label>
                           <input value={education.graduation_date || ""} onChange={(e)=>updateEducation(index, "graduation_date", e.target.value)} type="month" className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">Field of Study</label>
                           <input value={education.field || ""} onChange={(e)=>updateEducation(index, "field", e.target.value)} type="text" className="w-full bg-slate-50/30 border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary focus:bg-white outline-none transition-all" placeholder="e.g. Computer Science"/>
                        </div>
                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">GPA (Score)</label>
                           <input value={education.gpa || ""} onChange={(e)=>updateEducation(index, "gpa", e.target.value)} type="text" className="w-full bg-slate-50/30 border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary focus:bg-white outline-none transition-all" placeholder="e.g. 3.9 / 4.0"/>
                        </div>
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default EducationForm
