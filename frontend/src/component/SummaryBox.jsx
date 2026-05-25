import React from 'react'
import CartTotal from '../component/CartTotal'

export default function SummaryBox({ couponInput, setCouponInput, applyPromoCode, promoCode }) {
  return (
    <div className='bg-white/5 rounded-[40px] p-10 border border-white/10 relative overflow-hidden backdrop-blur-xl'>
      <div className='absolute top-0 right-0 w-32 h-32 bg-[#0ef] rounded-full blur-[100px] opacity-10 pointer-events-none'></div>
      
      <p className='text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-10'>Transaction Summary</p>
      
      <CartTotal />

      <div className='mt-12 pt-8 border-t border-white/5 space-y-6'>
        <p className='text-white/20 uppercase tracking-[4px] font-black text-[8px]'>Optimization Protocols</p>
        <div className='flex gap-3'>
          <input
            type="text"
            placeholder='DISCOUNT CODE'
            className='flex-1 bg-black/40 text-white px-6 py-4 rounded-xl outline-none border border-white/10 focus:border-[#0ef] transition-all font-mono text-[10px] placeholder:opacity-20'
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button
            type="button"
            onClick={() => applyPromoCode(couponInput)}
            className='px-6 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all'
          >
            APPLY
          </button>
        </div>
        
        {promoCode && (
          <div className='flex items-center gap-2 text-[#0ef] text-[9px] font-bold uppercase tracking-widest animate-pulse'>
            <span className='w-1 h-1 bg-[#0ef] rounded-full shadow-[0_0_5px_#0ef]'></span>
            Protocol Active: {promoCode}
          </div>
        )}
      </div>
    </div>
  )
}
