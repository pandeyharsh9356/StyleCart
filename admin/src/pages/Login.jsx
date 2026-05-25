import React, { useContext, useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminInput from '../component/ui/AdminInput';
import AdminButton from '../component/ui/AdminButton';
import usePost from '../hooks/usePost';

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [shake, setShake] = useState(false)
  const { setAdminData } = useContext(adminDataContext)
  const navigate = useNavigate()
  
  const { mutate: login, loading } = usePost('/api/auth/admin-login');

  const handleLogin = async (e) => {
    e.preventDefault()
    setShake(false)
    
    try {
      await login({ 
        email: email.trim(), 
        password: password.trim() 
      }, {
        onSuccess: (data) => {
          toast.success("Welcome back, Admin!");
          setAdminData(data.user || data.admin || true);
          navigate("/");
        },
        onError: (err) => {
            setShake(true)
            toast.error(err || "Authentication Failed");
            // Reset shake after animation
            setTimeout(() => setShake(false), 500)
        }
      });
    } catch (error) {
      console.error(error)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#050505] text-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden font-sans'>
      {/* Background Glow Blobs */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4F46E5]/10 rounded-full blur-[120px] animate-pulse'></div>
        <div className='absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#A855F7]/10 rounded-full blur-[120px] animate-pulse duration-[4000ms]'></div>
        <div className='absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#4F46E5]/5 rounded-full blur-[80px]'></div>
      </div>

      <div className={`w-full max-w-[480px] relative z-10 transition-all duration-700 animate-slide-up ${shake ? 'animate-shake' : ''}`}>
        {/* Branding Section */}
        <div className='flex flex-col items-center mb-12'>
          <div className='w-20 h-20 admin-glass rounded-[28px] flex items-center justify-center mb-8 shadow-3xl border-white/10 group hover:rotate-6 transition-transform duration-500'>
             <div className='absolute inset-0 bg-[#4F46E5]/10 blur-xl group-hover:bg-[#4F46E5]/20 transition-all'></div>
            <img src={logo} alt="Logo" className='w-10 object-contain relative z-10' />
          </div>
          <div className='text-center space-y-2'>
            <h1 className='text-4xl font-black tracking-[6px] uppercase text-[#FAFAFA] font-outfit'>
              Style<span className='admin-accent-text'>Cart</span>
            </h1>
            <div className='flex items-center gap-3 justify-center'>
                <div className='w-8 h-[1px] bg-white/10'></div>
                <p className='text-[10px] font-black text-[#666] tracking-[5px] uppercase'>Admin Terminal</p>
                <div className='w-8 h-[1px] bg-white/10'></div>
            </div>
          </div>
        </div>

        {/* Login Container */}
        <div className='admin-glass rounded-[40px] p-10 md:p-14 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden'>
           {/* Subtle Light Scan Effect */}
           <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out'></div>

          <div className='mb-10 text-center md:text-left'>
            <h2 className='text-3xl font-black text-[#FAFAFA] font-outfit mb-3 uppercase tracking-tight'>Access Portal</h2>
            <p className='text-[#888] text-xs font-bold uppercase tracking-[2px] leading-relaxed'>Initialize security synchronization</p>
          </div>

          <form onSubmit={handleLogin} className='space-y-8'>
            <AdminInput
              label="Communication ID"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AdminInput
              label="Central Keyphrase"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightElement={
                <button 
                  type="button"
                  className='p-2 text-[#444] hover:text-[#4F46E5] transition-colors duration-300' 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                </button>
              }
            />

            <div className='pt-4'>
                <AdminButton
                    type="submit"
                    loading={loading}
                >
                    Authorize Session
                </AdminButton>
            </div>
          </form>

          <footer className='mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4'>
             <div className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse'></div>
                <p className='text-[9px] text-[#555] font-black uppercase tracking-[2px]'>System Status: Operational</p>
             </div>
             <p className='text-[8px] text-[#333] font-bold uppercase tracking-[4px]'>Encrypted by StyleCart-Alpha</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Login
