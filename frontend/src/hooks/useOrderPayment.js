import { useState } from 'react'

export default function useOrderPayment(initial = 'cod') {
  const [method, setMethod] = useState(initial)
  return { method, setMethod }
}
