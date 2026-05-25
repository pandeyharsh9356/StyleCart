import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line, RiShoppingCartLine, RiArrowRightLine } from "react-icons/ri";
import CartTotal from '../component/CartTotal';
import Loading from '../component/Loading'

function Cart() {
  const { products, currency, cartItem, updateQuantity, loading } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='min-h-screen bg-black pt-32 pb-20 relative overflow-hidden'>
      {/* Background Ambience */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-[#0ef] rounded-full blur-[250px] opacity-[0.02] pointer-events-none'></div>

      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8'>
          <Title text1='YOUR' text2='CART' />
          <div className='px-6 py-3 bg-white/5 rounded-full border border-white/10 hidden md:flex items-center gap-3'>
            <div className='w-1.5 h-1.5 bg-[#0ef] rounded-full animate-pulse'></div>
            <p className='text-white/40 text-[10px] font-bold uppercase tracking-widest'>{cartData.length} ITEMS</p>
          </div>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-16'>
          {/* Cart Items List */}
          <div className='xl:col-span-2 space-y-6'>
            {cartData.length > 0 ? (
              cartData.map((item) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className='bg-white/5 rounded-[32px] p-6 border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row items-center gap-8 group animate-fade-in'
                  >
                    <div className='w-32 h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0'>
                      <img className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700' src={productData.image1} alt={productData.name} />
                    </div>

                    <div className='flex-1 space-y-4'>
                      <div>
                        <h3 className='text-xl font-bold text-white uppercase tracking-tight'>{productData.name}</h3>
                        <p className='text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1'>Size: {item.size}</p>
                      </div>

                      <p className='text-2xl font-black text-white font-mono tracking-tighter'>
                        {currency}{productData.exchange_rate}
                      </p>
                    </div>

                    <div className='flex items-center gap-6'>
                      <div className='relative'>
                         <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          className='w-20 h-14 bg-black border border-white/10 text-white text-center rounded-xl outline-none focus:border-[#0ef] transition-all font-mono font-bold'
                          onChange={(e) => (e.target.value === '' || e.target.value === '0') ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                        />
                        <p className='absolute -top-2 left-1/2 -translate-x-1/2 bg-black px-2 text-[8px] text-white/40 font-bold uppercase tracking-widest'>Qty</p>
                      </div>

                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className='w-14 h-14 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-black rounded-xl transition-all duration-300 border border-red-500/20'
                        title="Remove Item"
                      >
                        <RiDeleteBin6Line className='text-xl' />
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='py-40 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center'>
                <RiShoppingCartLine className='text-white/10 text-6xl mb-8' />
                <h2 className='text-white text-xl font-bold uppercase tracking-widest mb-4'>Cart Empty</h2>
                <p className='text-white/30 text-xs uppercase tracking-widest mb-10'>No items in your cart yet</p>
                <button
                  onClick={() => navigate('/collection')}
                  className='glow-btn px-12 py-4 rounded-full text-[10px] flex items-center gap-3'
                >
                  BROWSE COLLECTIONS
                </button>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          {cartData.length > 0 && (
            <div className='space-y-8'>
              <div className='bg-white/5 p-10 rounded-[40px] border border-white/10 space-y-10'>
                <p className='text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]'>Order Summary</p>
                <CartTotal />
                <button
                  onClick={() => navigate("/place-order")}
                  disabled={loading}
                  className='glow-btn w-full py-6 rounded-2xl text-[10px] flex items-center justify-center gap-4 group'
                >
                  CHECKOUT
                  <RiArrowRightLine className='text-lg transition-transform group-hover:translate-x-1' />
                </button>

                <div className='pt-8 border-t border-white/5 space-y-4'>
                   <div className='flex items-center gap-3'>
                      <div className='w-1 h-1 bg-[#0ef] rounded-full animate-pulse'></div>
                      <p className='text-[8px] text-white/30 font-bold uppercase tracking-widest'>Secure Checkout</p>
                   </div>
                   <div className='flex items-center gap-3'>
                      <div className='w-1 h-1 bg-white/10 rounded-full'></div>
                      <p className='text-[8px] text-white/30 font-bold uppercase tracking-widest'>Verified Payment Gateway</p>
                   </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/collection')}
                className='w-full text-center text-white/30 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors py-4'
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
