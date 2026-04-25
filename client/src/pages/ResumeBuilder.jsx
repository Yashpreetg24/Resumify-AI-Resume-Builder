import { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Zap, User, Save, Layers, Palette, Share, Download, Sparkle } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import TemplateGallery from '../components/TemplateGallery'
import AtsScorePanel from '../components/AtsScorePanel'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#6366f1",
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const sections = [
    { id: "personal", name: "Profile", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Zap },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = useCallback(async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = `Building: ${data.resume.title}`;
      }
    } catch (error) {
      console.log(error.message)
    }
  }, [resumeId, token])

  useEffect(() => {
    loadExistingResume()
  }, [loadExistingResume])

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume:", error)
    }
  }

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch {
       toast.error("Visibility update failed")
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, title: resumeData.title })
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success("Link copied to clipboard")
    }
  }

  return (
    <div className='min-h-screen pt-12 pb-8 relative mesh-gradient-light bg-grid-slate-100 overflow-x-hidden'>
      <div className='max-w-[1440px] mx-auto px-10 relative z-10'>
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-6">
              <button onClick={() => setShowExitModal(true)} className="group flex items-center gap-3 px-5 py-3 glass-light rounded-2xl text-secondary hover:text-primary transition-all border-white shadow-sm hover:shadow-md">
                <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back</span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
              <div className="hidden md:flex flex-col">
                 <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em] mb-0.5 opacity-60">Editing Resume</span>
                 <h1 className="text-xl font-black text-primary tracking-tight leading-none uppercase">{resumeData.title || "Untitled Resume"}</h1>
              </div>
           </div>

           <div className="flex items-center gap-4 glass-light p-2 rounded-[1.5rem] border-white shadow-lg">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                 <div className={`size-2 rounded-full ${resumeData.public ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                 <span className="text-[9px] font-black text-secondary uppercase tracking-widest">{resumeData.public ? 'Public' : 'Private'}</span>
              </div>
              
              <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>

              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => toast.promise(saveResume(), { loading: 'Saving...', success: 'Resume Saved', error: 'Save Failed' })} 
                   className="h-11 px-6 bg-slate-900 text-white rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-slate-900/20"
                 >
                    <Save size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Save Changes</span>
                 </button>
              </div>
           </div>
        </div>

        <div className='flex gap-10 items-start h-[calc(100vh-10rem)] overflow-hidden'>
          {/* Main Builder Grid */}
          <div className='flex-1 grid lg:grid-cols-12 gap-10 h-full overflow-y-auto custom-scrollbar pr-4'>
            {/* Form Column */}
            <div className='lg:col-span-4 flex flex-col gap-8'>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className='glass-light rounded-3xl p-8 border-white shadow-2xl relative'
              >
                {/* Integrated Stepper Navigation */}
                <div className="flex items-center justify-between p-1 mb-8 bg-slate-100/40 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm relative z-50">
                   <div className="flex items-center gap-1">
                      <button 
                        disabled={activeSectionIndex === 0}
                        onClick={() => setActiveSectionIndex(prev => prev - 1)}
                        className="size-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-md disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                      >
                         <ChevronLeft size={18} />
                      </button>
                      
                      <div className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white rounded-xl shadow-sm border border-slate-200/50">
                         <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-900/10">
                            <activeSection.icon size={14} />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[6px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-0.5">Step {activeSectionIndex + 1}/{sections.length}</span>
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-none">{activeSection.name}</span>
                         </div>
                      </div>

                      <button 
                        disabled={activeSectionIndex === sections.length - 1}
                        onClick={() => setActiveSectionIndex(prev => prev + 1)}
                        className="size-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-md disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                      >
                         <ChevronRight size={18} />
                      </button>
                   </div>

                   <div className="flex items-center gap-1">
                      <div className="hidden sm:flex flex-col items-end mr-2">
                        <div className="text-[6px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-0.5">Progress</div>
                        <div className="text-[11px] font-black text-slate-900 leading-none">{Math.round(((activeSectionIndex + 1) / sections.length) * 100)}%</div>
                      </div>
                      
                      <div className="h-6 w-[1px] bg-slate-200 mx-0.5"></div>
                      
                      <button 
                        onClick={() => setShowTemplateGallery(true)}
                        className="size-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-md transition-all group relative"
                      >
                        <Layers size={16} />
                      </button>
                      
                      <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                   </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[480px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeSection.id === 'personal' && <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} />}
                      {activeSection.id === 'summary' && <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />}
                      {activeSection.id === 'experience' && <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />}
                      {activeSection.id === 'education' && <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />}
                      {activeSection.id === 'projects' && <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />}
                      {activeSection.id === 'skills' && <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <AtsScorePanel resumeData={resumeData} />
              </motion.div>
            </div>

            {/* Preview Column */}
            <div className='lg:col-span-8 flex flex-col gap-6'>
              <div className="flex items-center justify-end gap-3 mb-4">
                 <button onClick={changeResumeVisibility} className="flex items-center gap-2 px-5 h-12 glass-light rounded-2xl text-[9px] font-black tracking-[0.3em] text-secondary hover:text-primary transition-all uppercase border-white/60">
                   {resumeData.public ? <EyeIcon size={14} className="text-accent" /> : <EyeOffIcon size={14} />}
                   {resumeData.public ? 'Public' : 'Private'}
                 </button>
                 <button onClick={handleShare} disabled={!resumeData.public} className="size-12 flex items-center justify-center glass-light rounded-2xl text-secondary hover:text-accent transition-all disabled:opacity-30 border-white/60">
                   <Share2Icon size={18} />
                 </button>
                 <button onClick={() => window.print()} className="flex items-center gap-4 px-8 h-12 bg-white border border-slate-200 text-primary rounded-2xl text-[10px] font-black tracking-[0.3em] hover:bg-slate-50 transition-all uppercase shadow-lg shadow-black/5">
                   <DownloadIcon size={16} /> Export PDF
                 </button>
              </div>

              <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white shadow-black/5">
                 <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[400px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
            >
              {/* Top Accent Bar */}
              <div className="h-2 w-full bg-slate-900"></div>

              <div className="p-8 pt-10 text-center">
                 <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mx-auto mb-6 border border-slate-100 shadow-sm">
                    <Save size={24} />
                 </div>
                 
                 <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Unsaved Changes</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed px-4 mb-8">
                    You're about to leave the builder. Would you like to save your latest improvements before exiting?
                 </p>
                 
                 <div className="flex flex-col gap-3">
                    <button 
                      onClick={async () => {
                        await toast.promise(saveResume(), { loading: 'Saving Changes...', success: 'Resume Saved', error: 'Save Failed' });
                        navigate('/app');
                      }}
                      className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                    >
                      <Save size={16} />
                      Save & Exit
                    </button>
                    
                    <button 
                      onClick={() => setShowExitModal(false)}
                      className="w-full h-12 bg-white text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center"
                    >
                      Stay and Edit
                    </button>

                    <button 
                      onClick={() => navigate('/app')}
                      className="mt-2 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                    >
                      Exit without saving
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <TemplateGallery
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onSelect={(template, color) => setResumeData(prev => ({ ...prev, template, accent_color: color }))}
        onConfirm={() => setShowTemplateGallery(false)}
        selectedTemplate={resumeData.template}
        selectedColor={resumeData.accent_color}
      />
    </div>
  )
}

export default ResumeBuilder
