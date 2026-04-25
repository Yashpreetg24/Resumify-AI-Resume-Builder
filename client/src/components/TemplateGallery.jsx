import React from 'react'
import { X, Check, Palette, Sparkles, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TemplateGallery = ({ isOpen, onClose, onSelect, onConfirm, selectedTemplate, selectedColor }) => {
  if (!isOpen) return null

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout',
      preview: (color) => (
        <div className="w-full h-full bg-white p-3 flex flex-col gap-1.5 border border-slate-100 rounded-lg shadow-sm">
          <div className="h-5 w-1/3 self-center border-b-2" style={{ borderColor: color }}></div>
          <div className="flex justify-center gap-1.5 mt-1">
             <div className="h-1 w-5 bg-slate-100 rounded-full"></div>
             <div className="h-1 w-5 bg-slate-100 rounded-full"></div>
          </div>
          <div className="mt-3 h-2.5 w-1/4 bg-slate-200 rounded-sm" style={{ opacity: 0.6 }}></div>
          <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
          <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
          <div className="mt-3 h-2.5 w-1/4 bg-slate-200 rounded-sm" style={{ opacity: 0.6 }}></div>
          <div className="flex gap-2.5 mt-1">
            <div className="w-1 h-10 rounded-full" style={{ backgroundColor: color }}></div>
            <div className="flex-1 space-y-2">
              <div className="h-2 w-1/2 bg-slate-200 rounded-full"></div>
              <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
              <div className="h-1.5 w-2/3 bg-slate-50 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Bold header & contemporary',
      preview: (color) => (
        <div className="w-full h-full bg-white border border-slate-100 rounded-lg overflow-hidden shadow-sm">
          <div className="h-12 w-full p-3 flex flex-col gap-1.5" style={{ backgroundColor: color }}>
            <div className="h-2.5 w-1/2 bg-white/40 rounded-full"></div>
            <div className="h-1.5 w-1/3 bg-white/20 rounded-full"></div>
          </div>
          <div className="p-3 space-y-2.5">
            <div className="h-2.5 w-1/4 border-b-2 border-slate-100"></div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
            <div className="h-1.5 w-2/3 bg-slate-50 rounded-full"></div>
            <div className="h-2.5 w-1/4 border-b-2 border-slate-100 mt-2"></div>
            <div className="flex gap-2.5">
               <div className="w-1 h-8 bg-slate-100 rounded-full"></div>
               <div className="flex-1 space-y-2">
                 <div className="h-2 w-1/3 bg-slate-200 rounded-full"></div>
                 <div className="h-1.5 w-2/3 bg-slate-50 rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Elegant type & spacing',
      preview: (color) => (
        <div className="w-full h-full bg-white p-4 flex flex-col gap-2.5 border border-slate-100 rounded-lg shadow-sm">
          <div className="h-4 w-1/2 bg-slate-200 rounded-full mt-2"></div>
          <div className="flex gap-2">
             <div className="h-1.5 w-6 bg-slate-100 rounded-full"></div>
             <div className="h-1.5 w-6 bg-slate-100 rounded-full"></div>
          </div>
          <div className="h-0.5 w-full bg-slate-50 my-2"></div>
          <div className="space-y-2">
            <div className="h-2.5 w-1/4 rounded-full" style={{ backgroundColor: color, opacity: 0.2 }}></div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
            <div className="h-1.5 w-4/5 bg-slate-50 rounded-full"></div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="h-2.5 w-1/4 rounded-full" style={{ backgroundColor: color, opacity: 0.2 }}></div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
            <div className="h-1.5 w-2/3 bg-slate-50 rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal-image',
      name: 'Executive',
      description: 'Sleek with profile picture',
      preview: (color) => (
        <div className="w-full h-full bg-white border border-slate-100 rounded-lg overflow-hidden shadow-sm flex pt-3">
          <div className="w-14 flex flex-col items-center gap-3 px-1.5">
            <div className="w-10 h-10 rounded-full border-2 border-slate-100 bg-slate-50 flex items-center justify-center p-0.5">
               <div className="w-full h-full rounded-full bg-slate-200"></div>
            </div>
            <div className="w-full h-0.5 bg-slate-50"></div>
            <div className="space-y-1.5 w-full px-1">
                <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1 p-3 space-y-3 border-l border-slate-50">
            <div className="h-4 w-3/4 bg-slate-200 rounded-full"></div>
            <div className="h-2 w-1/2 bg-slate-100 rounded-full"></div>
            <div className="mt-3 h-2.5 w-1/4 rounded-full" style={{ backgroundColor: color, opacity: 0.3 }}></div>
            <div className="space-y-2">
               <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
               <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
               <div className="h-1.5 w-4/5 bg-slate-50 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const accentColors = [
    { name: "Resumify Blue", value: "#3B82F6" },
    { name: "Indigo Night", value: "#6366F1" },
    { name: "Royal Purple", value: "#8B5CF6" },
    { name: "Emerald", value: "#10B981" },
    { name: "Crimson", value: "#EF4444" },
    { name: "Deep Orange", value: "#F97316" },
    { name: "Ocean Teal", value: "#14B8A6" },
    { name: "Slate", value: "#475569" },
    { name: "Onyx", value: "#1F2937" }
  ]

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white/95 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/20"
        >
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-10 py-8 no-scrollbar relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="group flex flex-col">
                  {/* Template Card */}
                  <div 
                    className={`relative aspect-[3/4] rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden
                      ${selectedTemplate === template.id 
                        ? 'border-accent ring-8 ring-accent/5 shadow-2xl shadow-accent/20 scale-[1.02]' 
                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:shadow-xl hover:scale-[1.02]'
                      }`}
                    onClick={() => onSelect(template.id, selectedColor)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-5 group-hover:bg-accent/[0.02] transition-colors">
                      {template.preview(selectedColor)}
                    </div>
                    
                    {/* Selection Glow Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent transition-opacity duration-500 ${selectedTemplate === template.id ? 'opacity-100' : 'opacity-0'}`} />

                    {/* Checkmark Icon */}
                    {selectedTemplate === template.id && (
                      <div className="absolute top-4 right-4 z-10 animate-in zoom-in spin-in-12 duration-500">
                        <div className="bg-accent text-white size-8 rounded-full shadow-lg flex items-center justify-center">
                          <Check size={18} strokeWidth={4} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="mt-5 px-1">
                    <h3 className={`text-base font-black transition-colors ${selectedTemplate === template.id ? 'text-accent' : 'text-primary'}`}>
                      {template.name}
                    </h3>
                    <p className="text-[10px] text-secondary opacity-60 font-bold uppercase tracking-wider mt-0.5">{template.description}</p>
                    
                    {/* Color Swatches */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {accentColors.slice(0, 5).map((color) => (
                        <button
                          key={color.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(template.id, color.value);
                          }}
                          className={`size-4 rounded-full border-2 transition-all duration-300 hover:scale-125
                            ${selectedColor === color.value && selectedTemplate === template.id 
                              ? 'ring-2 ring-offset-2 ring-accent border-white shadow-md' 
                              : 'border-white shadow-sm hover:border-slate-200'}`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                      <div className="size-4 rounded-full border border-slate-100 bg-white flex items-center justify-center shadow-sm">
                         <Palette size={8} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 pb-10 pt-4 flex justify-end relative z-10">
              <button 
                  onClick={onConfirm}
                  className="px-12 py-4 bg-primary text-white rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3 group"
              >
                  Confirm Style
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TemplateGallery
