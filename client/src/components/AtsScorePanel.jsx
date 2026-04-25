import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, Zap, Loader2, Target, Info } from 'lucide-react'
import api from '../configs/api'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

// --- Score Gauge (SVG-based animated circle) ---
const ScoreGauge = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0)
  const size = 160
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference

  const getColor = (s) => {
    if (s >= 90) return '#6366f1' // Indigo accent
    if (s >= 70) return '#22c55e' // Green
    if (s >= 50) return '#f97316' // Orange
    return '#ef4444' // Red
  }

  const getLabel = (s) => {
    if (s >= 90) return 'Optimized'
    if (s >= 70) return 'Competitive'
    if (s >= 50) return 'Developing'
    return 'Critical'
  }

  useEffect(() => {
    if (score === 0) return
    let start = 0
    const duration = 1500
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setAnimatedScore(Math.floor(progress * score))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [score])

  const color = getColor(score)

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" style={{ display: 'block' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f8fafc" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black font-heading text-primary leading-none">{animatedScore}</span>
          <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest mt-1">Score</span>
        </div>
      </div>
      <div className="mt-4 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
         <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color }}>{getLabel(score)}</p>
      </div>
    </div>
  )
}

const CategoryRow = ({ category, isOpen, onToggle }) => {
  return (
    <div className={`border-b border-slate-50 last:border-0 transition-all ${isOpen ? 'bg-slate-50/50' : ''}`}>
      <button onClick={onToggle} className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
        <div className="flex items-center gap-4">
          <div className={`size-8 rounded-lg flex items-center justify-center ${category.score >= 90 ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>
             {category.score >= 90 ? <CheckCircle2 size={16} /> : <Info size={16} />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">{category.name}</h4>
            <div className="flex items-center gap-2 mt-1">
               <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${category.score}%` }} />
               </div>
               <span className="text-[10px] font-black text-secondary/60 uppercase">{category.score}%</span>
            </div>
          </div>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-secondary" /> : <ChevronDown size={16} className="text-secondary" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-16 pb-6 pt-2 space-y-4">
              {(category.findings || category.checks).map((check, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1">
                    {(check.status === 'success' || check.passed) ? <CheckCircle2 size={12} className="text-green-500" /> : <XCircle size={12} className="text-red-500" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary/80 leading-relaxed">{check.message || check.name}</p>
                    {(!check.passed && check.detail) && (
                      <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1 opacity-60">{check.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AtsScorePanel = ({ resumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [scoreData, setScoreData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [openId, setOpenId] = useState(null)

  const checkAtsScore = async () => {
    try {
      setLoading(true)
      setChecked(true)
      const { data } = await api.post('/api/ai/check-ats-score', { resumeData }, { headers: { Authorization: token } })
      setScoreData(data)
    } catch {
      toast.error("Failed to analyze resume matrix")
      setChecked(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-light rounded-[2.5rem] border-white shadow-xl overflow-hidden mt-8">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="size-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
              <Target size={20} />
           </div>
           <div>
              <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em] opacity-40">// SYSTEM_ANALYSIS</span>
              <h3 className="text-primary font-black text-lg uppercase tracking-tight">ATS Calibration</h3>
           </div>
        </div>
        <button onClick={checkAtsScore} disabled={loading} className="px-6 h-10 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
          {loading ? "Scanning..." : (checked ? "Recalibrate" : "Scan Matrix")}
        </button>
      </div>

      <div className="p-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative">
              <Loader2 size={48} className="text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="size-2 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <p className="mt-8 text-[11px] font-black text-primary uppercase tracking-[0.4em] animate-pulse">Synchronizing Neural Weights...</p>
          </div>
        ) : scoreData ? (
          <div className="space-y-10">
            <ScoreGauge score={scoreData.overall_score || scoreData.score} />
            
            <div className="text-center px-4 -mt-4">
               <p className="text-sm font-bold text-primary leading-relaxed">
                 {scoreData.summary_message || scoreData.feedback}
               </p>
               {scoreData.total_issues !== undefined && (
                  <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-red-50 text-red-500 rounded-full">
                     <XCircle size={12} />
                     <span className="text-[9px] font-black uppercase tracking-widest">{scoreData.total_issues} Conflicts Found</span>
                  </div>
               )}
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
               {scoreData.categories.map((cat, idx) => (
                 <CategoryRow
                   key={cat.id || idx}
                   category={cat}
                   isOpen={openId === (cat.id || idx)}
                   onToggle={() => setOpenId(openId === (cat.id || idx) ? null : (cat.id || idx))}
                 />
               ))}
            </div>

            <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl flex items-start gap-4">
               <Zap size={14} className="text-primary mt-0.5" />
               <p className="text-[11px] font-bold text-primary/80 leading-relaxed uppercase tracking-wider">
                  Optimizer Tip: Resolving "Critical" conflicts first can boost your visibility score by up to 40%.
               </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
            <Target size={48} className="text-slate-300 mb-6" strokeWidth={1} />
            <p className="text-sm font-bold text-primary">Awaiting Matrix Input.</p>
            <p className="text-[10px] font-black text-secondary uppercase tracking-widest mt-2">Initialize scan to optimize career conversion.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AtsScorePanel
