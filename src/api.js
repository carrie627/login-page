import axios from 'axios'

const API_URL = 'https://reqres.in/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerUser = (email, password) => {
  return api.post('/register', { email, password })
}

export const loginUser = (email, password) => {
  return api.post('/login', { email, password })
}

export default api
