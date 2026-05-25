import React from 'react'
import Title from './Title'
import { RiExchangeLine, RiShieldLine, RiCustomerServiceLine } from "react-icons/ri";

function OurPolicy() {
  const policies = [
    {
      icon: RiExchangeLine,
      title: 'Rapid Exchange',
      desc: 'Hassle-free replacement policy within 30 days.'
    },
    {
      icon: RiShieldLine,
      title: 'Verified Quality',
      desc: 'Each item undergoes rigorous quality testing.'
    },
    {
      icon: RiCustomerServiceLine,
      title: 'Customer Support',
      desc: '24/7 dedicated assistance for all our customers.'
    }
  ]

  return (
    <section className='animate-fade-in'>
      <div className='text-center mb-24'>
        <Title text1="OUR" text2="GUARANTEES" />
        <p className='text-white/20 max-w-2xl mx-auto text-[10px] md:text-xs font-black uppercase tracking-[0.4em] leading-relaxed'>
          We ensure a seamless shopping experience with our dedicated support and quality checks.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
        {policies.map((p, i) => (
          <div key={i} className='bg-white/5 p-12 rounded-[40px] border border-white/5 group text-center space-y-8 hover:border-[#0ef]/30 transition-all duration-700'>
            <div className='w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 group-hover:border-[#0ef] group-hover:shadow-[0_0_30px_#0ef3] transition-all duration-1000'>
              <p.icon className='text-4xl text-[#0ef]/60 group-hover:text-[#0ef] transition-colors' />
            </div>
            <div className='space-y-3'>
                <h3 className='text-white text-lg font-black uppercase tracking-widest'>{p.title}</h3>
                <p className='text-white/30 text-[10px] leading-relaxed uppercase tracking-[2px] font-bold'>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
