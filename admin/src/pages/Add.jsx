import { useContext, useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiImage, FiSettings, FiTag, FiShoppingBag, FiLayers, FiMaximize2, FiPlus, FiBox, FiCheck } from 'react-icons/fi'
import AdminButton from '../component/AdminButton'
import Loading from '../component/Loading'
import AdminSelect from '../component/AdminSelect'

import useFetch from '../hooks/useFetch';
import usePost from '../hooks/usePost';
import { BASE_URL } from '../api/api';

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [exchange_rate, setExchangeRate] = useState("")
  const [market_baseline, setMarketBaseline] = useState("")
  const [stock, setStock] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [customSizeInput, setCustomSizeInput] = useState("")
  const [tags, setTags] = useState("")
  const [previewVisible, setPreviewVisible] = useState(true)

  const [searchParams] = useSearchParams()
  const productId = searchParams.get("productId")
  
  const { data: productData, loading: detailsLoading } = useFetch(productId ? `/api/product/single/${productId}` : null);
  const { mutate: saveProduct, loading: saving } = usePost('/api/product/add-product');

  useEffect(() => {
    if (productData) {
      const p = productData;
      setName(p.name);
      setDescription(p.description);
      setExchangeRate(p.exchange_rate || "");
      setMarketBaseline(p.market_baseline || "");
      setStock(p.stock || "");
      setCategory(p.category);
      setSubCategory(p.subCategory);
      setBestSeller(p.bestseller);
      setSizes(p.sizes || []);
      setTags(p.tags?.join(", ") || "");
      if (p.image1) setImage1(p.image1);
      if (p.image2) setImage2(p.image2);
      if (p.image3) setImage3(p.image3);
      if (p.image4) setImage4(p.image4);
    }
  }, [productData]);

  const quickSizes = ['S', 'M', 'L', 'XL', 'XXL', 'Free Size']

  const addSize = (newSize) => {
    if (!newSize) return;
    if (sizes.find(s => s.size === newSize)) return;
    setSizes([...sizes, { size: newSize, quantity: 0 }]);
    setCustomSizeInput("");
  };

  const updateQuantity = (index, value) => {
    const updated = [...sizes];
    updated[index].quantity = Number(value);
    setSizes(updated);
  };

  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("exchange_rate", exchange_rate)
      formData.append("market_baseline", market_baseline)
      formData.append("stock", stock)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim())))

      if (image1 instanceof File) formData.append("image1", image1)
      if (image2 instanceof File) formData.append("image2", image2)
      if (image3 instanceof File) formData.append("image3", image3)
      if (image4 instanceof File) formData.append("image4", image4)

      const url = productId ? `/api/product/update/${productId}` : '/api/product/add-product';
      
      await saveProduct(formData, {
        url,
        onSuccess: () => {
          toast.success(productId ? "Product Updated" : "Product Launched");
          if (!productId) {
            setName(""); setDescription(""); setImage1(false); setImage2(false); setImage3(false); setImage4(false);
            setExchangeRate(""); setMarketBaseline(""); setStock(""); setBestSeller(false);
            setCategory("Men"); setSubCategory("TopWear"); setSizes([]); setTags("");
          }
        },
        onError: (err) => {
          toast.error(err || "Operation failed");
        }
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='p-6 md:p-8 lg:p-12 max-w-[1700px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='flex flex-col xl:flex-row gap-16'>
        
        {/* Main Form Content */}
        <div className='flex-1'>
          <div className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8'>
            <div className='space-y-2'>
              <h1 className='text-4xl md:text-5xl font-extrabold text-[#FAFAFA] font-outfit tracking-tight'>
                Product <span className='admin-accent-text'>Deployment</span>
              </h1>
              <p className='text-[#888] text-sm font-medium tracking-wide'>Provisioning new products into the StyleCart catalog.</p>
            </div>
            <button
              type="button"
              onClick={() => setPreviewVisible(!previewVisible)}
              className='flex items-center gap-3 px-6 py-3 admin-glass rounded-2xl text-[10px] font-black uppercase tracking-[3px] text-[#888] hover:text-[#FAFAFA] hover:bg-white/10 transition-all border border-white/5'
            >
              {previewVisible ? <FiLayers className='text-sm' /> : <FiMaximize2 className='text-sm' />}
              {previewVisible ? "Compact" : "Expand"}
            </button>
          </div>

          <form onSubmit={handleAddProduct} className='space-y-12'>
            
            {/* Section: Media Assets */}
            <div className='admin-card p-10 relative overflow-hidden group'>
              <div className='absolute -right-10 -top-10 w-40 h-40 bg-[#4F46E5]/5 rounded-full blur-[80px]'></div>
              
              <div className='flex items-center gap-4 mb-10 border-b border-white/5 pb-6'>
                <div className='w-1 h-6 bg-[#4F46E5] rounded-full shadow-[0_0_10px_#4F46E5]'></div>
                <h2 className='text-xs font-black uppercase tracking-[3px] text-[#FAFAFA] font-outfit'>Product Media</h2>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                {[
                  { id: 'image1', state: image1, setter: setImage1, label: 'Primary' },
                  { id: 'image2', state: image2, setter: setImage2, label: 'Variant-A' },
                  { id: 'image3', state: image3, setter: setImage3, label: 'Variant-B' },
                  { id: 'image4', state: image4, setter: setImage4, label: 'Context' }
                ].map((img, idx) => (
                  <div key={img.id} className='group/img'>
                    <div className='flex justify-between items-center mb-3 px-1'>
                        <span className='text-[9px] font-black text-[#888] uppercase tracking-[2px] group-hover/img:text-[#4F46E5] transition-colors'>0{idx+1} {img.label}</span>
                    </div>
                    <label htmlFor={img.id} className='relative aspect-[3/4] bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer hover:border-[#4F46E5]/40 transition-all flex flex-col items-center justify-center overflow-hidden hover:bg-white/[0.06] shadow-xl'>
                      {img.state ? (
                        <img src={typeof img.state === 'string' ? (img.state.startsWith('http') ? img.state : `${BASE_URL}${img.state}`) : URL.createObjectURL(img.state)} className='w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700' alt="Preview" />
                      ) : (
                        <div className='flex flex-col items-center gap-3'>
                          <div className='w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover/img:bg-[#4F46E5]/10 group-hover/img:text-[#4F46E5] transition-all'>
                            <FiPlus className='text-xl' />
                          </div>
                          <span className='text-[8px] font-black text-[#333] uppercase tracking-[2px]'>Upload</span>
                        </div>
                      )}
                      <input type="file" id={img.id} hidden onChange={(e) => img.setter(e.target.files[0])} />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Specification Matrix */}
            <div className='admin-card p-10'>
              <div className='flex items-center gap-4 mb-10 border-b border-white/5 pb-6'>
                <div className='w-1 h-6 bg-[#A855F7] rounded-full shadow-[0_0_10px_#A855F7]'></div>
                <h2 className='text-xs font-black uppercase tracking-[3px] text-[#FAFAFA] font-outfit'>Product Specifications</h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                <div className='space-y-8'>
                  <div className='space-y-3'>
                    <label className='text-[10px] font-black text-[#888] uppercase tracking-[2px] ml-1'>Product Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className='w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-[#4F46E5]/40 text-[#FAFAFA] text-sm font-bold transition-all placeholder:text-[#333]' placeholder='Product Name' />
                  </div>
                  <div className='space-y-3'>
                    <label className='text-[10px] font-black text-[#888] uppercase tracking-[2px] ml-1'>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className='w-full h-40 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#4F46E5]/40 text-[#FAFAFA] text-sm font-medium transition-all resize-none placeholder:text-[#333]' placeholder='Product Description' />
                  </div>
                </div>

                <div className='space-y-8'>
                    <div className='grid grid-cols-2 gap-6'>
                      <AdminSelect 
                        label="Main Category"
                        options={[
                          { value: 'Men', label: 'Men' },
                          { value: 'Women', label: 'Women' },
                          { value: 'Kids', label: 'Kids' },
                          { value: 'Accessories', label: 'Accessories' }
                        ]}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        icon={<FiLayers className='text-sm' />}
                      />
                      <AdminSelect 
                        label="Sub Category"
                        options={[
                          { value: 'TopWear', label: 'TopWear' },
                          { value: 'BottomWear', label: 'BottomWear' },
                          { value: 'WinterWear', label: 'WinterWear' },
                          { value: 'Footwear', label: 'Footwear' },
                          { value: 'Watch', label: 'Watch' },
                          { value: 'Cap', label: 'Cap' },
                          { value: 'Ring', label: 'Ring' },
                          { value: 'Bracelet', label: 'Bracelet' }
                        ]}
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        icon={<FiTag className='text-sm' />}
                      />
                    </div>

                  <div className='grid grid-cols-2 gap-6'>
                    <div className='space-y-3'>
                      <label className='text-[10px] font-black text-[#888] uppercase tracking-[2px] ml-1'>Product Quantity</label>
                      <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className='w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-[#4F46E5]/40 text-[#FAFAFA] text-xl font-outfit font-black' placeholder='000' />
                    </div>
                    <div className='flex flex-col justify-end'>
                      <div 
                        onClick={() => setBestSeller(!bestseller)}
                        className={`h-14 flex items-center justify-between px-6 bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer transition-all group/toggle ${bestseller ? 'border-[#4F46E5]/40 bg-[#4F46E5]/5' : 'hover:bg-white/10'}`}
                      >
                        <span className={`text-[10px] font-black uppercase tracking-[2px] ${bestseller ? 'text-[#FAFAFA]' : 'text-[#888]'}`}>Priority</span>
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${bestseller ? 'bg-[#4F46E5] border-[#4F46E5] shadow-[0_0_10px_#4F46E5]' : 'border-white/20'}`}>
                          {bestseller && <FiCheck className='text-white text-[12px] font-black' />}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <label className='text-[10px] font-black text-[#888] uppercase tracking-[2px] ml-1'>Search Tags (CSV)</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder='TAG_01, TAG_02' className='w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-[#4F46E5]/40 text-[#FAFAFA] text-[10px] font-black uppercase tracking-[2px]' />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Value & Variants */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              <div className='admin-card p-10'>
                <div className='flex items-center gap-4 mb-10 border-b border-white/5 pb-6'>
                    <div className='w-1 h-6 bg-[#10B981] rounded-full shadow-[0_0_10px_#10B981]'></div>
                    <h2 className='text-xs font-black uppercase tracking-[3px] text-[#FAFAFA] font-outfit'>Value Architecture</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div className='space-y-3'>
                    <label className='text-[10px] font-black text-[#888] uppercase tracking-[2px] ml-1'>Exchange Valuation</label>
                    <div className='relative'>
                        <span className='absolute left-6 top-1/2 -translate-y-1/2 text-[#4F46E5] font-black text-xl'>₹</span>
                        <input type="number" step="0.01" value={exchange_rate} onChange={(e) => setExchangeRate(e.target.value)} required className='w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 outline-none focus:border-[#4F46E5] text-[#FAFAFA] text-3xl font-outfit font-black' placeholder='0' />
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <label className='text-[10px] font-black text-[#888] uppercase tracking-[2px] ml-1'>Baseline Market</label>
                    <input type="number" step="0.01" value={market_baseline} onChange={(e) => setMarketBaseline(e.target.value)} className='w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-white/20 text-[#333] text-2xl font-outfit font-black' placeholder='0' />
                  </div>
                </div>
              </div>

              <div className='admin-card p-10'>
                <div className='flex items-center gap-4 mb-10 border-b border-white/5 pb-6'>
                    <div className='w-1 h-6 bg-[#F59E0B] rounded-full shadow-[0_0_10px_#F59E0B]'></div>
                    <h2 className='text-xs font-black uppercase tracking-[3px] text-[#FAFAFA] font-outfit'>Size & Inventory Matrix</h2>
                </div>
                
                <div className='space-y-6'>
                  <div className='flex flex-wrap gap-2'>
                    {quickSizes.map(sz => (
                      <button 
                        key={sz} 
                        type='button' 
                        onClick={() => addSize(sz)}
                        className='px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[2px] text-[#888] hover:text-[#FAFAFA] hover:bg-white/10 transition-all'
                      >
                        + {sz}
                      </button>
                    ))}
                  </div>

                  <div className='flex gap-3'>
                    <input 
                      type="text" 
                      value={customSizeInput}
                      onChange={(e) => setCustomSizeInput(e.target.value)}
                      placeholder='Custom Size...'
                      className='flex-1 h-12 bg-[#050505] border border-white/10 rounded-xl px-4 outline-none text-[#FAFAFA] text-xs font-bold'
                    />
                    <button 
                      type="button"
                      onClick={() => addSize(customSizeInput)}
                      className='px-6 h-12 bg-[#4F46E5] text-white rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-all hover:bg-[#4338CA]'
                    >
                      Add Size
                    </button>
                  </div>

                  <div className='mt-6 space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2'>
                    {sizes.length === 0 ? (
                      <p className='text-[#888] text-[10px] font-black uppercase tracking-[2px] text-center p-6 border border-white/5 border-dashed rounded-xl'>No Matrix Variants Configured</p>
                    ) : (
                      <>
                        <div className='grid grid-cols-12 gap-4 px-4 pb-2 border-b border-white/5 text-[9px] font-black text-[#888] uppercase tracking-[2px]'>
                           <div className='col-span-5'>Size</div>
                           <div className='col-span-5'>Quantity</div>
                           <div className='col-span-2 text-center'>Remove</div>
                        </div>
                        {sizes.map((item, index) => (
                          <div key={index} className='grid grid-cols-12 gap-4 items-center bg-white/[0.02] p-3 rounded-xl border border-white/5'>
                            <div className='col-span-5 font-bold text-sm text-[#FAFAFA] pl-2'>{item.size}</div>
                            <div className='col-span-5'>
                              <input 
                                type="number" 
                                min=""
                                value={item.quantity}
                                onChange={(e) => updateQuantity(index, e.target.value)}
                                className='w-full h-10 bg-black border border-white/10 rounded-lg px-3 outline-none focus:border-[#4F46E5] text-white text-sm font-bold'
                              />
                            </div>
                            <div className='col-span-2 flex justify-center'>
                              <button 
                                type="button" 
                                onClick={() => removeSize(index)}
                                className='w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors'
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end pt-6 pb-20'>
              <AdminButton 
                type="submit" 
                loading={saving}
                className="w-full md:w-auto h-16 px-16 text-xs shadow-2xl"
              >
                {detailsLoading ? "Product Deployment" : (productId ? "Update Product" : "Launch Product")}
              </AdminButton>
            </div>
          </form>
        </div>

        {/* Live Rendering Sidebar */}
        {previewVisible && (
          <div className='hidden xl:block w-[450px] shrink-0'>
            <div className='sticky top-32 space-y-8'>
              <div className='admin-card p-3 group/preview hover:scale-[1.02] transition-transform duration-700 bg-white/[0.02]'>
                <div className='aspect-[3/4] rounded-3xl overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.8)]'>
                  {image1 ? (
                    <img src={typeof image1 === 'string' ? (image1.startsWith('http') ? image1 : `${BASE_URL}${image1}`) : URL.createObjectURL(image1)} className='w-full h-full object-cover transition-transform duration-[2000ms] group-hover/preview:scale-[1.2]' alt="Live Preview" />
                  ) : (
                    <div className='w-full h-full bg-[#020202] flex flex-col items-center justify-center gap-6 text-[#1a1a1a]'>
                       <FiImage className='text-8xl animate-pulse' />
                       <span className='text-[10px] font-black uppercase tracking-[8px] ml-2'>Awaiting Data</span>
                    </div>
                  )}
                  {bestseller && (
                    <div className='absolute top-8 left-8 px-6 py-2 bg-[#4F46E5] text-white text-[9px] font-black uppercase rounded-full shadow-[0_0_30px_rgba(79,70,229,0.5)] tracking-[3px] animate-fade-in'>Alpha Priority</div>
                  )}
                  
                  {/* Glass Overlay Effect */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none' />
                  
                  <div className='absolute bottom-10 left-10 right-10 space-y-5 animate-in slide-in-from-bottom-5 duration-1000'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-[1px] bg-[#4F46E5]'></div>
                        <p className='text-[11px] font-black text-[#4F46E5] uppercase tracking-[5px]'>{subCategory || 'Category'}</p>
                    </div>
                    <h3 className='text-4xl font-black text-[#FAFAFA] font-outfit uppercase tracking-tight leading-none'>{name || "Product Name"}</h3>
                    <div className='flex items-baseline gap-4'>
                      <span className='text-4xl font-black text-[#FAFAFA] font-outfit'>₹{exchange_rate || "000"}</span>
                      {market_baseline && <span className='text-sm text-[#555] line-through font-black uppercase tracking-[1px]'>MKT: ₹{market_baseline}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className='admin-card p-10 bg-white/[0.01] border-white/5 space-y-8'>
                 <div>
                    <h4 className='text-[10px] font-black text-[#4F46E5] uppercase tracking-[4px] mb-6'>Product Summary</h4>
                    <div className='space-y-5'>
                        <div className='flex justify-between items-center py-2 border-b border-white/5'>
                           <span className='text-[9px] font-black text-[#888] uppercase tracking-[1px]'>Category</span>
                           <span className='text-[10px] font-black text-[#FAFAFA] uppercase'>{category}</span>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b border-white/5'>
                           <span className='text-[9px] font-black text-[#888] uppercase tracking-[1px]'>Inventory Status</span>
                           <span className={`text-[10px] font-black uppercase ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>{stock || 0} Assets</span>
                        </div>
                        <div className='flex justify-between items-center py-2'>
                           <span className='text-[9px] font-black text-[#888] uppercase tracking-[1px]'>Size Options</span>
                           <span className='text-[10px] font-black text-[#FAFAFA] uppercase'>{sizes.length} Options</span>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Add



