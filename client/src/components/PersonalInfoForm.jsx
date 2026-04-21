import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, Trash2 } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data, onChange}) => {

    const handleChange = (field, value)=>{
        onChange({...data, [field]: value})
    }

    const fields = [
        {key: "full_name", label: "Full Name", icon: User, type: "text", required: true},
        {key: "email", label: "Email Address", icon: Mail, type: "email", required: true},
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" }
    ]

  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information</p>
      <div className='flex items-center gap-2'>
        <div className='relative group mt-5'>
            <label className='cursor-pointer'>
                {data.image ? (
                    <div className='relative w-16 h-16'>
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user-image" className='w-full h-full rounded-full object-cover ring ring-slate-300 group-hover:opacity-40 transition-all'/>
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleChange("image", "");
                            }}
                            className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                            <Trash2 className='size-7 text-red-600 drop-shadow-sm' />
                        </button>
                    </div>
                ) : (
                    <div className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-700'>
                        <User className='size-10 p-2.5 border rounded-full'/> 
                        upload user image
                    </div>
                )}
                <input 
                    type="file" 
                    accept="image/jpeg, image/png" 
                    className="hidden" 
                    onClick={(e) => (e.target.value = null)}
                    onChange={(e)=>handleChange("image", e.target.files[0])}
                />
            </label>
        </div>

      </div>

    {fields.map((field)=>{
        const Icon = field.icon;
        return (
            <div key={field.key} className='space-y-1 mt-5'>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Icon className="size-4"/>
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                </label>
                <input type={field.type} value={data[field.key] || ""} onChange={(e)=>handleChange(field.key, e.target.value)} className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm' placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required}/>
            </div>
        )
    })}
    </div>
  )
}

export default PersonalInfoForm
