import axios from 'axios'
import { toast } from 'react-toastify'

export const buildOrderItems = (cart, products) => {
  const items = []
  for (const productId in cart) {
    const sizes = cart[productId]
    for (const size in sizes) {
      const qty = sizes[size]
      if (qty > 0) {
        const product = products.find(p => p._id === productId)
        if (product) {
          const itemClone = structuredClone(product)
          itemClone.size = size
          itemClone.quantity = qty
          items.push(itemClone)
        }
      }
    }
  }
  return items
}

export const computeShippingAndTotal = (subtotal, freeDeliveryThreshold, deliveryFee, discount) => {
  const isFreeDelivery = subtotal >= freeDeliveryThreshold && subtotal > 0
  const shippingFee = isFreeDelivery ? 0 : deliveryFee
  const total = subtotal + shippingFee - discount
  return { isFreeDelivery, shippingFee, total }
}

export const initPay = ({ order, serverUrl, navigate, setCartItem }) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
      if (data) {
        navigate('/order')
        setCartItem({})
      }
    }
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}

export const postPlaceOrder = (orderData, serverUrl) => axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
export const postRazorpayOrder = (orderData, serverUrl) => axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })

export const handleCOD = async (orderData, { serverUrl, setCartItem, navigate }) => {
  const result = await postPlaceOrder(orderData, serverUrl)
  if (result.data) {
    setCartItem({})
    toast.success("Deployment Successful")
    navigate("/order")
  } else {
    toast.error("Deployment Protocol Failure")
  }
}

export const handleRazorpay = async (orderData, { serverUrl, navigate, setCartItem }) => {
  const resultRazorpay = await postRazorpayOrder(orderData, serverUrl)
  if (resultRazorpay.data) {
    initPay({ order: resultRazorpay.data, serverUrl, navigate, setCartItem })
    toast.success("Payment Gateway Initialized")
  }
}