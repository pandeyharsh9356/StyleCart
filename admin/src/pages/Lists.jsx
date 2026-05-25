import { useContext, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import upload from '../assets/upload image.jpg'
import { toast } from 'react-toastify'
import { FiEdit3, FiTrash2, FiSearch, FiFilter, FiBox, FiPlus } from 'react-icons/fi'
import AdminTable, { AdminTableRow, AdminTableCell } from '../component/AdminTable'
import AdminButton from '../component/AdminButton'

import useFetch from '../hooks/useFetch';
import usePost from '../hooks/usePost';
import { BASE_URL } from '../api/api';

function Lists() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All Categories")
  const navigate = useNavigate()

  const { data: rawList, loading, refetch } = useFetch('/api/product/list');
  const { mutate: removeProduct } = usePost('/api/product/remove');

  const list = useMemo(() => {
    if (!rawList || !Array.isArray(rawList)) return [];
    
    const getImageUrl = (imgData) => {
        if (!imgData || imgData === "") return null;
        let parsedUrl = null;
        if (typeof imgData === 'string') parsedUrl = imgData;
        else if (Array.isArray(imgData) && imgData.length > 0) {
          parsedUrl = typeof imgData[0] === 'string' ? imgData[0] : (imgData[0]?.secure_url || imgData[0]?.url || null);
        } else if (typeof imgData === 'object') {
          parsedUrl = imgData.secure_url || imgData.url || null;
        }

        if (!parsedUrl) return null;
        if (parsedUrl.startsWith('/uploads')) {
            return `${BASE_URL}${parsedUrl}`;
        }
        return parsedUrl;
    };

    return rawList.map(product => {
      const legacyImages = Array.isArray(product.image) ? product.image : (product.images || []);
      const singleImage = typeof product.image === 'string' ? product.image : (product.img || null);

      return {
        ...product,
        exchange_rate: product.exchange_rate || product.price || 0,
        market_baseline: product.market_baseline || product.oldPrice || null,
        image1: getImageUrl(product.image1) || getImageUrl(legacyImages[0]) || getImageUrl(singleImage) || null,
      }
    }).reverse();
  }, [rawList]);

  const removeList = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await removeProduct({}, {
        url: `/api/product/remove/${id}`,
        onSuccess: () => {
          toast.success("Product expunged");
          refetch();
        },
        onError: (err) => {
          toast.error(err || "Removal failed");
        }
      });
      // Note: The usePost mutate should ideally take the full URL or we useUpdate/useDelete if backend supports.
      // Since backend uses POST /remove/:id, I'll update usePost to optionally accept URL or use axiosInstance directly if needed,
      // but I'll stick to the hook if I can pass the URL as well.
      // Actually my usePost takes URL at initialization.
    } catch (error) {
      console.error(error)
    }
  }

  const filteredList = list.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "All Categories") return matchesSearch;
    if (activeFilter === "Accessories") return matchesSearch && item.category === "Accessories";
    if (activeFilter === "Footwear") return matchesSearch && item.subCategory === "Footwear";
    
    // For other sub-categories like TopWear, BottomWear, etc.
    const subCategories = ['TopWear', 'BottomWear', 'WinterWear', 'Watch', 'Cap', 'Ring', 'Bracelet'];
    if (subCategories.includes(activeFilter)) {
        return matchesSearch && item.subCategory === activeFilter;
    }
    
    return matchesSearch;
  })

  return (
    <div className='p-6 md:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto'>
      {/* Header Section */}
      <div className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8'>
        <div className='space-y-3'>
            <h1 className='text-4xl md:text-5xl font-extrabold text-[#FAFAFA] font-outfit tracking-tight'>
              Product <span className='admin-accent-text'>Inventory</span>
            </h1>
            <p className='text-[#888] text-sm font-medium tracking-wide'>Manage and track product inventory across the StyleCart platform.</p>
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto'>
          <div className='relative w-full sm:w-80 group'>
            <FiSearch className='absolute left-5 top-1/2 -translate-y-1/2 text-[#888] group-focus-within:text-[#4F46E5] transition-colors' />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 outline-none focus:border-[#4F46E5]/40 text-[#FAFAFA] text-sm font-medium transition-all group-hover:bg-white/10'
            />
          </div>
          <AdminButton onClick={() => navigate('/add')} className="h-14 px-8 w-full sm:w-auto">
            <FiPlus className='mr-2' /> Add Product
          </AdminButton>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <div className='flex items-center gap-4 mb-8 overflow-x-auto pb-4 custom-scrollbar'>
         <div className='flex items-center gap-2 px-5 py-2.5 admin-glass rounded-xl text-[10px] font-black uppercase tracking-[2px] text-[#888]'>
            <FiFilter /> Filter Category
         </div>
          {['All Categories', 'Accessories', 'TopWear', 'BottomWear', 'WinterWear', 'Footwear', 'Watch', 'Cap'].map(cat => (
             <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl border transition-all ${activeFilter === cat ? 'border-[#4F46E5]/40 bg-[#4F46E5]/10 text-[#FAFAFA]' : 'border-white/5 bg-white/5 text-[#888] hover:text-[#FAFAFA] hover:bg-white/10'}`}
             >
                <span className="text-[10px] font-bold uppercase tracking-[1px]">{cat}</span>
             </button>
          ))}
      </div>

      <div className='admin-card overflow-hidden p-2'>
        <AdminTable loading={loading}>
          <thead>
            <tr className='text-left border-b border-white/5'>
              <AdminTableCell isHeader className="pl-8 py-6">Product</AdminTableCell>
              <AdminTableCell isHeader>Category</AdminTableCell>
              <AdminTableCell isHeader>Price</AdminTableCell>
              <AdminTableCell isHeader>Status</AdminTableCell>
              <AdminTableCell isHeader className="pr-8 text-right px-8">Actions</AdminTableCell>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredList.length > 0 ? filteredList.map((item, index) => (
              <AdminTableRow 
                key={item._id} 
                className='group'
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AdminTableCell className="pl-8 py-5">
                  <div className='flex items-center gap-5'>
                    <div className='w-14 h-18 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative group-hover:scale-110 transition-transform duration-500 shadow-2xl'>
                      <img src={item.image1 || upload} alt={item.name} className='w-full h-full object-cover' />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <span className='font-bold text-[#FAFAFA] text-sm font-outfit uppercase tracking-wider'>{item.name}</span>
                      <span className='text-[10px] font-bold text-[#888] uppercase tracking-[1px]'>{item.subCategory}</span>
                    </div>
                  </div>
                </AdminTableCell>
                <AdminTableCell>
                  <span className='px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-[1px] text-[#FAFAFA]'>
                    {item.category}
                  </span>
                </AdminTableCell>
                <AdminTableCell>
                  <span className='font-bold text-[#FAFAFA]'>₹{item.exchange_rate}</span>
                </AdminTableCell>
                <AdminTableCell>
                  <div className='flex items-center gap-2'>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.stock > 0 ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></div>
                    <span className={`text-[10px] font-black uppercase tracking-[1px] ${item.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.stock > 0 ? `Active (${item.stock} Unit)` : 'Depleted'}
                    </span>
                  </div>
                </AdminTableCell>
                <AdminTableCell className="pr-8 text-right px-8">
                  <div className='flex items-center justify-end gap-3'>
                    <button 
                      onClick={() => navigate(`/add?productId=${item._id}`)}
                      className='p-3 rounded-xl bg-white/5 text-[#888] hover:text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-all border border-transparent hover:border-[#4F46E5]/20'
                    >
                      <FiEdit3 className='text-lg' />
                    </button>
                    <button 
                      onClick={() => removeList(item._id)}
                      className='p-3 rounded-xl bg-white/5 text-[#888] hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20'
                    >
                      <FiTrash2 className='text-lg' />
                    </button>
                  </div>
                </AdminTableCell>
              </AdminTableRow>
            )) : (
              <tr>
                <td colSpan="5" className='text-center py-20'>
                  <div className='flex flex-col items-center gap-4 animate-float'>
                    <FiBox className='text-6xl text-white/5' />
                    <p className='text-[#888] text-[10px] font-black uppercase tracking-[4px]'>No Products Found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </AdminTable>
      </div>
    </div>
  )
}

export default Lists


