import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import useFetch from '../hooks/useFetch'
import { RiHistoryLine, RiRefreshLine, RiTimeLine, RiRecordCircleLine, RiCheckboxCircleLine, RiTruckLine, RiMapPin2Line } from "react-icons/ri";

const STAGES = ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const STATUS_COLORS = {
  "Pending": "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
  "Processing": "text-blue-400 border-blue-400/20 bg-blue-400/10",
  "Shipped": "text-purple-400 border-purple-400/20 bg-purple-400/10",
  "Out for Delivery": "text-orange-400 border-orange-400/20 bg-orange-400/10",
  "Delivered": "text-green-400 border-green-400/20 bg-green-400/10",
  "Cancelled": "text-red-400 border-red-400/20 bg-red-400/10"
};

const STAGE_ICONS = {
  "Pending": <RiTimeLine />,
  "Processing": <RiRecordCircleLine />,
  "Shipped": <RiTruckLine />,
  "Out for Delivery": <RiMapPin2Line />,
  "Delivered": <RiCheckboxCircleLine />
};

function Order() {
  const { data: orders, loading, error, refetch } = useFetch("/api/order/user-orders");
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getStageIndex = (status) => STAGES.indexOf(status);

  if (error) {
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center text-white'>
        <p className='text-red-500 mb-4'>Error: {error}</p>
        <button onClick={refetch} className='px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all'>Retry</button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black pt-32 pb-20 relative overflow-hidden'>
      {/* Background Ambience */}
      <div className='absolute top-0 right-0 w-[800px] h-[800px] bg-[#0ef] rounded-full blur-[250px] opacity-[0.02] pointer-events-none'></div>

      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6'>
          <div className='space-y-2'>
            <p className='text-[#0ef] font-black tracking-[6px] uppercase text-[10px] opacity-60'>User Dashboard</p>
            <Title text1='ORDER' text2='TRACKING' />
          </div>
          <div className='flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md'>
            <RiHistoryLine className='text-[#0ef] text-lg' />
            <p className='text-white/40 text-[10px] font-black uppercase tracking-[2px]'>{orders?.length || 0} Orders Found</p>
          </div>
        </div>

        <div className='space-y-8'>
          {loading ? (
             Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-white/5 rounded-[32px] animate-pulse border border-white/5" />
             ))
          ) : orders && orders.length > 0 ? (
            [...orders].reverse().map((order, index) => {
              const currentStageIndex = getStageIndex(order.deliveryStatus);
              const isCancelled = order.deliveryStatus === 'Cancelled';

              return (
                <div
                  key={order._id}
                  className='bg-white/5 rounded-[32px] p-8 border border-white/5 transition-all hover:border-white/10 group animate-fade-in'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Order Header */}
                  <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-3'>
                        <span className='px-3 py-1 bg-[#0ef2] text-[#0ef] text-[10px] font-black uppercase rounded-lg'>Order ID</span>
                        <p className='text-white/20 text-[10px] font-bold uppercase tracking-widest'>SC-{order._id.slice(-10).toUpperCase()}</p>
                      </div>
                      <p className='text-white/40 text-xs mt-1'>Placed on {new Date(order.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>

                    <div className='flex flex-wrap items-center gap-4'>
                       <span className={`px-3 py-1 rounded-md text-xs font-semibold backdrop-blur-md border ${STATUS_COLORS[order.deliveryStatus] || 'text-white/60 border-white/10 bg-white/5'}`}>
                        {order.deliveryStatus}
                      </span>
                      <div className='h-8 w-[1px] bg-white/5 hidden sm:block'></div>
                      <div className='space-y-0.5'>
                        <p className='text-[8px] text-white/20 font-black uppercase tracking-widest'>Total Amount</p>
                        <p className='text-white text-xl font-black font-mono'>{currency}{order.amount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
                    {order.items.map((item, idx) => {
                      const getImageUrl = (imgData) => {
                        if (!imgData) return null;
                        if (typeof imgData === 'string') return imgData;
                        if (Array.isArray(imgData) && imgData.length > 0) {
                          return typeof imgData[0] === 'string' ? imgData[0] : (imgData[0]?.secure_url || imgData[0]?.url || null);
                        }
                        if (typeof imgData === 'object') return imgData.secure_url || imgData.url || null;
                        return null;
                      };
                      const imgSrc = getImageUrl(item.image1) || (Array.isArray(item.image) ? getImageUrl(item.image[0]) : getImageUrl(item.image));

                      return (
                        <div key={idx} className='flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5'>
                          <div className='w-16 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0'>
                            <img src={imgSrc} alt={item.name} className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all' />
                          </div>
                          <div className='min-w-0'>
                            <p className='text-sm font-bold text-white truncate uppercase tracking-tight'>{item.name}</p>
                            <p className='text-[10px] text-white/40 font-medium uppercase mt-1'>{item.quantity} Units • {item.size}</p>
                            <p className='text-xs text-[#0ef] font-bold mt-1'>{currency}{item.exchange_rate}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Progress Tracker */}
                  {!isCancelled && (
                    <div className='relative pt-8 pb-4'>
                       {/* Desktop Tracker */}
                       <div className='hidden md:flex justify-between items-center relative'>
                         {/* Connector Line */}
                         <div className='absolute h-[2px] left-0 right-0 top-1/2 -translate-y-1/2 bg-white/5'>
                           <div 
                            className='h-full bg-[#0ef] transition-all duration-1000' 
                            style={{ width: `${(Math.max(0, currentStageIndex) / (STAGES.length - 1)) * 100}%` }}
                           />
                         </div>

                         {STAGES.map((stage, idx) => {
                           const isActive = idx <= currentStageIndex;
                           const isCurrent = idx === currentStageIndex;

                           return (
                             <div key={stage} className='relative z-10 flex flex-col items-center'>
                               <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                                 isCurrent ? 'bg-black border-[#0ef] shadow-[0_0_15px_#0ef]' : 
                                 isActive ? 'bg-[#0ef] border-[#0ef] text-black' : 
                                 'bg-black border-white/10 text-white/20'
                               }`}>
                                 {isCurrent ? <div className='w-2 h-2 rounded-full bg-[#0ef] animate-pulse' /> : (isActive ? <RiCheckboxCircleLine /> : STAGE_ICONS[stage])}
                               </div>
                               <p className={`text-[9px] font-black uppercase tracking-[2px] mt-4 ${isActive ? 'text-[#0ef]' : 'text-white/20'}`}>
                                 {stage}
                               </p>
                             </div>
                           )
                         })}
                       </div>

                       {/* Mobile Tracker (Vertical-ish / Compact) */}
                       <div className='md:hidden space-y-4'>
                          <div className='flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5'>
                            <div className='w-10 h-10 rounded-full bg-[#0ef]/10 flex items-center justify-center text-[#0ef]'>
                               {STAGE_ICONS[order.deliveryStatus] || <RiTruckLine />}
                            </div>
                            <div>
                               <p className='text-[10px] font-black text-white/40 uppercase tracking-[2px]'>Current Status</p>
                               <p className='text-sm font-bold text-white uppercase'>{order.deliveryStatus}</p>
                            </div>
                          </div>
                          <div className='flex gap-1 h-1.5 w-full bg-white/5 rounded-full overflow-hidden'>
                            {STAGES.map((_, idx) => (
                              <div key={idx} className={`flex-1 ${idx <= currentStageIndex ? 'bg-[#0ef]' : 'bg-transparent'}`} />
                            ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {isCancelled && (
                    <div className='bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex items-center gap-4'>
                       <div className='w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500'>
                         <RiTimeLine />
                       </div>
                       <div>
                         <p className='text-sm font-bold text-red-500 uppercase'>Order Cancelled</p>
                         <p className='text-[10px] text-red-500/60 uppercase tracking-widest'>This order has been cancelled and a refund is being processed if applicable.</p>
                       </div>
                    </div>
                  )}

                  <div className='flex justify-end mt-8'>
                    <button
                      onClick={() => navigate(`/contact`)}
                      className='text-[9px] font-black text-white/20 uppercase tracking-[3px] hover:text-[#0ef] transition-colors border-b border-transparent hover:border-[#0ef] pb-1'
                    >
                      Need Help? Contact Support
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='py-40 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center'>
              <RiHistoryLine className='text-white/10 text-6xl mb-8' />
              <h2 className='text-white text-xl font-bold uppercase tracking-widest mb-4'>No Orders Found</h2>
              <p className='text-white/30 text-xs uppercase tracking-widest mb-10'>You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/collection')}
                className='glow-btn px-12 py-4 rounded-full text-[10px]'
              >
                BROWSE COLLECTION
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
