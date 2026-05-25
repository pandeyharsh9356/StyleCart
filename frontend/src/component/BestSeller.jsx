import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  const { products } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const filterProduct = products.filter((item) => item.bestseller)
    setBestSeller(filterProduct.slice(0, 4));
  }, [products])

  return (
    <section className='animate-fade-in'>
      <Title text1="BEST" text2="SELLERS" />
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
        {bestSeller.map((item, index) => (
          <div key={item._id} className='animate-fade-in' style={{ animationDelay: `${index * 150}ms` }}>
            <Card 
              name={item.name} 
              id={item._id} 
              exchange_rate={item.exchange_rate} 
              image={item.image1} 
              market_baseline={item.market_baseline} 
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default BestSeller
