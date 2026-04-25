import { FilePenLineIcon, FileText, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, Layout, ChevronRight, Clock, ShieldCheck } from 'lucide-react'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'
import TemplateGallery from '../components/TemplateGallery'
import { motion, AnimatePresence } from 'framer-motion'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)
  const colors = ["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [selectedColor, setSelectedColor] = useState('#6366f1')
  const [isLoading, setIsLoading] = useState(false)
  const [showAllResumes, setShowAllResumes] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = useCallback(async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      const sortedResumes = data.resumes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setAllResumes(sortedResumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }, [token])

  const createResume = async () => {
    try {
      const { data } = await api.post('/api/resumes/create', { title, template: selectedTemplate, accent_color: selectedColor }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowTemplateGallery(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleCreateSubmit = (event) => {
    event.preventDefault()
    setShowCreateResume(false)
    setShowTemplateGallery(true)
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [loadAllResumes])

  return (
    <div className='min-h-screen mesh-gradient-light bg-grid-slate-100 pt-32 pb-16'>
      <div className='max-w-7xl mx-auto px-6'>

        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-12'
        >
          <h1 className='text-4xl font-black text-primary tracking-tight mb-3'>
            Hi, {user?.name || 'Dreamer'}
          </h1>
          <p className='text-secondary text-base max-w-2xl leading-relaxed opacity-80'>
            Pick up where you left off or deploy a new career blueprint with our AI-enhanced templates.
          </p>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16'>
          
          {/* Main Status Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='lg:col-span-4'
          >
            <div className='glass-light p-7 rounded-3xl border-2 border-slate-300/60 shadow-2xl shadow-slate-200/50 h-full relative overflow-hidden group hover:border-primary/30 transition-all bg-white/40'>
              <div className="absolute top-0 right-0 p-5 text-accent/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                 <Layout size={80} />
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-primary tracking-tighter">{allResumes.length}</span>
                      <span className="text-base font-bold text-secondary opacity-60 italic">Total Resumes</span>
                   </div>
                </div>

                <div className="mt-8">
                   <div className="flex items-center gap-2.5 text-[9px] font-bold text-secondary opacity-60">
                      <Clock size={10} className="text-accent" />
                      Last sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Tiles */}
          <div className='lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5'>
             <button
                onClick={() => setShowCreateResume(true)}
                className='group glass-card-modern flex flex-col items-start justify-between h-[240px] relative overflow-hidden text-left p-7 border-2 border-slate-300/60 shadow-2xl shadow-accent/5 hover:border-accent/40 transition-all bg-white/40'
             >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="size-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                   <PlusIcon size={20} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-primary mb-1 tracking-tight">Create Resume</h3>
                   <p className="text-secondary text-[11px] leading-relaxed max-w-[160px] opacity-70">Build a professional resume in minutes with our high-impact AI templates.</p>
                   <div className="mt-3 flex items-center gap-2 text-accent font-black text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      Start Now <ChevronRight size={8} />
                   </div>
                </div>
             </button>

             <button
                onClick={() => setShowUploadResume(true)}
                className='group glass-card-modern flex flex-col items-start justify-between h-[240px] relative overflow-hidden text-left p-7 border-2 border-slate-300/60 shadow-2xl shadow-slate-200/40 hover:border-blue-400/30 transition-all bg-white/40'
             >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="size-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform duration-500">
                   <UploadCloud size={20} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-primary mb-1 tracking-tight">Upload resume</h3>
                   <p className="text-secondary text-[11px] leading-relaxed max-w-[160px] opacity-70">Turn your existing PDF into a professional resume in seconds.</p>
                   <div className="mt-3 flex items-center gap-2 text-accent font-black text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      Start Upload <ChevronRight size={8} />
                   </div>
                </div>
             </button>
          </div>
        </div>

        {/* Resume Grid Section */}
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-black text-primary tracking-tight'>Your Resumes</h2>
          <div className="h-px flex-1 bg-slate-100 mx-6 hidden sm:block"></div>
          {allResumes.length > 4 && (
            <button 
              onClick={() => setShowAllResumes(!showAllResumes)}
              className="flex items-center gap-2 group/all"
            >
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] group-hover/all:text-primary transition-colors">
                {showAllResumes ? 'Show less' : 'View all'}
              </span>
              <ChevronRight size={12} className={`text-secondary group-hover/all:text-primary transition-all ${showAllResumes ? 'rotate-90' : 'group-hover/all:translate-x-1'}`} />
            </button>
          )}
        </div>

        {allResumes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='glass-light rounded-[3rem] p-24 flex flex-col items-center text-center border-dashed border-2 border-slate-300/60 bg-transparent'
          >
            <div className="size-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
               <FileText size={40} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">No resumes found</h3>
            <p className='text-secondary max-w-sm text-sm opacity-60'>Start your career journey by creating or uploading your first resume.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allResumes.slice(0, showAllResumes ? allResumes.length : 4).map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <motion.div
                  key={resume._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='group relative bg-white border border-slate-300/60 rounded-[2rem] p-5 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-accent/20 transition-all duration-500'
                >
                  {/* Card Main Area */}
                  <div 
                    className='relative w-full aspect-video rounded-2xl flex flex-col items-center justify-center overflow-hidden mb-4'
                    style={{ background: `${baseColor}08` }}
                  >
                     <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     
                     <div className='size-12 bg-white rounded-xl flex items-center justify-center shadow-xl shadow-black/5 group-hover:rotate-3 transition-all duration-500 relative z-10'>
                        <FilePenLineIcon className="size-6" style={{ color: baseColor }} />
                     </div>
                  </div>

                  {/* Info Area */}
                  <div className="px-0.5 mb-3">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className='font-black text-primary text-sm tracking-tight truncate flex-1'>{resume.title}</h4>
                      <div className="flex items-center gap-1 text-[8px] font-black text-secondary uppercase tracking-widest opacity-40">
                         <Clock size={8} />
                         {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-1.5 pt-3 border-t border-slate-50">
                     <button 
                       onClick={() => navigate(`/app/builder/${resume._id}`)}
                       className="flex-1 bg-slate-50 hover:bg-primary hover:text-white py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 group/btn"
                     >
                        Open Editor
                        <ChevronRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                     <button 
                       onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                       className="p-2 bg-slate-50 hover:bg-accent/10 hover:text-accent rounded-lg transition-all"
                       title="Rename"
                     >
                        <PencilIcon size={12} />
                     </button>
                     <button 
                       onClick={() => deleteResume(resume._id)}
                       className="p-2 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                       title="Delete"
                     >
                        <TrashIcon size={12} />
                     </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Modals with AnimatePresence */}
        <AnimatePresence>
          {(showCreateResume || showUploadResume || editResumeId) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-primary/20 backdrop-blur-md z-[200] flex items-center justify-center px-6'
              onClick={() => { setShowCreateResume(false); setShowUploadResume(false); setEditResumeId('') }}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()} 
                className='glass-light p-12 rounded-[3rem] w-full max-w-lg relative border border-slate-300/60 shadow-2xl'
              >
                <button 
                  className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-all"
                  onClick={() => { setShowCreateResume(false); setShowUploadResume(false); setEditResumeId('') }}
                >
                   <XIcon size={20} className="text-secondary" />
                </button>

                {showCreateResume && (
                  <form onSubmit={handleCreateSubmit}>
                    <h2 className='text-3xl font-black text-primary tracking-tight mb-4'>Create resume</h2>
                    <p className="text-secondary text-sm mb-10 leading-relaxed">Give your resume a name to get started on your professional journey.</p>
                    <div className="space-y-8">
                       <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                        type="text" 
                        placeholder='e.g. Senior Software Architect' 
                        className='w-full' 
                        required 
                       />
                       <button className='w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20'>
                          Proceed to Templates
                       </button>
                    </div>
                  </form>
                )}

                {showUploadResume && (
                  <form onSubmit={uploadResume}>
                    <h2 className='text-3xl font-black text-primary tracking-tight mb-4'>Upload resume</h2>
                    <p className="text-secondary text-sm mb-10 leading-relaxed">Import your existing PDF to upgrade your career story instantly.</p>
                    <div className="space-y-8">
                       <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                        type="text" 
                        placeholder='Resume Title' 
                        className='w-full' 
                        required 
                       />
                       <label htmlFor="resume-input" className="block">
                         <div className='flex flex-col items-center justify-center gap-4 border-2 border-slate-100 border-dashed rounded-[2rem] p-10 hover:border-accent/30 hover:bg-accent/[0.02] cursor-pointer transition-all group'>
                           {resume ? (
                             <p className='text-accent font-bold'>{resume.name}</p>
                           ) : (
                             <>
                               <UploadCloud className='size-16 text-slate-300 group-hover:text-accent transition-colors' />
                               <p className="text-xs font-black text-secondary uppercase tracking-widest">Select PDF File</p>
                             </>
                           )}
                         </div>
                       </label>
                       <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
                       
                       <button 
                        disabled={isLoading} 
                        className='w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4'
                       >
                         {isLoading && <LoaderCircleIcon className='animate-spin size-5' />}
                         {isLoading ? 'Analyzing...' : 'Begin Import'}
                       </button>
                    </div>
                  </form>
                )}

                {editResumeId && (
                  <form onSubmit={editTitle}>
                    <h2 className='text-3xl font-black text-primary tracking-tight mb-4'>Rename Blueprint</h2>
                    <p className="text-secondary text-sm mb-10 leading-relaxed">Update the identifier for this specific career deployment.</p>
                    <div className="space-y-8">
                       <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                        type="text" 
                        placeholder='Enter new title' 
                        className='w-full' 
                        required 
                       />
                       <button className='w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20'>
                          Update Identity
                       </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <TemplateGallery
          isOpen={showTemplateGallery}
          onClose={() => setShowTemplateGallery(false)}
          onSelect={(template, color) => {
            setSelectedTemplate(template);
            setSelectedColor(color);
          }}
          onConfirm={createResume}
          selectedTemplate={selectedTemplate}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  )
}

export default Dashboard
