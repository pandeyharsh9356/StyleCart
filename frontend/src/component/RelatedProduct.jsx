import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
    const { products } = useContext(shopDataContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            productsCopy = productsCopy.filter((item) => currentProductId !== item._id)
            setRelated(productsCopy.slice(0, 4))
        }
    }, [products, category, subCategory, currentProductId])

    if (related.length === 0) return null;

    return (
        <div className='space-y-12'>
            <Title text1='RELATED' text2='SYSTEMS' />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {related.map((item) => (
                   <Card 
                        key={item._id} 
                        id={item._id} 
                        name={item.name} 
                        exchange_rate={item.exchange_rate} 
                        image={item.image1} 
                        market_baseline={item.market_baseline} 
                    />
                ))}
            </div>
        </div>
    )
}

export default RelatedProduct
