import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateTokens } from '../AppStore/authSlice';
import axios from 'axios';

import useFetchDataGetAxios from '../cu/index3';
import { setToggle } from '../AppStore/appSlice';

const Navbar = () => {
  const {item_id} =  useParams()
  
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, accessToken, refreshToken } = useSelector(state => state.AuthSlice);
  const {toggle} = useSelector(state => state.AppSlice)
  const [loading, setLoading] = useState(false);
  
  const handleOnClick = async () => {
    setLoading(true);
    try {
       
      const token = accessToken;
      const token2 = refreshToken;

      if (token) {
        
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'AuthorizationRef': `Bearer ${token2}`,
          },
        };

        const response = await axios.post(
          'https://interiit13-0-3.onrender.com/api/v1/users/logout',
          {},
          config
        );
        if (response.status === 200) {
          dispatch(logout());
        }
      }
    } catch (err) {
        
      console.error('Error logging out:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="flex  w-[100%] fixed  z-[100] mx-auto      justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold">
        <h2>
          <span className="text-violet-500">Online</span>Shop
        </h2>
      </div>

      <ul className="hidden lg:flex space-x-6 text-sm font-semibold">
        <li><NavLink to="/" activeClassName="text-red-500">Home</NavLink></li>
        <li><NavLink to="/men" activeClassName="text-red-500">Men</NavLink></li>
        <li><NavLink to="/women" activeClassName="text-red-500">Women</NavLink></li>
        <li><NavLink to="/baby" activeClassName="text-red-500">Baby Collection</NavLink></li>
        <li><NavLink to="/pages" activeClassName="text-red-500">Pages</NavLink></li>
        <li><NavLink to="/blog" activeClassName="text-red-500">Blog</NavLink></li>
        <li><NavLink to="/contact" activeClassName="text-red-500">Contact</NavLink></li>
      </ul>

      <div className="flex space-x-4 items-center">
        <NavLink to="search"><i className="ri-search-line text-xl cursor-pointer"></i></NavLink>

        <div className="relative">
          <i 
            className="ri-user-line text-xl cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          ></i>

          {showDropdown && (
            <div
              className="absolute right-0 -mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="px-4 py-2">
                <p className="font-bold">{user?.fullname}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <hr />
              <div 
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={handleOnClick}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </div>
            </div>
          )}
        </div>

        <i className="ri-shopping-cart-line text-xl cursor-pointer"></i>
      </div>

      <div className="lg:hidden flex items-center gap-2 text-[1.3rem]">
        
        <i onClick={()=>dispatch(setToggle(!toggle))} class="ri-store-2-line"></i>
      </div>
    </nav>
  );
};

export default Navbar;
