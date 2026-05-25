import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()
function ShopContext({ children }) {

  let [products, setProducts] = useState([])
  let [search, setSearch] = useState('')
  let { userData } = useContext(userDataContext)
  let [showSearch, setShowSearch] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let [cartItem, setCartItem] = useState({});
  let [loading, setLoading] = useState(false)
  let [promoCode, setPromoCode] = useState('')
  let [discount, setDiscount] = useState(0)
  let delivery_fee = 4;
  let free_delivery_threshold = 5;
  const currency = '₹';

  const getProducts = async () => {
    console.log("ShopContext: getProducts starting with serverUrl:", serverUrl);
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      console.log("ShopContext: getProducts result count:", result.data.length);
      const mappedProducts = result.data.map(product => {
        const getImageUrl = (imgData) => {
          if (!imgData) return null;
          
          let parsedUrl = null;
          if (typeof imgData === 'string') {
              parsedUrl = imgData;
          } else if (Array.isArray(imgData) && imgData.length > 0) {
              parsedUrl = typeof imgData[0] === 'string' ? imgData[0] : (imgData[0]?.secure_url || imgData[0]?.url || null);
          } else if (typeof imgData === 'object') {
              parsedUrl = imgData.secure_url || imgData.url || null;
          }

          if (!parsedUrl) return null;

          if (parsedUrl.startsWith('/uploads')) {
              return `${serverUrl}${parsedUrl}`;
          }
          return parsedUrl;
        };

        const legacyImages = Array.isArray(product.image) ? product.image : (product.images || []);
        const singleImage = typeof product.image === 'string' ? product.image : (product.img || null);

        return {
          ...product,
          exchange_rate: product.exchange_rate || product.price || 0,
          market_baseline: product.market_baseline || product.oldPrice || null,
          image1: getImageUrl(product.image1) || getImageUrl(legacyImages[0]) || getImageUrl(singleImage) || null,
          image2: getImageUrl(product.image2) || getImageUrl(legacyImages[1]) || null,
          image3: getImageUrl(product.image3) || getImageUrl(legacyImages[2]) || null,
          image4: getImageUrl(product.image4) || getImageUrl(legacyImages[3]) || null,
        }
      })
      setProducts(mappedProducts)
    } catch (error) {
      console.error("ShopContext: getProducts failed:", error.message)
      if (error.response) {
        console.error("ShopContext: Server responded with status:", error.response.status)
      }
    }

  }


  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem); // Clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);


    if (userData) {
      setLoading(true)
      try {
        let result = await axios.post(serverUrl + "/api/cart/add", { itemId, size }, { withCredentials: true })
        console.log(result.data)
        toast.success("Product Added")
        setLoading(false)



      }
      catch (error) {
        console.log(error)
        setLoading(false)
        toast.error("Add Cart Error")

      }

    }
  }


  const getUserCart = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })

      setCartItem(result.data)
    } catch (error) {
      console.log(error)



    }

  }
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        console.log(error)

      }
    }

  }
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalCount += cartItem[items][item]
        }
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue; // Safety Fix: Skip if product was deleted
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalAmount += itemInfo.exchange_rate * cartItem[items][item];
        }
      }
    }
    return totalAmount

  }

  useEffect(() => {
    getProducts()
  }, [userData])

  useEffect(() => {
    if (userData) {
      getUserCart()
    }
  }, [userData])






  const applyPromoCode = (code) => {
    if (code.toUpperCase() === 'WELCOME20') {
      const subtotal = getCartAmount();
      if (subtotal > 0) {
        setPromoCode('WELCOME20');
        setDiscount(Math.round(subtotal * 0.2));
        toast.success("Promo code applied: 20% OFF");
      }
    } else {
      setPromoCode('');
      setDiscount(0);
      toast.error("Invalid promo code");
    }
  }

  let value = {
    products, currency, delivery_fee, free_delivery_threshold, getProducts, search, setSearch, showSearch, setShowSearch, cartItem, addToCart, getCartCount, setCartItem, updateQuantity, getCartAmount, loading, promoCode, discount, applyPromoCode
  }
  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext
