import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, Trash2, Camera } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const PersonalInfoForm = ({data, onChange}) => {
    const handleChange = (field, value)=>{
        onChange({...data, [field]: value})
    }

    const fields = [
        {key: "full_name", label: "Full Name", icon: User, type: "text", required: true, placeholder: "e.g. John Doe"},
        {key: "email", label: "Email Address", icon: Mail, type: "email", required: true, placeholder: "john@example.com"},
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+1 234 567 890" },
        { key: "location", label: "Location", icon: MapPin, type: "text", placeholder: "New York, USA" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", placeholder: "Senior Software Engineer" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url", placeholder: "linkedin.com/in/johndoe" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url", placeholder: "johndoe.dev" }
    ]

  return (
    <div className="space-y-6">
      {/* Image Uploader */}
      <div className="flex flex-col items-center gap-3 py-2">
        <label className="relative group cursor-pointer">
           <div className="size-20 rounded-[1.5rem] bg-slate-50 border-2 border-white shadow-xl flex items-center justify-center overflow-hidden relative transition-all group-hover:scale-105 active:scale-95">
              {data.image ? (
                <>
                   <img 
                    src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
                    alt="profile" 
                    className="size-full object-cover group-hover:opacity-40 transition-opacity"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="text-red-500" size={24} />
                   </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-300 group-hover:text-primary transition-colors">
                   <Camera size={24} strokeWidth={1.5} />
                </div>
              )}
           </div>
           <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleChange("image", e.target.files[0])} 
           />
        </label>
        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] opacity-40">Profile Image</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {fields.map((field) => (
            <motion.div 
              key={field.key} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`space-y-1.5 ${field.key === 'full_name' || field.key === 'email' ? 'md:col-span-2' : ''}`}
            >
                <label className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-widest pl-1">
                    <field.icon size={11} className="text-accent" />
                    {field.label}
                    {field.required && <span className="text-red-400 font-bold">*</span>}
                </label>
                <input 
                  type={field.type} 
                  value={data[field.key] || ""} 
                  onChange={(e)=>handleChange(field.key, e.target.value)} 
                  className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-primary placeholder:text-slate-300 focus:border-accent/30 focus:ring-4 focus:ring-accent/5 outline-none transition-all shadow-sm"
                  placeholder={field.placeholder}
                  required={field.required}
                />
            </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PersonalInfoForm
