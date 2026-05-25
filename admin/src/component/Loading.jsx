import React from 'react'

const Loading = () => {
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/60 backdrop-blur-xl'>
        <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <div className="w-20 h-20 border-4 border-white/5 border-t-[#4F46E5] rounded-full animate-spin"></div>
            
            {/* Inner Ring (Reverse) */}
            <div className="absolute w-12 h-12 border-4 border-white/5 border-t-[#A855F7] rounded-full animate-spin-slow"></div>
            
            {/* Center Glow */}
            <div className="absolute w-4 h-4 bg-[#4F46E5] rounded-full shadow-[0_0_20px_#4F46E5] animate-pulse"></div>
        </div>
    </div>
  )
}

export default Loading
