import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

import { ChevronLeft } from 'lucide-react'

const Navbar = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()
  const isBuilderPage = location.pathname.includes('/builder/')

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <div className='shadow bg-white'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <div className='flex items-center gap-2'>
          {!isBuilderPage && (
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-slate-100 rounded-full transition-colors group'
              title="Go to Home"
            >
              <ChevronLeft className='size-6 text-slate-600 group-hover:text-slate-900 transition-colors' />
            </button>
          )}
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </div>
        <div className='flex items-center gap-4 text-lg font-medium'>
          <button onClick={logoutUser} className='bg-white hover:bg-red-50 border border-gray-300 hover:border-red-200 px-7 py-1.5 rounded-full active:scale-95 transition-all text-slate-700 hover:text-red-600'>Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
