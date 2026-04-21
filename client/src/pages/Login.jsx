import { Lock, Mail, User2Icon, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = React.useState(urlState || "login")
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
            navigate('/')
        } catch (error) {
            toast(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 relative'>
            <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all group">
                <div className="p-2 rounded-full border border-slate-200 group-hover:border-slate-300 group-hover:bg-white group-active:scale-90 transition-all shadow-sm">
                    <ArrowLeft size={18} />
                </div>
                <span className="text-sm font-semibold">Back to Home</span>
            </Link>
            <form onSubmit={handleSubmit} className="sm:w-[420px] w-[90%] text-center border border-gray-300/60 rounded-3xl px-10 py-6 bg-white shadow-xl shadow-gray-200/40">
                <h1 className="text-gray-900 text-3xl mt-10 font-bold tracking-tight">{state === "login" ? "Welcome Back" : "Create Account"}</h1>
                <p className="text-gray-500 text-sm mt-2 mb-10">Please {state === "login" ? "login" : "register"} to continue your journey</p>
                {state !== "login" && (
                    <div className="flex items-center w-full bg-white border border-gray-200 h-12 rounded-full overflow-hidden px-6 gap-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/5 transition-all mb-4">
                        <User2Icon size={18} className="text-gray-400 shrink-0" />
                        <input type="text" name="name" placeholder="Full Name" className="w-full h-full border-none outline-none ring-0 focus:ring-0 text-sm text-gray-800 placeholder:text-gray-400 font-medium bg-transparent" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full bg-white border border-gray-200 h-12 rounded-full overflow-hidden px-6 gap-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/5 transition-all mb-4">
                    <Mail size={18} className="text-gray-400 shrink-0" />
                    <input type="email" name="email" placeholder="Email Address" className="w-full h-full border-none outline-none ring-0 focus:ring-0 text-sm text-gray-800 placeholder:text-gray-400 font-medium bg-transparent" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center w-full bg-white border border-gray-200 h-12 rounded-full overflow-hidden px-6 gap-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/5 transition-all mb-4">
                    <Lock size={18} className="text-gray-400 shrink-0" />
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full h-full border-none outline-none ring-0 focus:ring-0 text-sm text-gray-800 placeholder:text-gray-400 font-medium bg-transparent" value={formData.password} onChange={handleChange} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>


                <button type="submit" className="mt-4 w-full h-12 rounded-full text-white bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all font-bold text-base shadow-lg shadow-green-100">
                    {state === "login" ? "Login" : "Sign Up"}
                </button>
                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-6 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <span className="text-green-500 hover:underline cursor-pointer font-semibold ml-1">click here</span></p>
            </form>
            <style>
                {`
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover, 
                    input:-webkit-autofill:focus, 
                    input:-webkit-autofill:active  {
                        -webkit-box-shadow: 0 0 0 30px white inset !important;
                        transition: background-color 5000s ease-in-out 0s;
                    }
                `}
            </style>
        </div>
    )
}

export default Login
