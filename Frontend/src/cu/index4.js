import { useState, useEffect } from 'react';
import fetchApiDataGet from '../utils/error2';
import axiosInstance from '../utils/api.JS';

const useFetchDataPostAxios = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await axiosInstance.post(endpoint);
        
        setData(response?.data?.data); 
        
      } catch (error) {
        console.log(error.response?.data?.message);
        setError(error.response?.data?.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 

  }, [endpoint]); 

  return { data, loading, error };
};

export default useFetchDataPostAxios;
