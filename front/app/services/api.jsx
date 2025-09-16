// src/services/api.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001' // or your backend URL


axios.defaults.withCredentials = true
const fetchEmails = async () => {
  const response = await axios.get(`${API_BASE_URL}/emails`)
  return response.data
}

const fetchEmailById = async (id) =>{
  const response = await axios.get(`${API_BASE_URL}/email/${id}`)
  return response
}

const isLoggedIn = async () =>{
  const response = await axios.get(`${API_BASE_URL}/auth/check`)
  console.log("The resposnssssssssssssssssssssssss", response)
  return response.data
}

const fetchAiEmailContent = async (content) =>{
  const response = await axios.post(`${API_BASE_URL}/ai/mail`, content)

  console.log("the response is", response)
  return response
}

const fetchRefineMailContent = async (content) => {
  const response = await axios.post(`${API_BASE_URL}/ai/refineMail`, content)
  return response
}
export default {
  fetchEmails,
  fetchEmailById,
  isLoggedIn,
  fetchAiEmailContent,
  fetchRefineMailContent,
}

