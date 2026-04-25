import { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Zap, User, Save, Layers, Palette, Share, Download } from 'lucide-react'
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
    <div className='min-h-screen pt-32 pb-20 relative mesh-gradient-light bg-grid-slate-100 overflow-x-hidden'>
      <div className='max-w-[1440px] mx-auto px-10 relative z-10'>
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-6">
              <button onClick={() => navigate('/app')} className="group flex items-center gap-3 px-5 py-3 glass-light rounded-2xl text-secondary hover:text-primary transition-all border-white shadow-sm hover:shadow-md">
                <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Matrix_Exit</span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
              <div className="hidden md:flex flex-col">
                 <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em] mb-0.5 opacity-60">System_Blueprint</span>
                 <h1 className="text-xl font-black text-primary tracking-tight leading-none uppercase">{resumeData.title || "Untitled_Node"}</h1>
              </div>
           </div>

           <div className="flex items-center gap-4 glass-light p-2 rounded-[1.5rem] border-white shadow-lg">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                 <div className={`size-2 rounded-full ${resumeData.public ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                 <span className="text-[9px] font-black text-secondary uppercase tracking-widest">{resumeData.public ? 'Live_Feed' : 'Encrypted'}</span>
              </div>
              
              <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>

              <div className="flex items-center gap-2">
                 <button 
                   onClick={handleShare}
                   className="size-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-secondary hover:text-primary hover:border-primary/20 hover:bg-slate-50 transition-all shadow-sm group relative"
                 >
                    <Share size={18} />
                    <span className="absolute bottom-full mb-3 px-3 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none">Share</span>
                 </button>

                 <button 
                   onClick={() => window.print()}
                   className="size-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-secondary hover:text-primary hover:border-primary/20 hover:bg-slate-50 transition-all shadow-sm group relative"
                 >
                    <Download size={18} />
                    <span className="absolute bottom-full mb-3 px-3 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none">Export</span>
                 </button>

                 <button 
                   onClick={() => toast.promise(saveResume(), { loading: 'Syncing...', success: 'Blueprint Saved', error: 'Sync Failed' })} 
                   className="h-11 px-6 bg-gradient-to-r from-accent to-brand-blue text-white rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-accent/20"
                 >
                    <Save size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Commit</span>
                 </button>
              </div>
           </div>
        </div>

        <div className='flex gap-10 items-start h-[calc(100vh-16rem)] overflow-hidden'>
          {/* Vertical Navigation Sidebar */}
          <aside className='w-20 flex flex-col gap-4 py-8 glass-light rounded-[2.5rem] border-white/60 items-center sticky top-0'>
             {sections.map((section, index) => (
               <button
                 key={section.id}
                 onClick={() => setActiveSectionIndex(index)}
                 className={`
                   relative size-12 flex items-center justify-center rounded-xl transition-all duration-500 group
                   ${activeSectionIndex === index ? 'text-accent' : 'text-slate-400 hover:text-accent/60'}
                 `}
               >
                 {activeSectionIndex === index && (
                   <motion.div
                     layoutId="builder-nav-pill-light"
                     className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-xl glow-blue"
                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                 )}
                 <section.icon size={20} className='relative z-10' />
                 <div className="absolute left-full ml-4 px-3 py-1.5 glass-light border-white rounded-lg text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                    {section.name}
                 </div>
               </button>
             ))}
             
             <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-4 items-center">
                <button 
                  onClick={() => setShowTemplateGallery(true)}
                  className="size-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:bg-slate-50"
                >
                  <Layers size={18} />
                </button>
                <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
             </div>
          </aside>

          {/* Main Builder Grid */}
          <div className='flex-1 grid lg:grid-cols-12 gap-10 h-full overflow-y-auto custom-scrollbar pr-4'>
            {/* Form Column */}
            <div className='lg:col-span-5 flex flex-col gap-8'>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className='glass-light rounded-[2.5rem] p-10 border-white shadow-2xl relative overflow-hidden'
              >
                {/* Section Header */}
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-4">
                     <div className="size-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <activeSection.icon size={22} />
                     </div>
                     <div>
                       <div className="text-[10px] text-accent font-black uppercase tracking-[0.4em] mb-1 opacity-60">// STAGE_{activeSectionIndex + 1}</div>
                       <h2 className="text-primary font-black text-2xl tracking-tight leading-none uppercase">{activeSection.name}</h2>
                     </div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Status</div>
                      <div className="text-lg font-black text-primary leading-none uppercase">{Math.round(((activeSectionIndex + 1) / sections.length) * 100)}%</div>
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

                {/* Footer Navigation */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-100">
                  <button 
                    onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeSectionIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[10px] tracking-widest text-secondary hover:text-primary disabled:opacity-0 transition-all uppercase"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>

                  <button 
                    onClick={() => {
                      if (activeSectionIndex === sections.length - 1) saveResume();
                      else setActiveSectionIndex(prev => prev + 1);
                    }}
                    className="flex items-center gap-3 px-10 h-14 bg-primary hover:scale-[1.02] active:scale-95 text-white rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-xl shadow-primary/20 transition-all"
                  >
                    {activeSectionIndex === sections.length - 1 ? 'Save Blueprint' : 'Next Stage'}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <AtsScorePanel resumeData={resumeData} />
              </motion.div>
            </div>

            {/* Preview Column */}
            <div className='lg:col-span-7 flex flex-col gap-6'>
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
