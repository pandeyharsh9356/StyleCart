import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { RiFacebookFill, RiTwitterXFill, RiInstagramLine, RiLinkedinFill, RiShieldCheckLine, RiSecurePaymentLine } from "react-icons/ri"
import { SiVisa, SiMastercard, SiPaypal, SiRazorpay } from "react-icons/si"

function Footer() {
    const navigate = useNavigate()
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    const footerLinks = {
        Navigation: [
            { name: 'Latest Arrivals', path: '/collection' },
            { name: 'Best Sellers', path: '/collection' }
        ],
        Company: [
            { name: 'About Us', path: '/about' },
            { name: 'Contact Us', path: '/contact' },
            { name: 'Our Mission', path: '/about' }
        ],
        Support: [
            { name: 'My Orders', path: '/order' },
            { name: 'Return Policy', path: '#' },
            { name: 'Privacy Policy', path: '#' }
        ]
    }

    return (
        <footer className='bg-black border-t border-white/5 pt-32 pb-16 relative overflow-hidden'>
            {/* Background Ambience */}
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-[#0ef] rounded-full blur-[150px] opacity-[0.02] pointer-events-none'></div>

            <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24'>
                    {/* Brand Section */}
                    <div className='lg:col-span-3 space-y-10'>
                        <div className='flex items-center gap-4 cursor-pointer group' onClick={() => { navigate('/'); scrollToTop() }}>
                            <div className='w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-[#0ef] transition-all duration-700'>
                                <img src={logo} alt="StyleCart" className='w-8 grayscale brightness-200' />
                            </div>
                            <div>
                                <h1 className='text-xl font-black text-white uppercase tracking-widest leading-none'>Style<span className='text-[#0ef]'>Cart</span></h1>
                                <p className='text-[8px] text-[#0ef] font-black uppercase tracking-[4px] mt-1 opacity-60'>Style Authority</p>
                            </div>
                        </div>
                        
                        <p className='text-white/30 text-xs uppercase tracking-[2px] leading-relaxed max-w-sm font-medium'>
                            Pioneering the next evolution of street-wear. High-performance apparel for the modern world. Secure checkout guaranteed.
                        </p>

                        <div className='flex gap-4'>
                            {[RiFacebookFill, RiTwitterXFill, RiInstagramLine, RiLinkedinFill].map((Icon, i) => (
                                <a key={i} href="#" className='w-10 h-10 border border-white/5 bg-white/5 rounded-xl flex items-center justify-center hover:border-[#0ef] hover:text-[#0ef] transition-all group/icon'>
                                    <Icon className='text-lg opacity-40 group-hover/icon:opacity-100' />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className='space-y-8'>
                            <h3 className='text-[9px] font-black tracking-[0.4em] uppercase text-white/20'>{title}</h3>
                            <ul className='space-y-4'>
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <button 
                                            onClick={() => { if(link.path !== '#') navigate(link.path); scrollToTop() }}
                                            className='text-[10px] text-white/40 hover:text-[#0ef] transition-all uppercase font-bold tracking-widest'
                                        >
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Status Bar */}
                <div className='pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12'>
                    <div className='flex flex-wrap justify-center items-center gap-10'>
                        <div className='flex items-center gap-3 text-white/20'>
                            <RiShieldCheckLine className='text-xl text-[#0ef]/40' />
                            <span className='text-[9px] uppercase font-black tracking-[3px]'>Secure Payment</span>
                        </div>
                        <div className='flex items-center gap-3 text-white/20'>
                            <RiSecurePaymentLine className='text-xl text-[#0ef]/40' />
                            <span className='text-[9px] uppercase font-black tracking-[3px]'>SSL Encrypted</span>
                        </div>
                    </div>

                    {/* Pay-gateways */}
                    <div className='flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-700'>
                         <SiVisa className='text-2xl hover:text-white transition-colors' />
                         <SiMastercard className='text-2xl hover:text-white transition-colors' />
                         <SiPaypal className='text-2xl hover:text-white transition-colors' />
                         <SiRazorpay className='text-2xl hover:text-[#0ef] transition-colors' />
                    </div>
                </div>

                <div className='mt-20 flex flex-col items-center gap-4'>
                    <div className='w-1 h-1 bg-[#0ef] rounded-full shadow-[0_0_10px_#0ef] animate-pulse'></div>
                    <p className='text-[8px] text-white/10 font-black uppercase tracking-[8px]'>
                        &copy; 2026 StyleCart. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
