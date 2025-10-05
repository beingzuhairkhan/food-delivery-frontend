import axios from 'axios'


const API_URL = 'http://localhost:3000'; 

const api = axios.create({
    baseURL:API_URL,
    headers:{
        'Content-Type':'application/json',
    }
})

console.log("API" , api)

api.interceptors.request.use((config)=>{
   const token = localStorage.getItem('accessToken');
   if(token && config.headers){
    config.headers['Authorization'] = `Bearer ${token}`
   }
   return config;
},
(error)=> Promise.reject(error))

export default api;