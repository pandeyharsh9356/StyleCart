import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='flex items-center gap-6 mb-16 overflow-hidden'>
      <div className='flex flex-col md:flex-row md:items-baseline gap-3'>
        <h2 className='text-white/20 text-xs md:text-sm font-black tracking-[0.6em] uppercase leading-none'>{text1}</h2>
        <h2 className='text-white text-3xl md:text-5xl font-black tracking-tight uppercase leading-none'>{text2}</h2>
      </div>
      <div className='hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent relative'>
        <div className='absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[#0ef] shadow-[0_0_10px_#0ef]'></div>
      </div>
    </div>
  )
}

export default Title
