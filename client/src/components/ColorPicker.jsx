import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({selectedColor, onChange }) => {
    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green", value: "#10B981" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Gray", value: "#6B7280" },
        { name: "Slate", value: "#1F2937" }
    ]

    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative'>
      <button 
        onClick={()=> setIsOpen(!isOpen)} 
        className='size-9 rounded-xl bg-white border border-slate-200/50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all active:scale-95 group relative'
      >
        <Palette size={16} />
      </button>

      {isOpen && (
        <div className='absolute top-full right-0 p-4 mt-3 z-[200] bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-[240px]'>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Accent Color</div>
            <div className='grid grid-cols-2 gap-2'>
                {colors.map((color)=>(
                    <button 
                      key={color.value} 
                      className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${selectedColor === color.value ? 'bg-slate-50 border-slate-200' : 'border-transparent hover:bg-slate-50'}`} 
                      onClick={()=> {onChange(color.value); setIsOpen(false)}}
                    >
                        <div className="size-6 rounded-full shadow-sm flex items-center justify-center shrink-0" style={{backgroundColor : color.value}}>
                           {selectedColor === color.value && (
                               <Check className="size-3 text-white drop-shadow-md"/>
                           )}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-tight transition-colors ${selectedColor === color.value ? 'text-slate-900' : 'text-slate-400'}`}>{color.name}</span>
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
