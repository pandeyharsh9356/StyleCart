import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products])

  return (
    <section className='animate-fade-in'>
      <Title text1="LATEST" text2="ARRIVALS" />
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20'>
        {latestProducts.map((item, index) => (
          <div key={item._id} className='animate-fade-in' style={{ animationDelay: `${index * 100}ms` }}>
            <Card 
              name={item.name} 
              image={item.image1} 
              id={item._id} 
              exchange_rate={item.exchange_rate} 
              market_baseline={item.market_baseline} 
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default LatestCollection
