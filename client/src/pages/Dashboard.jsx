import { FilePenLineIcon, FileText, LoaderCircleIcon, PencilIcon, PlusIcon, Sparkles, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'
import TemplateGallery from '../components/TemplateGallery'

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [selectedColor, setSelectedColor] = useState('#3B82F6')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = useCallback(async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
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
    <div className='min-h-screen mesh-gradient'>
      <div className='max-w-7xl mx-auto px-6 py-12'>

        {/* Hero Section */}
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gradient mb-3'>
            Hi, {user?.name || 'Dreamer'}
          </h1>
          <p className='text-slate-500 text-lg max-w-2xl leading-relaxed'>
            Ready to design your resume for a milestone? Pick a template or upload your existing resume to get started with AI-powered enhancements.
          </p>
        </div>

        {/* Dashboard Stats & Actions Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16'>

          {/* Quick Stats & Welcome Card */}
          <div className='lg:col-span-4 flex flex-col gap-6'>
            <div className='group relative glass p-8 rounded-3xl shadow-soft flex flex-col justify-between h-full min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1'>
              {/* Decorative Background Icon */}
              <FileText className='absolute -right-6 -bottom-6 size-40 text-slate-100 group-hover:text-indigo-50/50 group-hover:scale-110 transition-all duration-700 -rotate-12' />

              <div className='relative z-10'>
                <p className='text-indigo-600 font-semibold mb-2 uppercase tracking-[0.2em] text-[10px]'>Your Workspace</p>
                <div className='flex items-baseline gap-2'>
                  <h3 className='text-5xl font-bold text-slate-900'>{allResumes.length}</h3>
                  <span className='text-slate-500 font-medium text-lg'>Total Resumes</span>
                </div>
              </div>

              <div className='relative z-10 flex items-center gap-2.5 text-xs text-green-600 font-semibold bg-green-50/80 backdrop-blur-sm w-fit px-4 py-2 rounded-2xl border border-green-100 shadow-sm transition-all duration-300 group-hover:bg-green-100'>
                <div className='size-2 bg-green-500 rounded-full animate-pulse' />
                AI Processing Ready
              </div>
            </div>
          </div>

          <div className='lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <button
              onClick={() => setShowCreateResume(true)}
              className='group relative glass p-8 rounded-3xl flex flex-col items-start justify-between h-64 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 group-hover:opacity-100 transition-opacity' />
              <PlusIcon className='absolute -right-6 -bottom-6 size-48 text-indigo-50 group-hover:text-indigo-100/50 group-hover:scale-110 transition-all duration-700 -rotate-12' />

              <PlusIcon className='relative z-10 size-14 p-3.5 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-90 transition-all duration-500' />
              <div className='relative z-10'>
                <h3 className='text-2xl font-bold text-slate-800 mb-1'>Create New</h3>
                <p className='text-slate-500 text-sm leading-relaxed'>Start fresh with professional templates</p>
              </div>
            </button>

            <button
              onClick={() => setShowUploadResume(true)}
              className='group relative glass p-8 rounded-3xl flex flex-col items-start justify-between h-64 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:opacity-100 transition-opacity' />
              <UploadCloudIcon className='absolute -right-6 -bottom-6 size-48 text-purple-50 group-hover:text-purple-100/50 group-hover:scale-110 transition-all duration-700 -rotate-12' />

              <UploadCloudIcon className='relative z-10 size-14 p-3.5 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-200 group-hover:scale-110 transition-all duration-500' />
              <div className='relative z-10'>
                <h3 className='text-2xl font-bold text-slate-800 mb-1'>Smart Upload</h3>
                <p className='text-slate-500 text-sm leading-relaxed'>AI extraction from your existing PDF</p>
              </div>
            </button>
          </div>
        </div>

        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold text-slate-800'>Recent Resumes</h2>
        </div>

        {allResumes.length === 0 ? (
          <div className='glass rounded-3xl p-20 flex flex-col items-center text-center opacity-80'>
            <FileText className='size-16 text-slate-300 mb-4' />
            <p className='text-slate-500'>Your resume collection is empty. Time to create something great!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={index}
                  className='group relative glass rounded-[32px] p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2'
                >
                  <button
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className='w-full aspect-[4/5] flex flex-col items-center justify-center rounded-[24px] gap-6 transition-all duration-500 cursor-pointer overflow-hidden border border-white/40'
                    style={{ background: `linear-gradient(135deg, ${baseColor}05, ${baseColor}10)` }}
                  >
                    <div className='p-5 rounded-[20px] transition-all duration-500 group-hover:scale-105 bg-white shadow-sm border border-slate-50'>
                      <FilePenLineIcon className="size-9" style={{ color: baseColor }} />
                    </div>
                    <div className='text-center px-4'>
                      <h4 className='font-bold text-slate-800 group-hover:text-slate-950 transition-colors text-lg truncate w-full max-w-[160px] leading-tight'>{resume.title}</h4>
                      <p className='text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-bold'>
                        {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div onClick={e => e.stopPropagation()} className='absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0'>
                      <button
                        onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                        className="p-2 bg-white/95 backdrop-blur-sm hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 shadow-sm border border-slate-100 transition-all"
                      >
                        <PencilIcon className="size-3.5" />
                      </button>
                      <button
                        onClick={() => deleteResume(resume._id)}
                        className="p-2 bg-white/95 backdrop-blur-sm hover:bg-white rounded-lg text-slate-400 hover:text-red-500 shadow-sm border border-slate-100 transition-all"
                      >
                        <TrashIcon className="size-3.5" />
                      </button>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {showCreateResume && (
          <form onSubmit={handleCreateSubmit} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Next: Pick Template</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); setTitle('') }} />
            </div>
          </form>
        )
        }

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

        {/* Footer actions for TemplateGallery are now Confirm Template button, so I need to trigger createResume */}

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />
              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700">
                  Select resume file
                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                    {resume ? (
                      <p className='text-green-700'>{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className='size-14 stroke-1' />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
              </div>
              <button disabled={isLoading} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2'>
                {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
                {isLoading ? 'Uploading...' : 'Upload Resume'}

              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle('') }} />
            </div>
          </form>
        )
        }

        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setEditResumeId(''); setTitle('') }} />
            </div>
          </form>
        )
        }

      </div>
    </div>
  )
}

export default Dashboard
