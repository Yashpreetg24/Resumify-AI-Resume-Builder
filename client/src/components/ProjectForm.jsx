import { Plus, Trash2, FolderIcon, Layout } from 'lucide-react';
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectForm = ({ data, onChange }) => {
const addProject = () =>{
    const newProject = {
        name: "",
        type: "",
        description: "",
    };
    onChange([...data, newProject])
}

const removeProject = (index)=>{
    const updated = data.filter((_, i)=> i !== index);
    onChange(updated)
}

const updateProject = (index, field, value)=>{
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value}
    onChange(updated)
}

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={addProject} 
          className="flex items-center gap-2 px-6 h-11 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
        >
            <Plus size={14}/>
            Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="glass-light border-dashed border-2 border-slate-200 rounded-3xl p-12 flex flex-col items-center text-center opacity-60">
            <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
               <FolderIcon size={28} strokeWidth={1} />
            </div>
            <p className="text-sm font-bold text-primary">No projects added.</p>
            <p className="text-[9px] font-black text-secondary uppercase tracking-widest mt-1">Add your first project to begin.</p>
        </div>
      ): (
        <div className="space-y-4">
            <AnimatePresence>
            {data.map((project, index)=>(
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
                          onClick={()=> removeProject(index)} 
                          className="size-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        >
                            <Trash2 size={14}/>
                        </button>
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Layout size={11} className="text-accent" />
                              Project Name
                           </label>
                           <input value={project.name || ""} onChange={(e)=>updateProject(index, "name", e.target.value)} type="text" placeholder="e.g. AI Portfolio System" className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">Type / Category</label>
                           <input value={project.type || ""} onChange={(e)=>updateProject(index, "type", e.target.value)} type="text" placeholder="e.g. Full-stack Web Application" className="w-full bg-slate-50/30 border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary focus:bg-white outline-none transition-all"/>
                        </div>

                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">Contribution Details</label>
                           <textarea rows={4} value={project.description || ""} onChange={(e)=>updateProject(index, "description", e.target.value)} placeholder="Explain the project scope and your specific role..." className="w-full bg-slate-50/30 border border-slate-200/80 rounded-xl px-5 py-4 text-[13px] font-medium text-primary placeholder:text-slate-300 focus:bg-white focus:border-accent/20 outline-none transition-all resize-none leading-relaxed"/>
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

export default ProjectForm
