import axios from 'axios'
import store from '../store/index'

export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASE_URL_PROD : process.env.VUE_APP_BASE_URL_DEV,
})

axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${ store.state.token }`;
      return config;
    }, 
  
    (error) => {
      return Promise.reject(error);
    }
  );