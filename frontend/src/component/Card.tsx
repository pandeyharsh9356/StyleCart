import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

interface CardProps {
  name: string;
  image: string;
  id: string;
  exchange_rate: number | string;
  market_baseline?: number | string;
}

const Card: React.FC<CardProps> = ({ name, image, id, exchange_rate, market_baseline }) => {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  const price = Number(exchange_rate)
  const originalPrice = market_baseline ? Number(market_baseline) : null
  
  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div
      className='group cursor-pointer flex flex-col h-full bg-white/5 border border-white/5 rounded-[32px] overflow-hidden hover:border-[#0ef]/30 transition-all duration-700'
      onClick={() => navigate(`/product-detail/${id}`)}
    >
      {/* Discount Badge */}
      {discount && (
        <div className='absolute top-3 left-3 z-10 bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg'>
          {discount}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className='relative aspect-[4/5] overflow-hidden bg-neutral-100'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
        />
        
        {/* Hover Overlay */}
        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center'>
          <div className='bg-white text-neutral-900 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl'>
            View Details
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-4 flex-1 flex flex-col gap-2'>
        <div className='space-y-1'>
          <h3 className='text-sm font-semibold text-neutral-900 truncate group-hover:text-primary-500 transition-colors'>
            {name}
          </h3>
          <p className='text-xs text-neutral-500'>Premium Collection</p>
        </div>
        
        <div className='mt-auto flex items-baseline gap-2'>
          <span className='text-lg font-bold text-neutral-900'>
            {currency}{price.toLocaleString()}
          </span>
          {originalPrice && originalPrice > price && (
            <span className='text-xs text-neutral-400 line-through'>
              {currency}{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
