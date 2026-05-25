import React from 'react'
import razorpay from '../assets/Razorpay.jpg'

export default function PaymentSelector({ method, setMethod }) {
  return (
    <div className='space-y-8'>
      <p className='text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]'>Financial Gateway</p>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <button
          onClick={() => setMethod('razorpay')}
          className={`relative group h-24 rounded-3xl border-2 transition-all p-6 flex items-center justify-center ${method === 'razorpay' ? 'border-[#0ef] bg-[#0ef]/5 shadow-[0_0_30px_#0ef2]' : 'border-white/5 hover:border-white/10'}`}
        >
          <img src={razorpay} className={`h-8 object-contain transition-all duration-700 ${method === 'razorpay' ? '' : 'grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0'}`} alt="Razorpay" />
          {method === 'razorpay' && <div className='absolute top-3 right-3 w-1.5 h-1.5 bg-[#0ef] rounded-full shadow-[0_0_10px_#0ef] animate-pulse'></div>}
        </button>

        <button
          onClick={() => setMethod('cod')}
          className={`relative group h-24 rounded-3xl border-2 transition-all flex flex-col items-center justify-center ${method === 'cod' ? 'border-[#0ef] bg-[#0ef]/5 shadow-[0_0_30px_#0ef2]' : 'border-white/5 hover:border-white/10'}`}
        >
          <span className={`text-[10px] font-black uppercase tracking-[2px] ${method === 'cod' ? 'text-[#0ef]' : 'text-white/20'}`}>Pay on Delivery</span>
          <span className={`text-[8px] uppercase tracking-widest mt-1 ${method === 'cod' ? 'text-[#0ef]/40' : 'text-white/10'}`}>Manual Protocol</span>
          {method === 'cod' && <div className='absolute top-3 right-3 w-1.5 h-1.5 bg-[#0ef] rounded-full shadow-[0_0_10px_#0ef] animate-pulse'></div>}
        </button>
      </div>
    </div>
  )
}
