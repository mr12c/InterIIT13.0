import React from 'react'
import useFetchDataGet from '../cu/index2'
import { useState ,useEffect} from 'react'
import ProductCard from './ProductCard'
import useFetchDataGetAxios from '../cu/index3'
function SimmilarItem({category}) {
    const {data, loading, error} =  useFetchDataGetAxios(`/item/getItemByCategory/${category}`)
  console.log(data)
  const [items,setItems] = useState()
  
  useEffect(()=>{
    setItems(data?.items)
  },[data])
  return (
   <>  {items?  <div className='grid sm:grid-cols-2  2xl:grid-cols-4  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 flex-wrap w-[99%] mx-auto   gap-2'>
      {items?.map(item => <ProductCard item={item}/>)}
  </div> :  <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>}
  </>
  )
}

export default SimmilarItem
