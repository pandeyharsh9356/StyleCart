import { toast } from 'react-toastify'
import { FiPackage, FiTruck, FiActivity, FiMapPin, FiCreditCard, FiClock, FiBox } from 'react-icons/fi'

import useFetch from '../hooks/useFetch';
import usePost from '../hooks/usePost';
import AdminSelect from '../component/AdminSelect';

function Orders() {
  const { data: ordersData, loading, refetch } = useFetch('/api/order/list', { method: 'post' });
  const { mutate: updateStatus } = usePost('/api/order/status');
  
  const orders = Array.isArray(ordersData) ? ordersData : [];
  const reversedOrders = [...orders].reverse();

  const statusHandler = async (e, orderId) => {
    try {
      await updateStatus({ orderId, status: e.target.value }, {
        onSuccess: () => {
          toast.success("Status Updated");
          refetch();
        },
        onError: (err) => {
          toast.error(err || "Update failed");
        }
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='p-6 md:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1700px] mx-auto'>
      <div className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8'>
        <div className='space-y-3'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-[#FAFAFA] font-outfit tracking-tight'>
            Global <span className='admin-accent-text'>Logistics</span>
          </h1>
          <p className='text-[#888] text-sm font-medium tracking-wide'>Coordinating order fulfillment and transit across the network.</p>
        </div>
        <div className='flex items-center gap-4 admin-glass p-2 rounded-2xl'>
            <div className='flex flex-col items-end px-4 border-r border-white/5'>
                <span className='text-[8px] font-black uppercase tracking-[2px] text-[#888]'>Transit</span>
                <span className='text-xs font-bold text-[#4F46E5]'>{loading ? '...' : orders.filter(o => o.status === 'Shipped').length} Nodes</span>
            </div>
            <div className='flex flex-col items-end px-4'>
                <span className='text-[8px] font-black uppercase tracking-[2px] text-[#888]'>Queued</span>
                <span className='text-xs font-bold text-orange-500'>{loading ? '...' : orders.filter(o => o.status === 'Pending').length} Units</span>
            </div>
        </div>
      </div>

      <div className='space-y-10'>
        {loading ? (
            Array(3).fill(0).map((_, i) => (
                <div key={i} className="admin-card p-10 h-[400px] animate-pulse bg-white/5 border border-white/10" />
            ))
        ) : reversedOrders.length > 0 ? reversedOrders.map((order, index) => (
          <div 
            key={index} 
            className='admin-card group hover:border-[#4F46E5]/30 transition-all duration-700 relative'
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Status Accent Beam */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-1000 ${
                order.status === 'Delivered' ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 
                order.status === 'Shipped' ? 'bg-[#4F46E5] shadow-[0_0_15px_#4F46E5]' : 
                'bg-orange-500 shadow-[0_0_15px_#f59e0b]'
            }`} />

            <div className='p-10 flex flex-col xl:flex-row gap-12 items-start'>
              {/* Shipment Meta */}
              <div className='w-full xl:w-[400px] space-y-8'>
                <div className='flex items-center gap-5'>
                    <div className='w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl text-[#4F46E5] shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6'>
                        <FiPackage />
                    </div>
                    <div>
                        <h3 className='text-[10px] font-black text-[#888] uppercase tracking-[4px] mb-1'>Transmission ID</h3>
                        <p className='text-lg font-black text-[#FAFAFA] font-outfit tracking-wider uppercase'>SC-{order._id.slice(-10)}</p>
                    </div>
                </div>

                <div className='admin-glass p-6 rounded-3xl border border-white/5 space-y-6'>
                    <div className='flex items-start gap-4'>
                        <div className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mt-1'>
                            <FiMapPin className='text-[#888] text-xs' />
                        </div>
                        <div className='flex-1'>
                            <span className='block text-[9px] font-black text-[#4F46E5] uppercase tracking-[2px] mb-2'>Destination Protocol</span>
                            <p className='text-xs font-medium text-[#FAFAFA] leading-relaxed'>
                                <span className='font-black text-[10px] uppercase block mb-1'>{order.address.firstName} {order.address.lastName}</span>
                                {order.address.street}, {order.address.city}<br />
                                {order.address.state}, {order.address.zipcode}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 pt-4 border-t border-white/5'>
                        <div className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center'>
                            <FiActivity className='text-[#888] text-xs' />
                        </div>
                        <span className='text-[10px] font-black text-[#888] uppercase tracking-[2px]'>{order.address.phone}</span>
                    </div>
                </div>
              </div>

              {/* Order Logic & Items */}
              <div className='flex-1 w-full space-y-8'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-1 h-4 bg-[#FAFAFA] rounded-full'></div>
                        <h4 className='text-[10px] font-black text-[#FAFAFA] uppercase tracking-[3px]'>Payload Configuration</h4>
                    </div>
                    <span className='px-4 py-1.5 bg-white/5 rounded-full text-[9px] font-black text-[#888] uppercase tracking-[2px] border border-white/5'>{order.items.length} Modules</span>
                </div>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  {order.items.map((item, idx) => (
                    <div key={idx} className='flex items-center gap-5 p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-all group/item'>
                        <div className='w-14 h-18 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/10 group-hover/item:scale-105 transition-transform duration-500'>
                            <img src={item.image?.[0] || item.image1} alt="" className='w-full h-full object-cover opacity-80 group-hover/item:opacity-100' />
                        </div>
                        <div className='min-w-0'>
                            <p className='text-[12px] font-black text-[#FAFAFA] truncate font-outfit uppercase tracking-tight'>{item.name}</p>
                            <p className='text-[10px] font-bold text-[#888] uppercase tracking-[1px] mt-1'>
                                {item.quantity} UNITS · <span className='text-[#4F46E5]'>₹{item.exchange_rate}</span> · <span className='px-1.5 py-0.5 bg-white/5 rounded text-[#FAFAFA]'>{item.size}</span>
                            </p>
                        </div>
                    </div>
                  ))}
                </div>

                <div className='flex flex-wrap items-center gap-10 pt-10 border-t border-white/5'>
                     <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center justify-center text-2xl text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]'>
                            <FiCreditCard />
                        </div>
                        <div>
                            <span className='block text-[8px] font-black text-[#888] uppercase tracking-[3px] mb-1'>Valuation</span>
                            <span className='text-2xl font-black text-[#FAFAFA] font-outfit'>₹{order.amount}</span>
                        </div>
                     </div>
                     <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 rounded-2xl bg-[#4F46E5]/5 border border-[#4F46E5]/10 flex items-center justify-center text-2xl text-[#4F46E5] shadow-[0_0_20px_rgba(79,70,229,0.1)]'>
                            <FiClock />
                        </div>
                        <div>
                            <span className='block text-[8px] font-black text-[#888] uppercase tracking-[3px] mb-1'>Sync Time</span>
                            <span className='text-xs font-black text-[#FAFAFA] uppercase tracking-[1px]'>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                     </div>
                     <div className='flex items-center gap-3 ml-auto'>
                        <div className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[3px] shadow-2xl ${
                            order.payment ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                        }`}>
                            {order.payment ? 'Verified_Pay' : 'Queue_Pending'}
                        </div>
                     </div>
                </div>
              </div>

              {/* Protocol Controls */}
              <div className='w-full xl:w-[320px] space-y-8 pt-12 xl:pt-0'>
                <div className='space-y-4'>
                    <div className='flex justify-between items-center ml-1'>
                        <label className='text-[10px] font-black text-[#888] uppercase tracking-[4px]'>Protocol State</label>
                        <div className='w-2 h-2 rounded-full bg-[#4F46E5] shadow-[0_0_8px_#4F46E5]'></div>
                    </div>
                    <div className='relative group'>
                        <AdminSelect 
                            options={[
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Processing', label: 'Processing System' },
                                { value: 'Shipped', label: 'Dispatched Node' },
                                { value: 'Delivered', label: 'Sync Success' },
                                { value: 'Cancelled', label: 'Cancelled/Aborted' }
                            ]}
                            value={order.status}
                            onChange={(e) => statusHandler(e, order._id)}
                            icon={<FiBox className='text-lg' />}
                            className="h-16"
                        />
                    </div>
                </div>

                <div className='p-8 admin-glass border-white/5 rounded-3xl space-y-6 relative overflow-hidden group/status'>
                    <div className='absolute -right-10 -bottom-10 w-32 h-32 bg-[#4F46E5]/5 rounded-full blur-[60px]'></div>
                    <div className='flex items-center gap-4'>
                        <div className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_12px] ${
                            order.status === 'Delivered' ? 'bg-green-500 shadow-green-500' : 'bg-[#4F46E5] shadow-[#4F46E5]'
                        }`} />
                        <span className='text-[10px] font-black text-[#FAFAFA] uppercase tracking-[3px]'>Node Active</span>
                    </div>
                    <p className='text-[10px] font-bold text-[#888] leading-relaxed uppercase tracking-[1px] relative z-10'>
                        Secure end-to-end synchronization established. Monitoring transit vectors for optimal performance.
                    </p>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className='admin-card p-40 flex flex-col items-center justify-center gap-8'>
            <div className='w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-5xl text-[#1a1a1a] shadow-inner mb-4'>
                <FiTruck className='animate-float' />
            </div>
            <p className='text-[10px] font-black text-[#333] uppercase tracking-[10px] ml-3'>Logistics Grid Clear</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
