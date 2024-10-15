import React, { useEffect } from 'react'
import Sidebar from './sidebar';
import ProductDetail from './ProductDetail.jsx'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../AppStore/appSlice.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function Home() {
  const dispatch = useDispatch()
  useEffect(() =>{
    if(window.innerWidth<640){
      dispatch(setToggle(true))
    }
    else{
      dispatch(setToggle(false))
    }
  },[window.innerWidth])
   
  return (
    <> 
      
      <DndProvider backend={HTML5Backend}>
      <Sidebar />
    </DndProvider>
      <ProductDetail />
     
    </>
  )
}

export default Home