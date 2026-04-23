import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
})

export default api