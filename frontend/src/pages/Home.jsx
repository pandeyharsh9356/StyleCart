import React, { useEffect, useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  const heroData = [
    { text1: "Seasonal Protocol v2.6", text2: "Precision Crafted Tech-Wear" },
    { text1: "Neural Sync Active", text2: "Innovative Architecture" },
    { text1: "Data Stream Online", text2: "Elite Urban Equipment" },
    { text1: "System Update Ready", text2: "Digital Nomad Essentials" }
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='overflow-x-hidden min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='w-full h-screen bg-black relative overflow-hidden'>
        <Background heroCount={heroCount} />
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0'></div>
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </section>

      {/* Main Content Sections */}
      <main className='max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-40 md:gap-60 pb-40 relative z-10'>
        <Product />
        <OurPolicy />
      </main>
      
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
