import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || 'https://craftsure-1.onrender.com/api'
const api = axios.create({ baseURL: API_URL })
api.interceptors.request.use(c=>{
  const token = localStorage.getItem('token')
  if(token) c.headers.Authorization = `Bearer ${token}`
  return c
})
export default api
