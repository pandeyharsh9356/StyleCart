import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full space-y-32'>
      <LatestCollection />
      <BestSeller />
    </div>
  )
}

export default Product
