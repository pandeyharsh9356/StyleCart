import React from 'react'
import Title from '../component/Title'
import about from '../assets/about_new.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='min-h-screen bg-black pt-[120px] pb-20 relative overflow-hidden'>
      {/* Background Decorative Elements */}
      <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-[#0ef] rounded-full blur-[250px] opacity-[0.02] pointer-events-none'></div>

      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        {/* Header Section */}
        <div className='flex flex-col items-center mb-24'>
          <p className='text-[#0ef] font-bold tracking-[0.4em] uppercase text-[10px] mb-4'>Our Story</p>
          <Title text1='OUR' text2='STORY' />
        </div>

        {/* Story Section */}
        <div className='flex flex-col lg:flex-row gap-20 items-center mb-40'>
          <div className='lg:w-1/2 w-full'>
            <div className='relative aspect-[4/5] rounded-[48px] overflow-hidden border border-white/5 shadow-2xl'>
              <img 
                src={about} 
                alt="Architecture" 
                className='w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000' 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>
              <div className='absolute bottom-8 left-8 right-8'>
                <div className='bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10'>
                  <p className='text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-3'>Established 2024</p>
                  <p className='text-white text-sm leading-relaxed font-medium italic'>
                    "Crafting the intersection of modern technology and cutting-edge street aesthetics."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:w-1/2 w-full space-y-12'>
            <div className='space-y-6'>
              <div className='inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full'>
                <div className='w-2 h-2 bg-[#0ef] rounded-full animate-pulse'></div>
                <p className='text-white text-[10px] font-bold uppercase tracking-[0.2em]'>Our Mission</p>
              </div>
              <h2 className='text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none'>
                Redefining <br /> <span className='text-[#0ef]'>Urban Apparel.</span>
              </h2>
              <p className='text-white/50 text-base md:text-lg leading-relaxed font-medium max-w-xl'>
                StyleCart emerged from a necessity to bridge the gap between technical performance and everyday urban utility. Our mission is to equip the modern citizen with gear that survives the elements while maintaining a sharp aesthetic profile.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='p-8 bg-white/5 rounded-[32px] border border-white/10 space-y-4'>
                <p className='text-white font-bold uppercase tracking-widest'>Our Goal</p>
                <p className='text-white/40 text-xs leading-relaxed'>
                  Connect every individual with their ideal style through a seamless shopping experience.
                </p>
              </div>
              <div className='p-8 bg-white/5 rounded-[32px] border border-white/10 space-y-4'>
                <p className='text-white font-bold uppercase tracking-widest'>Our Standard</p>
                <p className='text-white/40 text-xs leading-relaxed'>
                  Continuous iteration of our catalog to ensure only high-quality pieces reach our customers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className='mb-40'>
          <div className='text-center mb-20'>
            <p className='text-white/40 font-bold tracking-[0.4em] uppercase text-[10px] mb-4'>Our Values</p>
            <Title text1='CORE' text2='VALUES' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: "Quality First",
                desc: "Every product undergoes rigorous quality checks before shipping to our customers.",
                index: "01"
              },
              {
                title: "Seamless Experience",
                desc: "A streamlined website designed for ease of use and a rapid checkout experience.",
                index: "02"
              },
              {
                title: "Customer Support",
                desc: "Our dedicated support team ensures 24/7 assistance for all your questions or concerns.",
                index: "03"
              }
            ].map((v, i) => (
              <div key={i} className='futuristic-card p-10 rounded-[40px] group relative'>
                <p className='text-[#0ef] font-mono text-sm font-bold mb-6 opacity-40 group-hover:opacity-100 transition-opacity'>//{v.index}</p>
                <h3 className='text-white text-xl font-bold uppercase tracking-widest mb-4'>{v.title}</h3>
                <p className='text-white/40 text-sm leading-relaxed font-medium'>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <NewLetterBox />
      </div>
    </div>
  )
}

export default About
