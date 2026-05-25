import React from 'react';
import useFetch from '../hooks/useFetch';
import { 
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import AdminCard from '../component/AdminCard';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#A855F7', '#EF4444'];

function Analytics() {
    const { data, loading, error } = useFetch('/api/admin/analytics');

    const formatCurrency = (amount) => {
        if (!amount) return '₹0';
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
        if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`;
        return `₹${amount}`;
    };

    if (loading) {
        return (
            <div className='p-12 text-[#888] font-outfit uppercase tracking-[3px] font-bold animate-pulse'>
                Initializing Neural Link... Fetching Analytics...
            </div>
        );
    }

    if (error) {
        return (
            <div className='p-12 text-red-500 font-outfit uppercase tracking-[3px] font-bold'>
                Node Offline: {error}
            </div>
        );
    }

    if (!data) return null;

    // Transform Pie Chart Data
    const pieData = Object.keys(data.orderStatusStats).map(key => ({
        name: key,
        value: data.orderStatusStats[key]
    }));

    return (
        <div className='p-6 md:p-8 lg:p-12 animate-in fade-in duration-700 max-w-[1600px] mx-auto'>
            {/* Header Section */}
            <div className='mb-12 flex flex-col justify-between gap-6'>
                <div>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-[#FAFAFA] font-outfit tracking-tight leading-tight'>
                        Deep <span className='admin-accent-text'>Analytics</span>
                    </h1>
                    <p className='text-[#888] mt-3 text-sm font-medium tracking-wide'>
                        Strategic intelligence center. Transforming raw data into actionable insights.
                    </p>
                </div>
            </div>

            {/* Top Row: Metric Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <AdminCard 
                    title="Total Revenue" 
                    value={formatCurrency(data.totalRevenue)} 
                    icon={<FiDollarSign />} color="#4F46E5" 
                    className="flex flex-col justify-center min-h-[140px]"
                >
                    <div className='flex items-center gap-4'>
                        <div className='p-4 rounded-2xl bg-[#4F46E5]/10 text-[#4F46E5] text-3xl'><FiDollarSign /></div>
                        <div>
                            <p className='text-[10px] font-black uppercase tracking-[2px] text-[#888]'>Total Revenue</p>
                            <p className='text-3xl font-bold text-[#FAFAFA] font-outfit'>{formatCurrency(data.totalRevenue)}</p>
                        </div>
                    </div>
                </AdminCard>
                <AdminCard 
                    title="Total Orders" 
                    value={data.totalOrders} 
                    icon={<FiShoppingBag />} color="#10B981" 
                    className="flex flex-col justify-center min-h-[140px]"
                >
                    <div className='flex items-center gap-4'>
                        <div className='p-4 rounded-2xl bg-[#10B981]/10 text-[#10B981] text-3xl'><FiShoppingBag /></div>
                        <div>
                            <p className='text-[10px] font-black uppercase tracking-[2px] text-[#888]'>Pipeline Orders</p>
                            <p className='text-3xl font-bold text-[#FAFAFA] font-outfit'>{data.totalOrders}</p>
                        </div>
                    </div>
                </AdminCard>
                <AdminCard 
                    title="Total Users" 
                    value={data.totalUsers} 
                    icon={<FiUsers />} color="#F59E0B" 
                    className="flex flex-col justify-center min-h-[140px]"
                >
                    <div className='flex items-center gap-4'>
                        <div className='p-4 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] text-3xl'><FiUsers /></div>
                        <div>
                            <p className='text-[10px] font-black uppercase tracking-[2px] text-[#888]'>Terminal Users</p>
                            <p className='text-3xl font-bold text-[#FAFAFA] font-outfit'>{data.totalUsers}</p>
                        </div>
                    </div>
                </AdminCard>
            </div>

            {/* Middle Row: Line Chart and Bar Chart */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                <div className='admin-card p-6 h-[400px] flex flex-col'>
                    <h3 className='text-white text-xs font-bold uppercase tracking-[2px] mb-6 flex items-center gap-2'>
                        <FiTrendingUp className="text-[#4F46E5]" /> Revenue Flux
                    </h3>
                    <div className='flex-1 w-full h-full min-h-[300px] relative'>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.revenueByDate}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis dataKey="date" stroke="#888" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '12px' }} itemStyle={{ color: '#4F46E5' }} />
                                <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#050505', stroke: '#4F46E5', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#4F46E5' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className='admin-card p-6 h-[400px] flex flex-col'>
                    <h3 className='text-white text-xs font-bold uppercase tracking-[2px] mb-6 flex items-center gap-2'>
                        <FiShoppingBag className="text-[#10B981]" /> Order Velocity
                    </h3>
                    <div className='flex-1 w-full h-full min-h-[300px] relative'>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.ordersByDate}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis dataKey="date" stroke="#888" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '12px' }} itemStyle={{ color: '#10B981' }} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Pie Chart and Top Products */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='admin-card p-6 h-[400px] flex flex-col justify-between'>
                    <h3 className='text-white text-xs font-bold uppercase tracking-[2px] mb-2 border-b border-white/10 pb-4'>
                        Fulfillment Ratio
                    </h3>
                    {pieData.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-[#888] text-xs font-bold uppercase tracking-widest">No Data Logged</div>
                    ) : (
                        <div className='flex-1 w-full h-full min-h-[300px] relative'>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '12px' }} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', color: '#888' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                <div className='admin-card p-6 lg:col-span-2 overflow-y-auto no-scrollbar max-h-[400px]'>
                    <h3 className='text-white text-xs font-bold uppercase tracking-[2px] mb-6 border-b border-white/10 pb-4'>
                        Top Movers / High Revenue Assets
                    </h3>
                    {data.topProducts.length === 0 ? (
                        <div className="py-20 flex justify-center text-[#888] text-xs font-bold uppercase tracking-widest">No Sales Found</div>
                    ) : (
                        <div className='flex flex-col gap-4'>
                            {data.topProducts.map((product, idx) => (
                                <div key={idx} className='flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-8 h-8 rounded-full bg-[#FAFAFA]/10 flex items-center justify-center font-outfit font-black text-[#888] text-xs'>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className='text-sm text-[#FAFAFA] font-bold'>{product.name}</p>
                                            <p className='text-[10px] font-bold text-[#888] uppercase tracking-wider'>Units Sold: {product.totalQuantitySold}</p>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-sm font-black text-[#FAFAFA] font-outfit'>{formatCurrency(product.totalRevenue)}</p>
                                        <p className='text-[8px] font-black uppercase tracking-[2px] text-green-500'>Revenue</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Analytics;
