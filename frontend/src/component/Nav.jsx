import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { RiSearchLine, RiMenu4Line, RiCloseLine, RiUserLine, RiShoppingCartLine } from "react-icons/ri"
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Nav() {
    const { getCurrentUser, userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    const [visible, setVisible] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            getCurrentUser()
            toast.success("Logout Successful")
            navigate("/login")
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
                <div className='max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between'>
                    {/* Brand */}
                    <div className='flex items-center gap-4 cursor-pointer group' onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                        <div className='relative w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#0ef] transition-all transform group-hover:rotate-[360deg] duration-1000'>
                            <img className='w-8 grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all' src={logo} alt="Logo" />
                        </div>
                        <div className='hidden sm:block'>
                             <h1 className='text-lg font-black text-white uppercase tracking-widest'>Style<span className='text-[#0ef]'>Cart</span></h1>
                             <p className='text-[7px] text-white/20 font-black uppercase tracking-[4px]'>Style Authority</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className='hidden lg:flex items-center gap-12'>
                        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((path) => {
                            const to = path === 'HOME' ? '/' : `/${path.toLowerCase()}`;
                            const isActive = location.pathname === to;
                            return (
                                <NavLink
                                    key={path}
                                    to={to}
                                    className={`text-[9px] font-black tracking-[0.4em] transition-all hover:text-[#0ef] relative py-2 ${isActive ? "text-[#0ef]" : "text-white/40"}`}
                                >
                                    {path}
                                    {isActive && <span className='absolute bottom-0 left-0 w-full h-[1px] bg-[#0ef] shadow-[0_0_10px_#0ef]'></span>}
                                </NavLink>
                            )
                        })}
                    </div>

                    {/* Actions */}
                    <div className='flex items-center gap-8'>
                        <div className='flex items-center gap-2'>
                            <button 
                                className='w-10 h-10 flex items-center justify-center text-white/30 hover:text-[#0ef] transition-all rounded-xl hover:bg-white/5'
                                onClick={() => { setShowSearch(!showSearch); if (!showSearch) navigate("/collection") }}
                            >
                                <RiSearchLine className='text-xl' />
                            </button>

                            <button 
                                className='w-10 h-10 flex items-center justify-center text-white/30 hover:text-[#0ef] transition-all rounded-xl hover:bg-white/5 relative'
                                onClick={() => navigate("/cart")}
                            >
                                <RiShoppingCartLine className='text-xl' />
                                {getCartCount() > 0 && (
                                    <span className='absolute top-2 right-2 w-1.5 h-1.5 bg-[#0ef] rounded-full shadow-[0_0_8px_#0ef] animate-pulse'></span>
                                )}
                            </button>
                        </div>

                        {/* Profile Section */}
                        <div className='hidden md:block relative group'>
                            <div className='w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:border-[#0ef] transition-all cursor-pointer bg-white/5 overflow-hidden group-hover:bg-[#0ef1]'>
                                <RiUserLine className='text-xl text-white/30 group-hover:text-[#0ef]' />
                            </div>
                            
                            {/* Dropdown Card */}
                            <div className='absolute right-0 top-[120%] w-64 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0'>
                                <div className='p-6 border-b border-white/5'>
                                    <p className='text-[8px] text-white/20 font-black uppercase tracking-[3px] mb-2'>Account Email</p>
                                    <p className='text-xs text-white truncate font-bold'>{userData?.email || 'Guest User'}</p>
                                </div>
                                <div className='p-3 space-y-1'>
                                    {userData ? (
                                        <>
                                            <button onClick={() => navigate("/order")} className='w-full text-left px-4 py-4 hover:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-[#0ef] transition-all'>Order History</button>
                                            <button onClick={handleLogout} className='w-full text-left px-4 py-4 hover:bg-red-500/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-all'>Logout</button>
                                        </>
                                    ) : (
                                        <button onClick={() => navigate("/login")} className='w-full text-left px-4 py-4 bg-[#0ef1] hover:bg-[#0ef2] border border-[#0ef2] rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#0ef] transition-all'>Login</button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button className='lg:hidden w-10 h-10 flex items-center justify-center text-white/40' onClick={() => setVisible(true)}>
                            <RiMenu4Line className='text-2xl' />
                        </button>
                    </div>
                </div>

                {/* Search Overlay */}
                {showSearch && (
                    <div className='absolute top-full left-0 w-full animate-fade-in'>
                        <div className='bg-black/90 backdrop-blur-3xl border-b border-white/5 py-12'>
                            <div className='max-w-[1440px] mx-auto px-6'>
                                <div className='relative max-w-3xl mx-auto'>
                                    <RiSearchLine className='absolute left-6 top-1/2 -translate-y-1/2 text-[#0ef] text-xl opacity-40' />
                                    <input
                                        type="text"
                                        className='w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-20 text-white outline-none focus:border-[#0ef] transition-all font-mono text-sm uppercase tracking-widest placeholder:opacity-20'
                                        placeholder='SEARCH OUR COLLECTION...'
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                        autoFocus
                                    />
                                    <button 
                                        className='absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all text-2xl'
                                        onClick={() => setShowSearch(false)}
                                    >
                                        <RiCloseLine />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Futuristic Drawer */}
            <aside className={`fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl transition-all duration-700 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col h-full p-12'>
                    <div className='flex items-center justify-between mb-24'>
                        <div className='flex items-center gap-4'>
                            <img className='w-10 grayscale brightness-200' src={logo} alt="Logo" />
                            <h1 className='text-xl font-black text-white uppercase tracking-widest'>Style<span className='text-[#0ef]'>Cart</span></h1>
                        </div>
                        <button onClick={() => setVisible(false)} className='w-12 h-12 flex items-center justify-center border border-white/10 rounded-2xl text-white hover:border-[#0ef] hover:text-[#0ef] transition-all'>
                            <RiCloseLine className='text-3xl' />
                        </button>
                    </div>
                    
                    <div className='flex flex-col gap-12'>
                        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((path, idx) => (
                            <NavLink
                                key={path}
                                onClick={() => setVisible(false)}
                                className='group flex items-end gap-6 overflow-hidden'
                                to={path === 'HOME' ? '/' : `/${path.toLowerCase()}`}
                            >
                                <span className='text-xs text-white/10 font-bold mb-3'>0{idx + 1}</span>
                                <span className='text-6xl md:text-8xl font-black text-white/20 group-hover:text-[#0ef] transition-all group-hover:translate-x-4 duration-500 uppercase tracking-tighter'>
                                    {path}
                                </span>
                            </NavLink>
                        ))}
                    </div>

                    <div className='mt-auto pt-12 border-t border-white/5 flex items-center justify-between'>
                        <p className='text-[10px] text-white/20 font-black tracking-[0.4em] uppercase'>Transmission: Secure</p>
                        <RiUserLine className='text-white/10 text-2xl' />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Nav
