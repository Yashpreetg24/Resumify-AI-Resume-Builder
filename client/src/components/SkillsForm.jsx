import { Plus, X, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SkillsForm = ({ data, onChange }) => {
    const [newSkill, setNewSkill] = useState("")

     const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()])
            setNewSkill("")
        }
     }

      const removeSkill = (indexToRemove)=>{
        onChange(data.filter((_, index)=> index !== indexToRemove))
      }

      const handleKeyPress = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
      }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-lg">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{data.length} Skills</span>
        </div>
      </div>

      <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="e.g. Neural Networks, React.js" 
              className="flex-1 bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-[13px] font-medium text-primary shadow-sm focus:border-accent/20 outline-none transition-all"
              onChange={(e)=>setNewSkill(e.target.value)}
              value={newSkill}
              onKeyDown={handleKeyPress}
            />
            <button 
              onClick={addSkill} 
              disabled={!newSkill.trim()} 
              className="flex items-center gap-2 px-6 h-11 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20 disabled:opacity-30"
            >
                <Plus size={14}/> Add
            </button>
      </div>

      <div className="min-h-[100px] p-6 glass-light border-slate-200/80 rounded-3xl relative overflow-hidden">
        {data.length > 0 ? (
          <div className="flex flex-wrap gap-2 relative z-10">
              <AnimatePresence>
              {data.map((skill, index)=>(
                  <motion.span 
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/80 text-primary rounded-lg text-[11px] font-bold shadow-sm group hover:border-accent/30 transition-all"
                  >
                      {skill}
                      <button onClick={()=> removeSkill(index)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <X size={12} />
                      </button>
                  </motion.span>
              ))}
              </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center opacity-30">
              <Zap size={20} className="text-slate-300 mb-2"/>
              <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Skill Matrix Empty</p>
          </div>
        )}
      </div>

      <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-4">
         <div className="size-6 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
            <Zap size={12} />
         </div>
         <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-wider">
           Efficiency Tip: Aim for 8-12 high-impact skills. Prioritize technical proficiencies that match your target job description.
         </p>
      </div>
    </div>
  )
}

export default SkillsForm
