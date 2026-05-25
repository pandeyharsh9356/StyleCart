import { useState } from 'react'

export default function useOrderForm(initial = null) {
  const [formData, setFormData] = useState(initial || {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return { formData, setFormData, onChangeHandler }
}
