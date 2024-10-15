import axios from 'axios';
 import { store } from '../AppStore';
import { logout,updateTokens } from '../AppStore/authSlice';
 


const axiosInstance = axios.create({
    baseURL: 'https://interiit13-0-3.onrender.com/api/v1', 
    withCredentials: true, 
  });
  
  
  axiosInstance.interceptors.request.use(
    (config) => {
      
      const token = store.getState().AuthSlice.accessToken;
      const token2 = store.getState().AuthSlice.refreshToken;
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['AuthorizationRef'] = `Bearer ${token2}`;
      }
      
      return config; 
    },
    (error) => {
      
      return Promise.reject(error);
    }
  );
  
  
  axiosInstance.interceptors.response.use(
    (response) => {
      return response; 
    },
    async (error) => {
      const originalRequest = error.config;
  
      
      if (!originalRequest) {
        return Promise.reject(error);
      }
  
      
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        
        if (error.response.data.message === "jwt expired" ||
            error.response.data.message === "Unauthorized request" ||
            error.response.data.message === "Invalid Access Token") {
  
          try {
            
            const response = await axiosInstance.post('/users/refreshAccessToken', {},{ withCredentials: true });
            console.log("refresh successfully received")
            const { accessToken, refreshToken } = response.data.data;
  
            
            store.dispatch(updateTokens({ accessToken, refreshToken }));
  
            
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers['AuthorizationRef'] = `Bearer ${refreshToken}`;
            axiosInstance.defaults.headers['AuthorizationRef'] = `Bearer ${refreshToken}`;
  
            
            return axiosInstance(originalRequest);
          } catch (err) {
            
            store.dispatch(logout());
            return Promise.reject(err);
          }
        } else{
          
          store.dispatch(logout());
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;