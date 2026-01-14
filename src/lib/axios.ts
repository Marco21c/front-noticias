import axios from "axios"

const backendApi = axios.create({
  baseURL: "https://api.noticias.com", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default backendApi