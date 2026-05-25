import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import { buildOrderItems, computeShippingAndTotal, handleCOD, handleRazorpay } from '../pages/placeOrder.helpers'

export default function useOrderProcessor({ method, formData }) {
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products, promoCode, discount, free_delivery_threshold } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const orderItems = buildOrderItems(cartItem, products)
      const subtotal = getCartAmount()
      const { shippingFee } = computeShippingAndTotal(subtotal, free_delivery_threshold, delivery_fee, discount)

      const orderData = {
        address: formData,
        items: orderItems,
        amount: subtotal + shippingFee - discount,
        promoCode: promoCode,
        discount: discount
      }

      if (method === 'cod') {
        await handleCOD(orderData, { serverUrl, setCartItem, navigate })
      } else if (method === 'razorpay') {
        await handleRazorpay(orderData, { serverUrl, navigate, setCartItem })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { onSubmitHandler, loading }
}
