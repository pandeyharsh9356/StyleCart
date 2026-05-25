import React from 'react'

export default function DeliveryForm({ formData, onChangeHandler }) {
  return (
    <div className='space-y-12 animate-fade-in'>
      <div className='space-y-8'>
        <p className='text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]'>System Deployment Data</p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Primary Identity</p>
            <input 
              type="text" 
              placeholder='First Name' 
              name='firstName'
              value={formData.firstName}
              onChange={onChangeHandler}
              required
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
            />
          </div>
          <div className='space-y-2'>
            <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Secondary Identity</p>
            <input 
              type="text" 
              placeholder='Last Name' 
              name='lastName'
              value={formData.lastName}
              onChange={onChangeHandler}
              required
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Digital Uplink (Email)</p>
          <input 
            type="email" 
            placeholder='authenticated@protocol.net' 
            name='email'
            value={formData.email}
            onChange={onChangeHandler}
            required
            className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
          />
        </div>

        <div className='space-y-2'>
          <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Physical Vector (Address)</p>
          <input 
            type="text" 
            placeholder='Street Address' 
            name='street'
            value={formData.street}
            onChange={onChangeHandler}
            required
            className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Sector (City)</p>
            <input 
              type="text" 
              placeholder='City' 
              name='city'
              value={formData.city}
              onChange={onChangeHandler}
              required
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
            />
          </div>
          <div className='space-y-2'>
            <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Region (State)</p>
            <input 
              type="text" 
              placeholder='State' 
              name='state'
              value={formData.state}
              onChange={onChangeHandler}
              required
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Postal Encrypt (Pin)</p>
            <input 
              type="text" 
              placeholder='000000' 
              name='pinCode'
              value={formData.pinCode}
              onChange={onChangeHandler}
              required
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
            />
          </div>
          <div className='space-y-2'>
            <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Global Domain (Country)</p>
            <input 
              type="text" 
              placeholder='Country' 
              name='country'
              value={formData.country}
              onChange={onChangeHandler}
              required
              className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <p className='text-[9px] text-white/30 uppercase font-black tracking-widest ml-1'>Comms Frequency (Phone)</p>
          <input 
            type="text" 
            placeholder='+00 000 000 0000' 
            name='phone'
            value={formData.phone}
            onChange={onChangeHandler}
            required
            className='w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#0ef] transition-all'
          />
        </div>
      </div>
    </div>
  )
}
