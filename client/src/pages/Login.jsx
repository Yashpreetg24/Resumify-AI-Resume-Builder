import { Lock, Mail, User, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = useState(urlState || "login")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        if (urlState) setState(urlState)
    }, [urlState])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
            navigate('/')
        } catch (error) {
            toast.error(error?.response?.data?.message || "Authentication failed")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative font-sans">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm">
                <ArrowLeft size={18} />
                Back to home
            </Link>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    {state === "login" ? "Welcome back" : "Create your account"}
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    {state === "login" ? "Enter your details to access your account" : "Join thousands of professionals today"}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white py-10 px-6 shadow-xl shadow-slate-200/60 rounded-[2rem] border border-slate-100"
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {state !== "login" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1"
                                >
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-12 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            {loading ? (
                                <LoaderIcon className="animate-spin mr-2" size={18} />
                            ) : (
                                <CheckCircle2 className="mr-2" size={18} />
                            )}
                            {state === "login" ? "Log In" : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                            {state === "login" ? (
                                <>
                                    <span className="text-slate-500 font-medium">Don't have an account?</span> Sign up
                                </>
                            ) : (
                                <>
                                    <span className="text-slate-500 font-medium">Already have an account?</span> Log in
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

const SparkleIcon = ({ size, fill, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 7.92c.13 0 .26 0 .393 0a7.5 7.5 0 0 0-7.92-7.92c-.13 0-.26 0-.393 0a7.5 7.5 0 0 0-7.92 7.92c.13 0 .26 0 .393 0a7.5 7.5 0 0 0 7.92-7.92z" />
        <path d="M12 21c-.132 0-.263 0-.393 0a7.5 7.5 0 0 0-7.92-7.92c-.13 0-.26 0-.393 0a7.5 7.5 0 0 0 7.92 7.92c.13 0 .26 0 .393 0a7.5 7.5 0 0 0 7.92-7.92c-.13 0-.26 0-.393 0a7.5 7.5 0 0 0-7.92 7.92z" />
    </svg>
)

const LoaderIcon = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
)

export default Login
