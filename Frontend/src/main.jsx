import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route } from 'react-router-dom'
import { createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import { Provider, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import Login from './auth/login.jsx'
import { store } from './AppStore/index.js'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import AdvancedSearchForm from './Pages/SearchPage.jsx'
import Logout from './auth/logout';

const PrivateRoute = () => {
  const { accessToken } = useSelector((state) => state.AuthSlice);
  return accessToken ? <Outlet /> : <Navigate to="/auth/login" />;
};

const AuthRoute = () => {
  const { accessToken } = useSelector((state) => state.AuthSlice);
  return accessToken? <Navigate to="/" /> : <Outlet />;
};
const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>} >
         <Route path="/" element={<PrivateRoute/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/:item_id" element={<Home/>}/> 
          <Route path="/search" element={<AdvancedSearchForm/>}/>
          
        </Route>  
      <Route path="/auth" element={<AuthRoute/>}>
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/logout" element={<Logout/>} />
          
          
      </Route>
      <Route path="/logout" element={<Logout/>} />
         
    </Route>
))




createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
     
    <RouterProvider router={router} />
   
      
    </Provider>
  </StrictMode>,
)
