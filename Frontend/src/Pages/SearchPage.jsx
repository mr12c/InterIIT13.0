import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import { NavLink } from 'react-router-dom';

const AdvancedSearchForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting request

    try {
      const response = await axios.get(`https://interiit13-0-3.onrender.com/api/v1/item/search/advanced`, {
        params: { name, category, pricerange: priceRange },
      });
      setItems(response?.data?.data?.items || []);
      setLoading(false); // Stop loading after request completes
      console.log('Items fetched successfully:', response.data?.data?.items);
    } catch (error) {
      console.error('Error fetching items:', error.response?.data?.message);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Check if all fields are empty
  const isFieldsEmpty = !name && !category && !priceRange;

  return (
    <div className="w-[100%] mx-auto mt-[5rem] p-4 bg-white rounded-lg shadow-md">
        
      

      <form onSubmit={handleSubmit} className="gap-3  flex-col flex    md:flex-row items-center ">
        <div className=' w-[100%]  md:w-[40%]'>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inline-block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-violet-500"
            placeholder="Enter item name"
          />
        </div>

        <div className=' w-[100%] md:w-[20%]'>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-violet-500"
          >
            <option value="">Select a category</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Tools">Tools</option>
            <option value="Toys">Toys</option>
          </select>
        </div>

        <div className='md:w-[20%]  w-[100%]'>
          <select
            id="pricerange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-violet-500"
          >
            <option value="">Select a range</option>
            <option value="cheap">Cheap (0 - 40)</option>
            <option value="middle">Middle (40 - 150)</option>
            <option value="high">High (150+)</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="md:w-[20%] w-[100%] bg-violet-500 rounded-full text-white py-2 hover:bg-violet-700 transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Show message when fields are empty */}
      {isFieldsEmpty && !loading && (
        <p className="mt-4 text-center text-gray-500">
          Search by name, category, or price range
        </p>
      )}

      {/* Show loading animation */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
        </div>
      )}

      {/* Display the fetched items */}
      <div className='grid mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:grid-cols-5 2xl:w-[95%] w-[100%] flex-wrap gap-3 mx-auto'>
        {items?.length > 0 && 
          items?.map(item => (
            <ProductCard key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  );
};

export default AdvancedSearchForm;
