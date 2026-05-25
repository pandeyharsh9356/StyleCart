import React, { useContext } from 'react' // UI System Refresh Protocol v1.1
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound'
import Ai from './component/Ai'
function App() {
  let { userData } = useContext(userDataContext)
  let location = useLocation()

  return (
    <>
      <ToastContainer />
      {userData && <Nav />}
      {/* Global Spacer for Fixed Nav (excludes Home) */}
      {userData && location.pathname !== '/' && <div className='h-[80px] md:h-[100px] w-full'></div>}
      <Routes>

        <Route path='/login'
          element={userData ? (<Navigate to={location.state?.from || "/"} />)
            : (<Auth />)
          } />

        <Route path='/signup'
          element={userData ? (<Navigate to={location.state?.from || "/"} />)
            : (<Auth />)} />

        <Route path='/'
          element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path='/about'
          element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path='/collection'
          element={userData ? <Collections /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path='/product'
          element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path='/contact'
          element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/product-detail/:productId'
          element={userData ? <ProductDetail /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path='/cart'
          element={userData ? <Cart /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path='/place-order'
          element={userData ? <PlaceOrder /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/order'
          element={userData ? <Order /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Ai />
    </>
  )
}

export default App
