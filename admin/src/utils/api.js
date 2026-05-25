import axios from 'axios'

/**
 * Return number of products from the backend (safe — returns 0 on error)
 * @param {string} serverUrl
 * @returns {Promise<number>}
 */
export async function fetchProductCount(serverUrl) {
  try {
    const res = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
    return Array.isArray(res?.data) ? res.data.length : 0
  } catch (err) {
    console.error('fetchProductCount error', err)
    return 0
  }
}

/**
 * Return number of orders from the backend (safe — returns 0 on error)
 * @param {string} serverUrl
 * @returns {Promise<number>}
 */
export async function fetchOrderCount(serverUrl) {
  try {
    const res = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
    return Array.isArray(res?.data) ? res.data.length : 0
  } catch (err) {
    console.error('fetchOrderCount error', err)
    return 0
  }
}
