import axios from 'axios'

const apiHost = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: apiHost,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
