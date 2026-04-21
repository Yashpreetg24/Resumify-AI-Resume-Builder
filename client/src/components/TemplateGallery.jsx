import React from 'react'
import { X, Check, Palette } from 'lucide-react'

const TemplateGallery = ({ isOpen, onClose, onSelect, onConfirm, selectedTemplate, selectedColor }) => {
  if (!isOpen) return null

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Clean, traditional professional layout',
      preview: (color) => (
        <div className="w-full h-full bg-white p-2 flex flex-col gap-1 border border-gray-100 rounded shadow-sm">
          <div className="h-4 w-1/3 self-center border-b-2" style={{ borderColor: color }}></div>
          <div className="flex justify-center gap-1">
             <div className="h-1 w-4 bg-gray-200"></div>
             <div className="h-1 w-4 bg-gray-200"></div>
          </div>
          <div className="mt-2 h-2 w-1/4 bg-gray-300" style={{ color: color }}></div>
          <div className="h-1 w-full bg-gray-100"></div>
          <div className="h-1 w-full bg-gray-100"></div>
          <div className="mt-2 h-2 w-1/4 bg-gray-300" style={{ color: color }}></div>
          <div className="flex gap-2">
            <div className="w-1 h-8" style={{ borderLeft: `2px solid ${color}` }}></div>
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-1/2 bg-gray-200"></div>
              <div className="h-1 w-full bg-gray-100"></div>
              <div className="h-1 w-2/3 bg-gray-100"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Bold header with contemporary design',
      preview: (color) => (
        <div className="w-full h-full bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
          <div className="h-10 w-full p-2 flex flex-col gap-1" style={{ backgroundColor: color }}>
            <div className="h-2 w-1/2 bg-white/40"></div>
            <div className="h-1 w-1/3 bg-white/20"></div>
          </div>
          <div className="p-2 space-y-2">
            <div className="h-2 w-1/4 border-b border-gray-200"></div>
            <div className="h-1 w-full bg-gray-100"></div>
            <div className="h-1 w-full bg-gray-100"></div>
            <div className="h-1 w-2/3 bg-gray-100"></div>
            <div className="h-2 w-1/4 border-b border-gray-200"></div>
            <div className="flex gap-2">
               <div className="w-0.5 h-6 bg-gray-200"></div>
               <div className="flex-1 space-y-1">
                 <div className="h-1.5 w-1/3 bg-gray-200"></div>
                 <div className="h-1 w-2/3 bg-gray-100"></div>
               </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Elegant typography and spacing',
      preview: (color) => (
        <div className="w-full h-full bg-white p-3 flex flex-col gap-2 border border-gray-100 rounded shadow-sm">
          <div className="h-3 w-1/2 bg-gray-200 mt-2"></div>
          <div className="flex gap-1">
             <div className="h-1 w-4 bg-gray-100"></div>
             <div className="h-1 w-4 bg-gray-100"></div>
          </div>
          <div className="h-0.5 w-full bg-gray-100 my-1"></div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/4" style={{ backgroundColor: color + '40' }}></div>
            <div className="h-1 w-full bg-gray-50"></div>
            <div className="h-1 w-full bg-gray-50"></div>
            <div className="h-1 w-4/5 bg-gray-50"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/4" style={{ backgroundColor: color + '40' }}></div>
            <div className="h-1 w-full bg-gray-50"></div>
            <div className="h-1 w-2/3 bg-gray-50"></div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal-image',
      name: 'Minimal Image',
      description: 'Sleek design with profile picture',
      preview: (color) => (
        <div className="w-full h-full bg-white border border-gray-100 rounded overflow-hidden shadow-sm flex pt-2">
          <div className="w-12 flex flex-col items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-full border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
               <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            </div>
            <div className="w-full h-0.5 bg-gray-100"></div>
            <div className="space-y-1 w-full px-1">
                <div className="h-1 w-full bg-gray-100"></div>
                <div className="h-1 w-full bg-gray-100"></div>
            </div>
          </div>
          <div className="flex-1 p-2 space-y-2 border-l border-gray-50">
            <div className="h-3 w-3/4 bg-gray-200"></div>
            <div className="h-1 w-1/2 bg-gray-100"></div>
            <div className="mt-2 h-2 w-1/4" style={{ backgroundColor: color + '30' }}></div>
            <div className="space-y-1">
               <div className="h-1 w-full bg-gray-50"></div>
               <div className="h-1 w-full bg-gray-50"></div>
               <div className="h-1 w-4/5 bg-gray-50"></div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const accentColors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" }
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Pick a resume template</h2>
            <p className="text-slate-500 mt-1">Select a visual design to showcase your professional story</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="group flex flex-col">
                {/* Template Card */}
                <div 
                  className={`relative aspect-[3/4] rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
                    ${selectedTemplate === template.id 
                      ? 'border-indigo-500 ring-4 ring-indigo-50 shadow-xl' 
                      : 'border-white bg-white hover:border-slate-200 hover:shadow-lg'
                    }`}
                  onClick={() => onSelect(template.id, selectedColor)}
                >
                  <div className="absolute inset-0 bg-slate-50 flex items-center justify-center p-4">
                    {template.preview(selectedColor)}
                  </div>
                  
                  {/* Selection Overlay */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-indigo-500 text-white p-1 rounded-full shadow-lg">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    </div>
                  )}

                  {/* Hover Action */}
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-300"></div>
                </div>

                {/* Template Info & Color Picker */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold transition-colors ${selectedTemplate === template.id ? 'text-indigo-600' : 'text-slate-700'}`}>
                      {template.name}
                    </h3>
                  </div>
                  
                  {/* Local Color Picker Mockup (matches selection) */}
                  <div className="flex flex-wrap gap-1.5">
                    {accentColors.slice(0, 7).map((color) => (
                      <button
                        key={color.value}
                        title={color.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(template.id, color.value);
                        }}
                        className={`size-5 rounded-full border transition-all hover:scale-125
                          ${selectedColor === color.value && selectedTemplate === template.id 
                            ? 'ring-2 ring-offset-2 ring-indigo-400 border-white' 
                            : 'border-transparent'}`}
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                    <div className="size-5 rounded-full border border-slate-200 bg-white flex items-center justify-center">
                       <Palette size={10} className="text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-white border-t flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={onConfirm}
                className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
                Confirm Template
            </button>
        </div>
      </div>
    </div>
  )
}

export default TemplateGallery
