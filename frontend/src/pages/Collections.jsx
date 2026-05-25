import React, { useContext, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiFilterLine, RiSortDesc, RiSearch2Line, RiWalkLine, RiTShirt2Line, RiHandbagLine, RiSnowyLine, RiTimeLine, RiPokerDiamondsLine, RiGraduationCapLine, RiInfinityLine } from "react-icons/ri";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
    const [showFilter, setShowFilter] = useState(false)
    const { products, search, showSearch } = useContext(shopDataContext)
    const [filterProduct, setFilterProduct] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortType, SetSortType] = useState("relevant")

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice()

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)
    }

    const sortProducts = () => {
        let fbCopy = filterProduct.slice()
        switch (sortType) {
            case 'low-high':
                setFilterProduct(fbCopy.sort((a, b) => (a.exchange_rate - b.exchange_rate)))
                break;
            case 'high-low':
                setFilterProduct(fbCopy.sort((a, b) => (b.exchange_rate - a.exchange_rate)))
                break;
            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        sortProducts()
    }, [sortType])

    useEffect(() => {
        setFilterProduct(products)
    }, [products])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])

    return (
        <div className='min-h-screen bg-black pt-32 pb-20 px-6 md:px-12 relative overflow-hidden'>
            {/* Background Ambience */}
            <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-[#0ef] rounded-full blur-[250px] opacity-[0.02] pointer-events-none'></div>

            <div className='max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16'>
                {/* Sidebar Filters */}
                <aside className='w-full lg:w-[280px] shrink-0'>
                    <div 
                        className='flex items-center justify-between mb-8 cursor-pointer lg:cursor-default group p-4 bg-white/5 lg:bg-transparent rounded-2xl border border-white/10 lg:border-none lg:p-0'
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <div className='flex items-center gap-3'>
                            <RiFilterLine className='text-[#0ef] text-xl' />
                            <h2 className='text-white text-lg font-bold uppercase tracking-widest'>Filter</h2>
                        </div>
                        <RiArrowDownSLine className={`text-white/40 lg:hidden transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} />
                    </div>

                    <div className={`${showFilter ? 'flex' : 'hidden'} lg:flex flex-col gap-10 animate-fade-in`}>
                        {/* Categories */}
                        <div className='space-y-6'>
                            <p className='text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]'>Categories</p>
                            <div className='flex flex-col gap-4'>
                                {['Men', 'Women', 'Kids', 'Accessories'].map((cat) => (
                                    <label key={cat} className='flex items-center gap-4 cursor-pointer group'>
                                        <input
                                            type="checkbox"
                                            value={cat}
                                            className='hidden'
                                            onChange={toggleCategory}
                                        />
                                        <div className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${category.includes(cat) ? 'border-[#0ef] bg-[#0ef] shadow-[0_0_10px_#0ef]' : 'border-white/10 bg-white/5 group-hover:border-white/30'}`}>
                                            {category.includes(cat) && <div className='w-2 h-2 bg-black rounded-sm'></div>}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${category.includes(cat) ? 'text-[#0ef]' : 'text-white/40 group-hover:text-white/70'}`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sub-Categories */}
                        <div className='space-y-6'>
                            <p className='text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]'>Refine by Style</p>
                            <div className='flex flex-col gap-4'>
                                {['TopWear', 'BottomWear', 'WinterWear', 'Footwear', 'Cap', 'Ring', 'Bracelet', 'Watch'].map((sub) => (
                                    <label key={sub} className='flex items-center gap-4 cursor-pointer group'>
                                        <input
                                            type="checkbox"
                                            value={sub}
                                            className='hidden'
                                            onChange={toggleSubCategory}
                                        />
                                        <div className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${subCategory.includes(sub) ? 'border-[#0ef] bg-[#0ef] shadow-[0_0_10px_#0ef]' : 'border-white/10 bg-white/5 group-hover:border-white/30'}`}>
                                            {subCategory.includes(sub) && <div className='w-2 h-2 bg-black rounded-sm'></div>}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-3 ${subCategory.includes(sub) ? 'text-[#0ef]' : 'text-white/40 group-hover:text-white/70'}`}>
                                            {sub === 'TopWear' && <RiTShirt2Line className="text-sm" />}
                                            {sub === 'BottomWear' && <RiHandbagLine className="text-sm scale-x-[-1]" />}
                                            {sub === 'WinterWear' && <RiSnowyLine className="text-sm" />}
                                            {sub === 'Footwear' && <RiWalkLine className="text-sm" />}
                                            {sub === 'Watch' && <RiTimeLine className="text-sm" />}
                                            {sub === 'Cap' && <RiGraduationCapLine className="text-sm" />}
                                            {sub === 'Ring' && <RiPokerDiamondsLine className="text-sm" />}
                                            {sub === 'Bracelet' && <RiInfinityLine className="text-sm" />}
                                            {sub}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Area */}
                <main className='flex-1'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-8'>
                        <Title text1='ALL' text2='COLLECTIONS' />

                        <div className='w-full sm:w-auto flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10'>
                            <RiSortDesc className='text-[#0ef] text-lg' />
                            <select
                                className='bg-transparent text-white outline-none cursor-pointer text-[10px] font-bold uppercase tracking-widest w-full sm:w-auto'
                                onChange={(e) => SetSortType(e.target.value)}
                            >
                                <option value="relevant" className='bg-black'>Relevant</option>
                                <option value="low-high" className='bg-black'>Price: Low to High</option>
                                <option value="high-low" className='bg-black'>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {filterProduct.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                            {filterProduct.map((item) => (
                                <Card 
                                    key={item._id} 
                                    id={item._id} 
                                    name={item.name} 
                                    exchange_rate={item.exchange_rate} 
                                    image={item.image1} 
                                    market_baseline={item.market_baseline} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[40px]'>
                            <RiSearch2Line className='text-white/10 text-6xl mb-6' />
                            <p className='text-white text-lg font-bold uppercase tracking-widest'>No matches found</p>
                            <p className='text-white/30 text-xs mt-2 uppercase tracking-widest'>Try clearing filters or search terms</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Collections
