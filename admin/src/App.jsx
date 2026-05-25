import React, { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer } from 'react-toastify';

import Sidebar from './component/Sidebar'
import Nav from './component/Nav'

function App() {
  const { adminData } = useContext(adminDataContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <ToastContainer />
      {!adminData ? <Login /> : (
        <div className='flex h-screen overflow-hidden bg-transparent'>
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <div className='flex-1 flex flex-col min-w-0'>
            <Nav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className='flex-1 overflow-y-auto w-full pb-10 custom-scrollbar'>
              <div className='animate-in fade-in slide-in-from-bottom-2 duration-700'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/add' element={<Add />} />
                  <Route path='/lists' element={<Lists />} />
                  <Route path='/orders' element={<Orders />} />
                  <Route path='/analytics' element={<Analytics />} />
                  <Route path='/settings' element={<div className='p-12 text-[#888] font-outfit uppercase tracking-[3px] font-bold'>System Matrix: Locked</div>} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default App
