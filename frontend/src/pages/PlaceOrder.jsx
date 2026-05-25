import React, { useEffect } from 'react'
import DeliveryForm from '../component/DeliveryForm'
import SummaryBox from '../component/SummaryBox'
import PaymentSelector from '../component/PaymentSelector'
import useOrderForm from '../hooks/useOrderForm'
import useOrderPayment from '../hooks/useOrderPayment'
import useOrderPromo from '../hooks/useOrderPromo'
import useOrderProcessor from '../hooks/useOrderProcessor'
import Title from '../component/Title'

function PlaceOrder() {
  const { formData, onChangeHandler } = useOrderForm()
  const { method, setMethod } = useOrderPayment()
  const { couponInput, setCouponInput, applyPromoCode, promoCode } = useOrderPromo()
  const { onSubmitHandler, loading } = useOrderProcessor({ method, formData })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className='min-h-screen bg-black pt-32 pb-20 relative overflow-hidden'>
      {/* Background Ambience */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-[#0ef] rounded-full blur-[250px] opacity-[0.02] pointer-events-none'></div>

      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        <div className='mb-16'>
           <Title text1='CHECKOUT' text2='VAULT' />
        </div>

        <div className='flex flex-col lg:flex-row gap-20'>
          <div className='flex-1'>
            <DeliveryForm
              formData={formData}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
              loading={loading}
            />
          </div>

          <div className='lg:w-[450px] space-y-12'>
            <SummaryBox
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              applyPromoCode={applyPromoCode}
              promoCode={promoCode}
            />

            <PaymentSelector method={method} setMethod={setMethod} />
            
            <button
              onClick={onSubmitHandler}
              disabled={loading}
              className='glow-btn w-full py-6 rounded-2xl text-[10px]'
            >
              {loading ? 'PROCESSING...' : 'FINALIZE SHIPMENT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
