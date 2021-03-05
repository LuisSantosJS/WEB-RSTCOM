import axios from 'axios'
const URL = 'https://api-rstcom.herokuapp.com'
const api = axios.create({
    baseURL: URL,
})
export default api;