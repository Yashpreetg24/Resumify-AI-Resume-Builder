import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, Sparkles, Loader2 } from 'lucide-react'
import api from '../configs/api'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

// --- Score Gauge (SVG-based animated circle) ---
const ScoreGauge = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0)
  const size = 160
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference

  const getColor = (s) => {
    if (s >= 90) return '#22c55e'
    if (s >= 70) return '#f97316'
    if (s >= 50) return '#eab308'
    return '#ef4444'
  }

  const getLabel = (s) => {
    if (s >= 90) return 'Excellent'
    if (s >= 70) return 'Good'
    if (s >= 50) return 'Needs Work'
    return 'Poor'
  }

  useEffect(() => {
    if (score === 0) return
    let start = 0
    const duration = 1200
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
        {/* Background ring */}
        <svg width={size} height={size} className="-rotate-90" style={{ display: 'block' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        {/* Score text in centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>{animatedScore}</span>
        </div>
      </div>
      <p className="text-sm font-semibold mt-1" style={{ color }}>{getLabel(score)}</p>
    </div>
  )
}

// --- Score badge pill ---
const ScoreBadge = ({ score }) => {
  const getStyle = (s) => {
    if (s >= 90) return 'bg-green-100 text-green-700'
    if (s >= 70) return 'bg-orange-100 text-orange-600'
    if (s >= 50) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-600'
  }
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStyle(score)}`}>
      {score}%
    </span>
  )
}

// --- Accordion wrapper for categories ---
const AccordionCategories = ({ categories }) => {
  const [openId, setOpenId] = useState(null)

  return (
    <div>
      {categories.map((cat) => (
        <CategoryRow
          key={cat.id}
          category={cat}
          isOpen={openId === cat.id}
          onToggle={() => setOpenId(openId === cat.id ? null : cat.id)}
        />
      ))}
    </div>
  )
}

// --- Category row (collapsible) ---
const CategoryRow = ({ category, isOpen, onToggle }) => {

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-1 hover:bg-slate-50 rounded-lg transition-colors"
      >
        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">{category.name}</span>
        <div className="flex items-center gap-2">
          <ScoreBadge score={category.score} />
          {isOpen
            ? <ChevronUp className="size-4 text-slate-400" />
            : <ChevronDown className="size-4 text-slate-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="pb-3 space-y-2 pl-1">
          {category.checks.map((check, i) => (
            <div key={i} className="flex items-start justify-between gap-3 py-1.5 px-2 rounded-lg">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                {check.passed
                  ? <CheckCircle2 className="size-5 text-green-500 shrink-0 mt-0.5" />
                  : <XCircle className="size-5 text-red-400 shrink-0 mt-0.5" />}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700">{check.name}</p>
                  {!check.passed && check.detail && (
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{check.detail}</p>
                  )}
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                check.issues === 0
                  ? 'bg-green-50 text-green-600 border border-green-100'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}>
                {check.issues === 0 ? 'No issues' : `${check.issues} issue${check.issues > 1 ? 's' : ''}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Loading skeleton ---
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="size-36 rounded-full bg-slate-200" />
      <div className="h-4 w-24 bg-slate-200 rounded-full" />
      <div className="h-3 w-40 bg-slate-200 rounded-full" />
    </div>
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100">
        <div className="h-3 w-28 bg-slate-200 rounded-full" />
        <div className="h-6 w-14 bg-slate-200 rounded-full" />
      </div>
    ))}
  </div>
)


// --- Main component ---
const AtsScorePanel = ({ resumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [atsData, setAtsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  const checkScore = async () => {
    setLoading(true)
    setChecked(true)
    try {
      const { data } = await api.post('/api/ai/check-ats-score',
        { resumeData },
        { headers: { Authorization: token } }
      )

      setAtsData(data)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to analyze resume')
      setChecked(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
            <Sparkles className="size-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">ATS Score Checker</h3>
            <p className="text-xs text-slate-400">AI-powered resume analysis</p>
          </div>
        </div>
        <button
          onClick={checkScore}
          disabled={loading}
          className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all active:scale-95 shadow-md shadow-green-100"
        >
          {loading
            ? <><Loader2 className="size-3.5 animate-spin" /> Analyzing…</>
            : <><Sparkles className="size-3.5" /> {checked ? 'Re-check' : 'Check Score'}</>}
        </button>
      </div>

      {/* Content */}
      {!checked && !loading && (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
          <div className="size-14 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center">
            <Sparkles className="size-7 text-green-500" />
          </div>
          <p className="text-sm font-semibold text-slate-700">Ready to analyze your resume</p>
          <p className="text-xs text-slate-400 max-w-[320px] leading-relaxed">Click "Check Score" to get your detailed ATS report powered by AI analysis.</p>
        </div>
      )}

      {loading && <LoadingSkeleton />}

      {atsData && !loading && (
        <div>
          {/* Score Gauge */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <ScoreGauge score={atsData.overall_score} />
            <div className="text-center px-4">
              <p className="text-base font-bold text-slate-800">Your Resume Score</p>
              <p className="text-[13px] text-slate-500 mt-1.5 max-w-[420px] mx-auto leading-relaxed">{atsData.summary_message}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <XCircle className="size-3.5 text-red-400" />
              {atsData.total_issues} Issue{atsData.total_issues !== 1 ? 's' : ''} Found
            </div>
          </div>

          <hr className="border-slate-100 mb-4" />

          {/* Categories — accordion: only one open at a time */}
          <AccordionCategories categories={atsData.categories} />
        </div>
      )}
    </div>
  )
}

export default AtsScorePanel
