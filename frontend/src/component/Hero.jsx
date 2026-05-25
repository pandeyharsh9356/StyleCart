import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiArrowRightLine } from "react-icons/ri"

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate();

  return (
    <div className='w-full lg:w-[65%] h-full relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24'>
      <div className='max-w-3xl animate-fade-in space-y-10'>
        <div className='space-y-4'>
            <p className='text-[#0ef] text-[10px] sm:text-xs font-black tracking-[0.5em] uppercase opacity-70'>
            {heroData.text1}
            </p>
            
            <h1 className='text-white text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-black leading-[0.85] uppercase tracking-tighter'>
            {heroData.text2.split(' ').map((word, i) => (
                <span key={word + i} className={i === 1 ? 'text-[#0ef] block drop-shadow-[0_0_30px_#0ef4]' : 'block'}>
                {word}
                </span>
            ))}
            </h1>
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-10 pt-4'>
          <button
            onClick={() => navigate('/collection')}
            className='glow-btn group px-14 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4 w-full sm:w-auto justify-center hover:shadow-[0_0_50px_#0ef5]'
          >
            DISCOVER COLLECTION
            <RiArrowRightLine className='text-lg transition-transform group-hover:translate-x-2' />
          </button>
          
          <div className='flex items-center gap-4'>
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                className={`h-1 transition-all duration-700 rounded-full ${heroCount === idx ? 'w-16 bg-[#0ef] shadow-[0_0_10px_#0ef]' : 'w-6 bg-white/10 hover:bg-white/30'}`}
                onClick={() => setHeroCount(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-[#0ef]/30 to-transparent hidden lg:block'></div>
    </div>
  )
}

export default Hero
