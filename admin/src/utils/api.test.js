import { describe, it, expect, vi, afterEach } from 'vitest'
import axios from 'axios'
import { fetchProductCount, fetchOrderCount } from './api'

vi.mock('axios')

afterEach(() => {
  vi.resetAllMocks()
})

describe('fetchProductCount', () => {
  it('returns length when server returns array', async () => {
    axios.get.mockResolvedValue({ data: [1, 2, 3] })
    const count = await fetchProductCount('http://localhost:8000')
    expect(count).toBe(3)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/product/list', { withCredentials: true })
  })

  it('returns 0 when server returns non-array', async () => {
    axios.get.mockResolvedValue({ data: null })
    const count = await fetchProductCount('http://localhost:8000')
    expect(count).toBe(0)
  })

  it('returns 0 on network/error', async () => {
    axios.get.mockRejectedValue(new Error('network'))
    const count = await fetchProductCount('http://localhost:8000')
    expect(count).toBe(0)
  })
})

describe('fetchOrderCount', () => {
  it('returns length when server returns array', async () => {
    axios.post.mockResolvedValue({ data: [{}, {}] })
    const count = await fetchOrderCount('http://localhost:8000')
    expect(count).toBe(2)
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/order/list', {}, { withCredentials: true })
  })

  it('returns 0 when server returns non-array', async () => {
    axios.post.mockResolvedValue({ data: null })
    const count = await fetchOrderCount('http://localhost:8000')
    expect(count).toBe(0)
  })

  it('returns 0 on network/error', async () => {
    axios.post.mockRejectedValue(new Error('fail'))
    const count = await fetchOrderCount('http://localhost:8000')
    expect(count).toBe(0)
  })
})