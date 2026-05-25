import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { FiLogOut, FiMenu, FiUser, FiBell, FiSearch } from 'react-icons/fi'

function Nav({ toggleSidebar }) {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)
  const [showDropdown, setShowDropdown] = useState(false)

  const logOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      toast.success("Signed Out Successfully")
      getAdmin()
      navigate("/login")
    } catch (error) {
      console.error(error)
      toast.error("Logout Failed")
    }
  }

  return (
    <header className='sticky top-0 z-40 w-full px-4 md:px-8 py-4'>
      <div className='admin-glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg'>
        
        {/* Left Side: Mobile Menu & Search */}
        <div className='flex items-center gap-4'>
          <button 
            onClick={toggleSidebar}
            className='md:hidden p-2 text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors'
          >
            <FiMenu className='text-2xl' />
          </button>
          <div className='hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus-within:border-[#4F46E5]/40 transition-all'>
            <FiSearch className='text-[#A1A1A1]' />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className='bg-transparent border-none outline-none text-sm text-[#FAFAFA] placeholder-[#A1A1A1] w-48 lg:w-64'
            />
          </div>
        </div>

        {/* Right Side: Notifications & User */}
        <div className='flex items-center gap-4 md:gap-6'>
          <button className='relative p-2 text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors'>
            <FiBell className='text-xl' />
            <span className='absolute top-2 right-2 w-2 h-2 bg-[#A855F7] rounded-full ring-2 ring-[#050505]'></span>
          </button>

          <div className='relative'>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className='flex items-center gap-3 pl-2 pr-1 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group'
            >
              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#A855F7] flex items-center justify-center text-[#FAFAFA] font-bold text-sm'>
                A
              </div>
              <span className='hidden sm:block text-xs font-semibold text-[#FAFAFA] pr-2 uppercase tracking-wider font-outfit'>Admin</span>
            </button>

            {showDropdown && (
              <div className='absolute right-0 mt-3 w-48 admin-glass rounded-xl shadow-2xl py-2 border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300'>
                <div className='px-4 py-2 border-b border-white/5 mb-2'>
                  <p className='text-xs font-bold text-[#A1A1A1] uppercase tracking-[1px]'>Admin Account</p>
                </div>
                <button className='w-full flex items-center gap-3 px-4 py-3 text-sm text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-white/5 transition-all text-left'>
                  <FiUser className='text-lg' />
                  <span>Profile Settings</span>
                </button>
                <button 
                  onClick={logOut}
                  className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-500 hover:bg-red-500/5 transition-all text-left'
                >
                  <FiLogOut className='text-lg' />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav


