import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiArrowRightLine } from "react-icons/ri"

function Card({ name, image, id, exchange_rate, market_baseline }) {
  let { currency } = useContext(shopDataContext)
  let navigate = useNavigate()

  return (
    <div
      className='group cursor-pointer flex flex-col h-full bg-white/5 border border-white/5 rounded-[32px] overflow-hidden hover:border-[#0ef]/30 transition-all duration-700'
      onClick={() => navigate(`/product-detail/${id}`)}
    >
      <div className='relative aspect-[3/4] overflow-hidden bg-[#121212]'>
        <img 
          className='w-full h-full object-cover grayscale brightness-90 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100' 
          src={image} 
          alt={name} 
        />
        
        {/* Glow Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60'></div>
        
        {/* Rapid Action Button */}
        <div className='absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
            <div className='w-10 h-10 bg-[#0ef] rounded-xl flex items-center justify-center shadow-[0_0_20px_#0ef6]'>
                <RiArrowRightLine className='text-black text-xl' />
            </div>
        </div>

        {market_baseline && exchange_rate && Number(market_baseline) > Number(exchange_rate) && (
          <div className='absolute top-6 left-6'>
            <span className='px-3 py-1 bg-[#0ef2] backdrop-blur-md border border-[#0ef4] text-[#0ef] text-[8px] font-black uppercase tracking-[2px] rounded-lg'>
              -{Math.round(((market_baseline - exchange_rate) / market_baseline) * 100)}% Protocol
            </span>
          </div>
        )}
      </div>

      <div className='p-6 space-y-4'>
        <div className='space-y-1'>
          <p className='text-[8px] text-white/20 font-black uppercase tracking-[3px]'>Unit Designation</p>
          <h3 className='text-white font-bold text-sm leading-tight group-hover:text-[#0ef] transition-colors line-clamp-2 uppercase tracking-tight'>{name}</h3>
        </div>

        <div className='flex items-end justify-between'>
          <div className='flex items-baseline gap-2'>
            <p className='text-white text-xl font-black font-mono tracking-tighter italic'>
              {currency}{exchange_rate}
            </p>
            {market_baseline && (
              <p className='text-white/10 line-through text-[10px] font-mono'>
                {currency}{market_baseline}
              </p>
            )}
          </div>
          <p className='text-[7px] text-[#0ef] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity'>View Specs</p>
        </div>
      </div>
    </div>
  )
}

export default Card
