import { Layout } from 'lucide-react'
import React from 'react'

const TemplateSelector = ({ onClick }) => {
  return (
    <div className='relative'>
      <button onClick={onClick} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
        <Layout size={14} /> <span className='max-sm:hidden'>Templates</span>
      </button>
    </div>
  )
}

export default TemplateSelector
