import { useState, useContext, useEffect } from 'react'
import { authDataContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { FiBox, FiShoppingBag, FiLayers, FiSettings, FiPlusCircle, FiTrendingUp, FiUsers, FiDollarSign } from 'react-icons/fi'
import AdminCard from '../component/AdminCard'
import { fetchProductCount, fetchOrderCount } from '../utils/api'

import useFetch from '../hooks/useFetch';

function Home() {
  const navigate = useNavigate()
  
  const { data: products, loading: productsLoading } = useFetch('/api/product/list');
  const { data: orders, loading: ordersLoading } = useFetch('/api/order/list', { method: 'post' });
  const { data: users, loading: usersLoading } = useFetch('/api/user/list');

  const totalProducts = Array.isArray(products) ? products.length : 0;
  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const totalUsers = Array.isArray(users) ? users.length : 0;

  // Only include paid OR delivered orders in revenue
  const validOrders = Array.isArray(orders) 
    ? orders.filter(order => order.payment === true || order.status === 'Delivered') 
    : [];
  const revenue = validOrders.reduce((acc, order) => acc + (order.amount || 0), 0);

  const formatCurrency = (amount) => {
      if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
      if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`;
      return `₹${amount}`;
  };

  useEffect(() => {
    if (!ordersLoading && orders) {
       console.log("Dashboard [Frontend Debug]: Fetched raw orders ->", orders.length);
       console.log("Dashboard [Frontend Debug]: Valid Revenue Orders ->", validOrders.length);
       console.log("Dashboard [Frontend Debug]: Formatted Revenue ->", formatCurrency(revenue));
    }
  }, [ordersLoading, orders, validOrders, revenue]);

  return (
    <div className='p-6 md:p-8 lg:p-12 animate-in fade-in duration-700 max-w-[1600px] mx-auto'>
      {/* Header Section */}
      <div className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <h1 className='text-4xl md:text-5xl font-extrabold text-[#FAFAFA] font-outfit tracking-tight leading-tight'>
            System <span className='admin-accent-text'>Intelligence</span>
          </h1>
          <p className='text-[#888] mt-3 text-sm font-medium tracking-wide'>
            Synchronizing global assets and logistics across the StyleCart network.
          </p>
        </div>
        <div className='flex items-center gap-4 admin-glass p-2 rounded-2xl'>
            <div className='flex flex-col items-end px-4 border-r border-white/5'>
                <span className='text-[8px] font-black uppercase tracking-[2px] text-[#888]'>Uptime</span>
                <span className='text-xs font-bold text-green-500'>99.98%</span>
            </div>
            <div className='flex flex-col items-end px-4'>
                <span className='text-[8px] font-black uppercase tracking-[2px] text-[#888]'>Region</span>
                <span className='text-xs font-bold text-[#FAFAFA]'>Global-01</span>
            </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
        <MetricCard
          title="Revenue Flux"
          value={ordersLoading ? "..." : formatCurrency(revenue)}
          trend="+12.5%"
          icon={<FiDollarSign />}
          color="#4F46E5"
          loading={ordersLoading}
        />
        <MetricCard
          title="Pipeline Orders"
          value={totalOrders}
          trend="+3 New"
          icon={<FiShoppingBag />}
          color="#10B981"
          onClick={() => navigate('/orders')}
          loading={ordersLoading}
        />
        <MetricCard
          title="Catalog Assets"
          value={totalProducts}
          trend="+2 New"
          icon={<FiBox />}
          color="#A855F7"
          onClick={() => navigate('/lists')}
          loading={productsLoading}
        />
        <MetricCard
          title="Terminal Users"
          value={totalUsers}
          trend="+5.2%"
          icon={<FiUsers />}
          color="#F59E0B"
          loading={usersLoading}
        />
      </div>

      {/* Dynamic Activity & Actions */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
        
        {/* Command Center */}
        <div className='xl:col-span-2 admin-card p-10 relative overflow-hidden group'>
          <div className='absolute -right-20 -top-20 w-64 h-64 bg-[#4F46E5]/5 rounded-full blur-[100px] group-hover:bg-[#4F46E5]/10 transition-all duration-700'></div>
          
          <div className='flex items-center justify-between mb-10'>
            <div className='flex items-center gap-4'>
                <div className='w-1 h-8 bg-[#4F46E5] rounded-full drop-shadow-[0_0_10px_#4F46E5]'></div>
                <h3 className='text-[#FAFAFA] font-bold uppercase tracking-[3px] text-xs font-outfit'>Command Center</h3>
            </div>
            <div className='flex gap-2'>
                <div className='w-1.5 h-1.5 rounded-full bg-white/20'></div>
                <div className='w-1.5 h-1.5 rounded-full bg-white/20'></div>
                <div className='w-1.5 h-1.5 rounded-full bg-[#4F46E5]'></div>
            </div>
          </div>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <ActionCard icon={<FiPlusCircle />} label="Deploy Product" to="/add" color="#4F46E5" desc="Add new assets" />
            <ActionCard icon={<FiLayers />} label="Inventory" to="/lists" color="#A855F7" desc="Manage catalog" />
            <ActionCard icon={<FiShoppingBag />} label="Logistics" to="/orders" color="#10B981" desc="Track shipments" />
            <ActionCard icon={<FiSettings />} label="Terminal" to="/settings" color="#888" desc="Configure nodes" />
          </div>
        </div>

        {/* System Health Monitor */}
        <div className='admin-card p-10 flex flex-col justify-between border-white/5'>
           <div>
             <div className='flex items-center gap-3 mb-6'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]'></div>
                <p className='text-[#FAFAFA] text-[10px] font-black uppercase tracking-[3px] font-outfit'>Core Status: Synchronized</p>
             </div>
             
             <div className='space-y-6'>
                <div className='space-y-2'>
                    <div className='flex justify-between text-[8px] font-bold text-[#888] uppercase tracking-[1px]'>
                        <span>Processor Load</span>
                        <span>12%</span>
                    </div>
                    <div className='w-full h-1 bg-white/5 rounded-full overflow-hidden'>
                        <div className='h-full bg-[#4F46E5] w-[12%] rounded-full shadow-[0_0_10px_#4F46E5]'></div>
                    </div>
                </div>
                <div className='space-y-2'>
                    <div className='flex justify-between text-[8px] font-bold text-[#888] uppercase tracking-[1px]'>
                        <span>Network Latency</span>
                        <span>14ms</span>
                    </div>
                    <div className='w-full h-1 bg-white/5 rounded-full overflow-hidden'>
                        <div className='h-full bg-green-500 w-[14%] rounded-full shadow-[0_0_10px_#10B981]'></div>
                    </div>
                </div>
             </div>
           </div>

           <Link 
             to='/analytics'
             className='mt-10 group flex items-center justify-between p-4 bg-[#FAFAFA]/5 hover:bg-[#FAFAFA]/10 rounded-2xl transition-all border border-white/5 hover:border-white/10'
           >
             <span className='text-white text-[10px] font-bold uppercase tracking-[2px] ml-2'>Deep Analytics</span>
             <div className='w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#4F46E5]/20 group-hover:text-[#4F46E5] transition-all'>
                <FiTrendingUp className='text-sm' />
             </div>
           </Link>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, trend, icon, color, onClick, loading }) {
    return (
        <AdminCard 
            title={title}
            value={value}
            trend={trend}
            icon={icon}
            color={color}
            onClick={onClick}
            loading={loading}
            className={`group flex flex-col justify-between min-h-[180px] ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            <div className='flex justify-between items-start'>
                <div className='p-3 rounded-2xl bg-white/5 text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12' style={{ color }}>
                    {icon}
                </div>
                <div className='flex flex-col items-end'>
                    <span className='text-[10px] font-black uppercase tracking-[2px] text-[#888] mb-1'>{title}</span>
                    <span className='text-2xl font-black text-[#FAFAFA] font-outfit'>{value}</span>
                </div>
            </div>
            
            <div className='mt-6 flex items-end justify-between'>
                <div className='w-24 h-10'>
                    <TrendChart color={color} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trend}
                </span>
            </div>
        </AdminCard>
    )
}

function TrendChart({ color }) {
    return (
        <svg viewBox="0 0 100 40" className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500">
            <path 
                d="M0 35 Q 20 10, 40 25 T 80 5 T 100 20" 
                fill="none" 
                stroke={color} 
                strokeWidth="3" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_var(--chart-color)]"
                style={{ "--chart-color": color }}
            />
        </svg>
    )
}

function ActionCard({ icon, label, to, color, desc }) {
  return (
    <Link 
      to={to} 
      className='relative overflow-hidden flex flex-col items-start p-6 bg-white/[0.02] border border-white/5 rounded-3xl gap-4 hover:bg-white/[0.05] hover:border-[#4F46E5]/30 transition-all duration-500 group'
    >
      <div 
        className='p-4 rounded-2xl bg-white/5 text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6'
        style={{ color: color }}
      >
        {icon}
      </div>
      <div>
        <span className='block text-[10px] font-black text-[#FAFAFA] uppercase tracking-[2px] mb-1'>
            {label}
        </span>
        <span className='text-[8px] font-bold text-[#888] uppercase tracking-[1px]'>
            {desc}
        </span>
      </div>
      <div className='absolute bottom-4 right-6 opacity-0 group-hover:opacity-40 transition-opacity'>
        <div className='w-1.5 h-1.5 rounded-full' style={{ background: color }}></div>
      </div>
    </Link>
  )
}

export default Home


