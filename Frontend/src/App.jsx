import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/NavBar'
import { useSelector } from 'react-redux'

function App() {
  const { accessToken } = useSelector((state) => state.AuthSlice)
  const [count, setCount] = useState(0)

  return (
    
       <div className='relative'>
         {accessToken? <Navbar></Navbar>:""}  
        <div className='w-[100%] flex  relative   mx-auto max-w-[1920px] h-[100vh] '>
         
         <Outlet/>
      </div>
       </div>
    
  )
}

export default App
