import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetchDataPostAxios from '../cu/index4';  
import { logout } from '../AppStore/authSlice';

function Logout() {
  const [loading2, setLoading] = useState(false);
  const dispatch = useDispatch();

 
  const { data, error, loading } = useFetchDataPostAxios('/users/logout');

  const handleOnClick = async () => {
    setLoading(true);
    dispatch(logout());
    // You can check the loading or error state from the hook
    if (error) {
      console.error(error);
     
    } else if (data) {
      dispatch(logout());
    }

    setLoading(loading);
  };

  return (
    <div className='mt-[8rem]'>
      <button onClick={handleOnClick} disabled={loading2}>
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}


export default Logout;
