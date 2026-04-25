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
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">Academic Nodes</span>
        <button 
          onClick={addEducation} 
          className='flex items-center gap-2 px-6 h-10 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20'
        >
            <Plus size={14}/>
            Add Node
        </button>
      </div>

      {data.length === 0 ? (
        <div className='glass-light border-dashed border-2 border-slate-200 rounded-[2rem] p-16 flex flex-col items-center text-center opacity-60'>
            <div className="size-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6">
               <GraduationCap size={32} strokeWidth={1} />
            </div>
            <p className='text-sm font-bold text-primary'>No academic history found.</p>
            <p className="text-[10px] font-black text-secondary uppercase tracking-widest mt-2">Initialize your first education node.</p>
        </div>
      ): (
        <div className='space-y-6'>
            <AnimatePresence>
            {data.map((education, index)=>(
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm relative group"
                >
                    <div className='flex justify-between items-center mb-8'>
                        <div className="flex items-center gap-4">
                           <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-secondary font-black text-xs">
                              {index + 1}
                           </div>
                           <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Node_{index + 1}</h4>
                        </div>
                        <button 
                          onClick={()=> removeEducation(index)} 
                          className='size-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all'
                        >
                            <Trash2 size={16}/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className="space-y-2 md:col-span-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">
                              <School size={12} className="text-accent" />
                              Institution
                           </label>
                           <input value={education.institution || ""} onChange={(e)=>updateEducation(index, "institution", e.target.value)} type="text" placeholder="e.g. Stanford University" className="w-full bg-white border border-slate-50 rounded-xl px-5 py-3.5 text-sm font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">
                              <GraduationCap size={12} className="text-accent" />
                              Degree
                           </label>
                           <input value={education.degree || ""} onChange={(e)=>updateEducation(index, "degree", e.target.value)} type="text" placeholder="e.g. Bachelor of Science" className="w-full bg-white border border-slate-50 rounded-xl px-5 py-3.5 text-sm font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Calendar size={12} className="text-accent" />
                              Graduation
                           </label>
                           <input value={education.graduation_date || ""} onChange={(e)=>updateEducation(index, "graduation_date", e.target.value)} type="month" className="w-full bg-white border border-slate-50 rounded-xl px-5 py-3.5 text-sm font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-50 grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">Field of Study</label>
                           <input value={education.field || ""} onChange={(e)=>updateEducation(index, "field", e.target.value)} type="text" className="w-full bg-slate-50/50 border border-slate-50 rounded-xl px-5 py-3 text-sm font-medium text-primary focus:bg-white outline-none transition-all" placeholder="e.g. Computer Science"/>
                        </div>
                        <div className="space-y-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">GPA (Score)</label>
                           <input value={education.gpa || ""} onChange={(e)=>updateEducation(index, "gpa", e.target.value)} type="text" className="w-full bg-slate-50/50 border border-slate-50 rounded-xl px-5 py-3 text-sm font-medium text-primary focus:bg-white outline-none transition-all" placeholder="e.g. 3.9 / 4.0"/>
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
