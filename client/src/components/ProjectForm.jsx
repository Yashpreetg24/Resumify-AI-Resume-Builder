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
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">Project Nodes</span>
        <button 
          onClick={addProject} 
          className='flex items-center gap-2 px-6 h-10 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20'
        >
            <Plus size={14}/>
            Add Node
        </button>
      </div>

      {data.length === 0 ? (
        <div className='glass-light border-dashed border-2 border-slate-200 rounded-[2rem] p-16 flex flex-col items-center text-center opacity-60'>
            <div className="size-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6">
               <FolderIcon size={32} strokeWidth={1} />
            </div>
            <p className='text-sm font-bold text-primary'>No projects found.</p>
            <p className="text-[10px] font-black text-secondary uppercase tracking-widest mt-2">Initialize your first project node.</p>
        </div>
      ): (
        <div className='space-y-6'>
            <AnimatePresence>
            {data.map((project, index)=>(
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
                          onClick={()=> removeProject(index)} 
                          className='size-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all'
                        >
                            <Trash2 size={16}/>
                        </button>
                    </div>

                    <div className='grid gap-6'>
                        <div className="space-y-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">
                              <Layout size={12} className="text-accent" />
                              Project Name
                           </label>
                           <input value={project.name || ""} onChange={(e)=>updateProject(index, "name", e.target.value)} type="text" placeholder="e.g. AI Portfolio System" className="w-full bg-white border border-slate-50 rounded-xl px-5 py-3.5 text-sm font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"/>
                        </div>

                        <div className="space-y-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">Type / Category</label>
                           <input value={project.type || ""} onChange={(e)=>updateProject(index, "type", e.target.value)} type="text" placeholder="e.g. Full-stack Web Application" className="w-full bg-slate-50/50 border border-slate-50 rounded-xl px-5 py-3 text-sm font-medium text-primary focus:bg-white outline-none transition-all"/>
                        </div>

                        <div className="space-y-2">
                           <label className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest pl-1">Contribution Details</label>
                           <textarea rows={5} value={project.description || ""} onChange={(e)=>updateProject(index, "description", e.target.value)} placeholder="Explain the project scope and your specific role..." className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-5 text-sm font-medium text-primary placeholder:text-slate-300 focus:bg-white focus:border-accent/20 outline-none transition-all resize-none leading-relaxed"/>
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
