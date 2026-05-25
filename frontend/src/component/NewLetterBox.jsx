import React, { useState } from 'react'
import axios from 'axios'
import { RiMailSendLine } from "react-icons/ri"

function NewLetterBox() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/subscriber/subscribe", { email })
      alert(response.data.message)
      setEmail("")
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Failed to subscribe. Please try again later.")
    }
  }

  return (
    <section className='w-full py-40 bg-[#050505] border-y border-white/5 relative overflow-hidden'>
      {/* Dynamic Background Accents */}
      <div className='absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none'>
          <div className='absolute top-1/2 left-1/4 w-96 h-96 bg-[#0ef] rounded-full blur-[180px] opacity-10'></div>
          <div className='absolute bottom-1/2 right-1/4 w-96 h-96 bg-white rounded-full blur-[180px] opacity-[0.05]'></div>
      </div>
      
      <div className='max-w-[1440px] mx-auto px-6 md:px-12 relative z-10'>
        <div className='flex flex-col items-center text-center max-w-4xl mx-auto space-y-12'>
          <div className='space-y-6'>
            <h2 className='text-white text-4xl md:text-6xl font-black uppercase tracking-tight leading-none'>
              JOIN THE <span className='text-[#0ef] drop-shadow-[0_0_20px_#0ef6]'>NETWORK</span>
            </h2>
            <p className='text-white/30 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] leading-relaxed max-w-2xl mx-auto'>
              Gain access to limited drops, priority Intel, and technical equipment releases.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-3 rounded-[32px] border border-white/10 focus-within:border-[#0ef]/50 transition-all duration-700 shadow-2xl'>
            <div className='flex-1 w-full flex items-center px-8 gap-6'>
              <RiMailSendLine className='text-[#0ef] text-2xl opacity-40' />
              <input
                type="email"
                placeholder='NEURAL IDENTIFIER (EMAIL)'
                className='w-full bg-transparent text-white py-5 outline-none font-mono text-xs uppercase tracking-[3px] placeholder:text-white/10'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='glow-btn group px-14 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-[20%] flex items-center gap-3 w-full sm:w-auto justify-center hover:scale-[1.02] transition-transform'
            >
              SUBSCRIBE
            </button>
          </form>

          <div className='flex items-center gap-6 opacity-20'>
              <div className='w-12 h-[1px] bg-gradient-to-l from-white to-transparent'></div>
              <p className='text-[8px] text-white font-black uppercase tracking-[6px]'>
                SECURE TRANSMISSION ENABLED
              </p>
              <div className='w-12 h-[1px] bg-gradient-to-r from-white to-transparent'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewLetterBox
