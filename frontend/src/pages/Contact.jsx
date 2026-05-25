import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'
import { RiMailSendLine, RiMapPinLine, RiPhoneLine, RiTerminalLine } from "react-icons/ri"

function Contact() {
  return (
    <div className='min-h-screen bg-black pt-[120px] pb-20 relative overflow-hidden'>
      {/* Background Ambience */}
      <div className='absolute top-0 right-0 w-[700px] h-[700px] bg-[#0ef] rounded-full blur-[200px] opacity-[0.02] pointer-events-none'></div>

      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        {/* Header Section */}
        <div className='flex flex-col items-center mb-24'>
          <p className='text-white/40 font-bold tracking-[0.4em] uppercase text-[10px] mb-4'>Support Center</p>
          <Title text1='CONTACT' text2='US' />
        </div>

        <div className='flex flex-col lg:flex-row gap-20 items-center mb-40'>
          {/* Visual Side */}
          <div className='lg:w-1/2 relative group'>
            <div className='relative rounded-[48px] overflow-hidden border border-white/5 shadow-2xll'>
              <img 
                src={contact} 
                alt="Support Interface" 
                className='w-full h-full object-cover brightness-50 group-hover:brightness-75 grayscale group-hover:grayscale-0 transition-all duration-1000' 
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent'></div>

              {/* Status Overlay */}
              <div className='absolute top-10 left-10'>
                <div className='bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3'>
                  <div className='w-2 h-2 bg-[#0ef] rounded-full animate-pulse'></div>
                  <p className='text-[#0ef] text-[10px] font-black uppercase tracking-[0.2em]'>Support Status: Online</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className='lg:w-1/2 space-y-10'>
            <div className='flex flex-col gap-8'>
              {[
                {
                  icon: RiMapPinLine,
                  label: 'Our Office',
                  value: 'StyleCart Mumbai, Maharashtra, India'
                },
                {
                  icon: RiPhoneLine,
                  label: 'Phone Number',
                  value: '+91 93722 17653'
                },
                {
                  icon: RiMailSendLine,
                  label: 'Email Address',
                  value: 'stylecart10@gmail.com'
                }
              ].map((item, i) => (
                <div key={i} className='flex items-start gap-8 group'>
                  <div className='w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#0ef] group-hover:shadow-[0_0_20px_#0ef4] transition-all duration-500 outline-none'>
                    <item.icon className='text-2xl text-[#0ef]' />
                  </div>
                  <div className='space-y-2 pt-2'>
                    <p className='text-white/40 text-[10px] font-bold uppercase tracking-widest'>{item.label}</p>
                    <p className='text-white text-lg font-medium'>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='p-10 bg-white/5 rounded-[40px] border border-white/10 space-y-8 relative overflow-hidden'>
               <div className='absolute top-0 right-0 w-32 h-32 bg-[#0ef] rounded-full blur-[60px] opacity-[0.05]'></div>
               <div className='relative z-10 space-y-4'>
                  <div className='flex items-center gap-3'>
                    <RiTerminalLine className='text-[#0ef] text-xl' />
                    <h3 className='text-white text-lg font-bold uppercase tracking-widest'>Join Our Team</h3>
                  </div>
                  <p className='text-white/40 text-xs leading-relaxed max-w-sm'>
                    Our creative and technical teams are always looking for talented individuals. Get in touch today.
                  </p>
                  <button className='glow-btn group px-10 py-4 rounded-full text-[10px] flex items-center gap-3 mt-6'>
                    Apply Now
                  </button>
               </div>
            </div>
          </div>
        </div>

        <NewLetterBox />
      </div>
    </div>
  )
}

export default Contact
