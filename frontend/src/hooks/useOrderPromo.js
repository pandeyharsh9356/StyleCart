import { useState, useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

export default function useOrderPromo() {
  const { applyPromoCode, promoCode } = useContext(shopDataContext)
  const [couponInput, setCouponInput] = useState('')
  return { couponInput, setCouponInput, applyPromoCode, promoCode }
}
