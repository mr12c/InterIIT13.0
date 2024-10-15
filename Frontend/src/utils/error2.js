import axios from 'axios';
import { store } from '../AppStore';
import { updateTokens } from '../AppStore/authSlice'; // Adjust this import if needed
import { logout } from '../AppStore/authSlice';
 

const fetchApiDataGet = async (endpoint,query) => {
  try {
    const response = await axios.get(`https://godown-management.onrender.com/api/v1${endpoint}`
       
    );
    return response;
  } catch (error)  {
    if(
      error.response?.data?.message === "Unauthorized request" ||
      error.response?.data?.message === "Invalid Access Token"
    ){
      try{
        const refreshResponse = await axios.post(`https://godown-management.onrender.com/api/v1/users/refreshAccessToken`);
        console.log(refreshResponse)
        const { accessToken, refreshToken } = refreshResponse.data.data;
        
        store.dispatch(updateTokens({ accessToken, refreshToken }));
      }
      catch(error){
        store.dispatch(logout());
        throw error;
      }
    }
    throw error
}
};

export default fetchApiDataGet;
