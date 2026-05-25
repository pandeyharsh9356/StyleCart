import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount, free_delivery_threshold, discount } = useContext(shopDataContext)
  const isFreeDelivery = getCartAmount() >= free_delivery_threshold && getCartAmount() > 0;
  const shippingFee = isFreeDelivery ? 0 : delivery_fee;
  const subtotal = getCartAmount();
  const total = subtotal > 0 ? subtotal + shippingFee - discount : 0;

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <p className='uppercase tracking-widest text-[9px] text-white/30 font-bold'>Subtotal</p>
          <p className='text-white/60 font-mono font-bold'>{currency}{subtotal.toLocaleString()}.00</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='uppercase tracking-widest text-[9px] text-white/30 font-bold'>Transit Fee</p>
          <div className='flex items-center gap-3'>
            {isFreeDelivery && (
              <span className='px-2 py-0.5 bg-[#0ef2] text-[#0ef] text-[8px] font-black uppercase rounded'>Free Protocol</span>
            )}
            <p className='text-white/60 font-mono font-bold'>{currency}{shippingFee.toLocaleString()}.00</p>
          </div>
        </div>

        {discount > 0 && (
          <div className='flex justify-between items-center'>
            <p className='uppercase tracking-widest text-[9px] text-[#0ef] font-bold'>Rebate</p>
            <p className='text-[#0ef] font-mono font-bold'>-{currency}{discount.toLocaleString()}.00</p>
          </div>
        )}

        <div className='h-[1px] bg-white/5'></div>

        <div className='flex justify-between items-end'>
          <div className='space-y-1'>
            <p className='text-white/20 uppercase tracking-widest font-black text-[8px]'>Total Payload</p>
            <p className='text-white font-black text-xs uppercase tracking-widest'>Net Transaction</p>
          </div>
          <p className='text-white text-3xl font-black font-mono tracking-tighter'>
            {currency}{total.toLocaleString()}.00
          </p>
        </div>

        {total > 0 && !isFreeDelivery && (
          <p className='text-[8px] text-[#0ef] uppercase tracking-widest text-right italic opacity-60'>
            Add {currency}{free_delivery_threshold - subtotal} for zero-fee logistics
          </p>
        )}
      </div>
    </div>
  )
}

export default CartTotal
