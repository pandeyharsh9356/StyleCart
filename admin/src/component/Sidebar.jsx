import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { FiPlusCircle, FiList, FiBox, FiGrid, FiSettings, FiPieChart, FiShoppingBag, FiX } from "react-icons/fi"
import logo from "../assets/logo.png"

function Sidebar({ isOpen, setIsOpen }) {
    return (
        <>
            {/* Overlay for Mobile */}
            {isOpen && (
                <div 
                    className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300'
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed md:relative inset-y-0 left-0 z-50 md:z-30
                w-[280px] h-full flex flex-col bg-[#050505] border-r border-white/5 
                transition-transform duration-500 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Branding */}
                <div className='h-[100px] flex items-center justify-between px-8 mb-4'>
                    <Link to="/" className='flex items-center gap-3 group'>
                        <div className='w-10 h-10 admin-glass rounded-xl flex items-center justify-center group-hover:border-[#4F46E5]/40 transition-all duration-500 shadow-lg shadow-[#4F46E5]/5'>
                            <img src={logo} alt="StyleCart Logo" className='w-6 object-contain' />
                        </div>
                        <div>
                            <h1 className='text-base font-extrabold tracking-[2px] uppercase text-[#FAFAFA] font-outfit'>
                                Style<span className='text-[#4F46E5]'>Cart</span>
                            </h1>
                            <p className='text-[8px] font-bold text-[#A1A1A1] tracking-[3px] uppercase'>Management</p>
                        </div>
                    </Link>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className='md:hidden p-2 text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors'
                    >
                        <FiX className='text-xl' />
                    </button>
                </div>

                {/* Navigation */}
                <nav className='flex-1 flex flex-col gap-8 px-6 py-4 overflow-y-auto'>
                    <div onClick={() => setIsOpen(false)}>
                        <p className='text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[3px] mb-6 ml-2'>Overview</p>
                        <div className='flex flex-col gap-2'>
                            <SidebarLink to='/' icon={<FiGrid />} label='Dashboard' />
                            <SidebarLink to='/analytics' icon={<FiPieChart />} label='Analytics' />
                        </div>
                    </div>

                    <div onClick={() => setIsOpen(false)}>
                        <p className='text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[3px] mb-6 ml-2'>Catalog</p>
                        <div className='flex flex-col gap-2'>
                            <SidebarLink to='/lists' icon={<FiShoppingBag />} label='Products' />
                            <SidebarLink to='/add' icon={<FiPlusCircle />} label='New Product' />
                        </div>
                    </div>

                    <div onClick={() => setIsOpen(false)}>
                        <p className='text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[3px] mb-6 ml-2'>Sales</p>
                        <div className='flex flex-col gap-2'>
                            <SidebarLink to='/orders' icon={<FiBox />} label='Orders' />
                        </div>
                    </div>
                </nav>

                {/* Bottom Footer */}
                <div className='p-6 border-t border-white/5' onClick={() => setIsOpen(false)}>
                    <SidebarLink to='/settings' icon={<FiSettings />} label='Settings' />
                </div>
            </aside>
        </>
    )
}

function SidebarLink({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
                group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 border border-transparent
                ${isActive
                    ? 'bg-gradient-to-r from-[#4F46E5]/10 to-transparent text-[#FAFAFA] border-white/10 shadow-lg shadow-[#4F46E5]/5'
                    : 'text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-white/[0.03]'
                }
            `}
        >
            {({ isActive }) => (
                <>
                    <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${to === '/' ? 'text-[#4F46E5]' : ''}`}>
                        {icon}
                    </span>
                    <span className='font-bold tracking-[1px] text-[11px] uppercase font-outfit'>
                        {label}
                    </span>
                    {isActive && (
                        <div className="ml-auto w-1 h-4 bg-[#4F46E5] rounded-full shadow-[0_0_8px_#4F46E5]" />
                    )}
                </>
            )}
        </NavLink>
    )
}

export default Sidebar


