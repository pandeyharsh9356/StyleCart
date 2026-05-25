import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { RiStarFill, RiStarHalfFill, RiShieldCheckLine, RiTruckLine, RiArrowRightUpLine } from "react-icons/ri";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';
import { format } from 'date-fns';

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addToCart, loading } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState(null)
  const [size, setSize] = useState('')
  
  // Review specific states
  const [activeTab, setActiveTab] = useState('technical')
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/review/${productId}`)
      if (response.data.success) {
        setReviews(response.data.reviews)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!userData) {
      toast.error("Please login to post a review")
      return
    }
    setSubmittingReview(true)
    try {
      const response = await axios.post(`${serverUrl}/api/review/add`, {
        productId,
        rating,
        comment
      }, { withCredentials: true })

      if (response.data.success) {
        toast.success("Review submitted!")
        setComment('')
        setRating(5)
        fetchReviews()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review")
    } finally {
      setSubmittingReview(false)
    }
  }

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image1);
    }
  }

  useEffect(() => {
    fetchProductData()
    fetchReviews()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId, products])

  return productData ? (
    <div className='min-h-screen bg-black pt-32 pb-20 relative overflow-hidden'>
      {/* Background Ambience */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-[#0ef] rounded-full blur-[250px] opacity-[0.02] pointer-events-none'></div>

      <div className='max-w-[1440px] mx-auto px-6 md:px-12'>
        <div className='flex flex-col lg:flex-row gap-20'>
          {/* Gallery Section */}
          <div className='lg:w-1/2 flex flex-col md:flex-row gap-6'>
             {/* Thumbnails */}
            <div className='flex md:flex-col gap-4 order-2 md:order-1'>
              {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, idx) => img && (
                <button
                  key={idx}
                  onClick={() => setImage(img)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border transition-all duration-300 ${image === img ? 'border-[#0ef] shadow-[0_0_15px_#0ef4]' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className='w-full h-full object-cover' />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className='flex-1 order-1 md:order-2'>
              <div className='relative aspect-[4/5] rounded-[48px] overflow-hidden border border-white/5 group'>
                <img 
                  src={image} 
                  alt={productData.name} 
                  className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105' 
                />
                <div className='absolute top-8 left-8'>
                  <div className='bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-[#0ef] rounded-full animate-pulse'></div>
                    <p className='text-[#0ef] text-[8px] font-black uppercase tracking-widest'>Original Asset</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className='lg:w-1/2 space-y-12'>
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <div className='flex text-[#0ef] gap-1'>
                  {[...Array(4)].map((_, i) => <RiStarFill key={i} className='text-sm' />)}
                  <RiStarHalfFill className='text-sm' />
                </div>
                <span className='text-white/20 text-[10px] font-bold uppercase tracking-widest'>124 Verified Uplinks</span>
              </div>
              
              <h1 className='text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]'>{productData.name}</h1>
              
              <div className='flex items-baseline gap-6'>
                <p className='text-4xl md:text-5xl font-black text-white font-mono tracking-tighter'>{currency}{productData.exchange_rate}</p>
                {productData.market_baseline > productData.exchange_rate && (
                  <p className='text-white/20 text-xl line-through italic font-medium'>{currency}{productData.market_baseline}</p>
                )}
              </div>

              <p className='text-white/50 text-base leading-relaxed max-w-xl font-medium'>
                {productData.description || "A masterclass in technical craftsmanship and urban utility. Engineered for those who demand performance without compromising on aesthetic integrity."}
              </p>
            </div>

            {/* Selection */}
            <div className='space-y-10'>
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <p className='text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]'>Specification Loadout</p>
                </div>

                <div className='flex flex-wrap gap-4'>
                  {productData.sizes.map((item, index) => {
                    const sizeName = typeof item === 'string' ? item : item.size;
                    const sizeQuantity = typeof item === 'string' ? null : item.quantity;
                    
                    // Fallback to global stock if matrix variants were 0-initialized
                    const effectiveQuantity = (sizeQuantity === 0 && productData.stock > 0) ? productData.stock : sizeQuantity;
                    const isOutOfStock = effectiveQuantity === 0;

                    return (
                      <button
                        key={index}
                        onClick={() => setSize(sizeName)}
                        disabled={isOutOfStock}
                        className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                          isOutOfStock 
                            ? 'opacity-40 cursor-not-allowed bg-black border-red-500/30 text-red-500/60' 
                            : size === sizeName 
                              ? 'bg-[#0ef] border-[#0ef] text-black shadow-[0_0_20px_#0ef6]' 
                              : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span className='text-xs font-bold'>{sizeName}</span>
                        <span className='text-[7px] font-mono mt-0.5 tracking-widest opacity-60'>
                          {effectiveQuantity === null ? 'AVAILABLE' : effectiveQuantity === 0 ? 'OOS' : `${effectiveQuantity} LEFT`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className='space-y-6'>
                <button
                  onClick={() => addToCart(productData._id, size)}
                  disabled={loading}
                  className='glow-btn group w-full py-6 rounded-full text-xs flex items-center justify-center gap-4 active:scale-95 transition-transform'
                >
                  {loading ? <Loading color="#0ef" /> : (
                    <>
                      ADD TO INVENTORY
                      <RiArrowRightUpLine className='text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' />
                    </>
                  )}
                </button>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5'>
                    <RiTruckLine className='text-[#0ef] text-xl' />
                    <p className='text-[10px] text-white/40 font-bold uppercase tracking-widest'>Fast Protocol Delivery</p>
                  </div>
                  <div className='flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5'>
                    <RiShieldCheckLine className='text-[#0ef] text-xl' />
                    <p className='text-[10px] text-white/40 font-bold uppercase tracking-widest'>Authenticity Secured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className='mt-40'>
          <div className='flex border-b border-white/10 mb-12'>
            <button 
              onClick={() => setActiveTab('technical')}
              className={`px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${activeTab === 'technical' ? 'text-[#0ef] border-b-2 border-[#0ef]' : 'text-white/20 hover:text-white'}`}
            >
              Technical Intel
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${activeTab === 'reviews' ? 'text-[#0ef] border-b-2 border-[#0ef]' : 'text-white/20 hover:text-white'}`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {activeTab === 'technical' ? (
            <div className='max-w-4xl space-y-8 animate-fade-in'>
              <p className='text-white/50 text-lg leading-relaxed font-medium italic'>
                "The fusion of specialized architecture and minimalist urban profile. Every unit is a testament to the pursuit of aesthetic perfection."
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-12 pt-8'>
                <div className='space-y-4'>
                  <p className='text-white text-sm font-bold uppercase tracking-widest'>Material Protocols</p>
                  <p className='text-white/40 text-sm leading-relaxed'>
                    Engineered with high-tensile technical fabrics, designed for moisture management and structural integrity across multiple urban environments.
                  </p>
                </div>
                <div className='space-y-4'>
                  <p className='text-white text-sm font-bold uppercase tracking-widest'>Care System</p>
                  <p className='text-white/40 text-sm leading-relaxed'>
                    Machine wash cold, cycle 4.0. Avoid high-heat drying to maintain structural bonding. Tactical handling recommended.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='max-w-4xl space-y-12 animate-fade-in'>
              {/* Review Form */}
              {userData ? (
                <div className='bg-white/5 p-8 rounded-[32px] border border-white/10 space-y-6'>
                  <h3 className='text-white text-sm font-black uppercase tracking-widest'>Submit Dispatch Report</h3>
                  <form onSubmit={handleReviewSubmit} className='space-y-6'>
                    <div className='flex gap-2'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-xl transition-all ${star <= rating ? 'text-[#0ef]' : 'text-white/10'}`}
                        >
                          <RiStarFill />
                        </button>
                      ))}
                    </div>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter your field assessment..."
                      className='w-full bg-black border border-white/10 rounded-2xl p-6 text-white text-sm outline-none focus:border-[#0ef] transition-all min-h-[120px] resize-none'
                    />
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className='glow-btn px-12 py-4 rounded-full text-[10px] font-black uppercase tracking-widest disabled:opacity-50'
                    >
                      {submittingReview ? "Processing..." : "Transmit Report"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className='bg-white/5 p-8 rounded-[32px] border border-white/5 text-center'>
                  <p className='text-white/30 text-xs font-bold uppercase tracking-widest'>Authentication required to submit reports</p>
                </div>
              )}

              {/* Review List */}
              <div className='space-y-8'>
                {reviews.length > 0 ? reviews.map((review) => (
                  <div key={review._id} className='border-b border-white/5 pb-8 space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <p className='text-white text-xs font-black uppercase tracking-widest'>{review.userName}</p>
                        <div className='flex text-[#0ef] gap-0.5'>
                          {[...Array(5)].map((_, i) => (
                            <RiStarFill key={i} className={`text-[10px] ${i < review.rating ? 'opacity-100' : 'opacity-10'}`} />
                          ))}
                        </div>
                      </div>
                      <p className='text-white/20 text-[10px] font-mono'>
                        {format(new Date(review.createdAt), 'yyyy.MM.dd | HH:mm')}
                      </p>
                    </div>
                    <p className='text-white/50 text-sm leading-relaxed font-medium'>
                      {review.comment}
                    </p>
                  </div>
                )) : (
                  <div className='py-20 text-center'>
                    <p className='text-white/20 text-xs font-bold uppercase tracking-[0.4em]'>No data logs available for this unit</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className='mt-40'>
          <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
        </div>
      </div>
    </div>
  ) : <div className='min-h-screen bg-black flex items-center justify-center'><Loading /></div>
}

export default ProductDetail
