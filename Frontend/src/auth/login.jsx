import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { login } from "../AppStore/authSlice";
import {motion} from "framer-motion"
import api from "../utils/errorResponse";
 

function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dbError,setDbError] = useState()

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const data = {
        email,
        password
      };

      setError('');
      setLoading(true);
      console.log(data)
     

      try {
        const response = await axios.post('https://interiit13-0-3.onrender.com/api/v1/users/login',data);
        console.log(response.data.data)
        setDbError("")
        dispatch(login({user: response.data.data.user,accessToken: response.data.data.accessToken,refreshToken: response.data.data.refreshToken}));
        navigate('/')
    

          
      } catch (error) {
        console.log(error.response.data.message)
        setDbError(error.response.data.message)
       
     
      console.log(error)
      
        
             

        
        
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-white relative">
      <div className="absolute 2xl:w-[40vw] 2xl:h-[30vw] md:w-[10vw] md:h-[30vw] w-[30vw] h-[30vw] rounded-full bg-[#ffffff]"></div>
      <div className="absolute 2xl:w-[40vw] 2xl:h-[30vw] md:w-[10vw] md:h-[30vw] w-[30vw] h-[30vw] bottom-0 right-0 rounded-full bg-[#ffffff]"></div>

      <div className="w-full h-full absolute backdrop-blur-[300px] flex justify-center items-center">
        
       <motion.form  initial={{ opacity: 0 ,translateY:-5}}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}  onSubmit={handleSubmit} className="w-[90vw] 2xl:w-[35vw] lg:w-[60vw] bg-white p-6 shadow-lg  border-slate-900 rounded-xl">
          <h1 className="text-[3.4rem] text-[#000000d0] font-bold flex flex-col">
            Welcome back <span className="flex gap-2 items-center">👋</span>
          </h1>
          <div className="flex flex-col mt-8 gap-5 login-form rounded-3xl *: ">
            {dbError && <p className="text-[#e06767] text-[0.8rem] ">{dbError}</p>}
            <input
              style={{border:"solid 1px #3b3b3b7e"}}
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl  text-[#131313] outline-none bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-[#e06767] text-[0.8rem] ">{errors.email}</p>}

            <input
              style={{border:"solid 1px #3b3b3b7e"}}
              type="password"
              placeholder="Password"
              className="p-3 rounded-xl text-[#000000] outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-[#e06767] text-[0.8rem] ">{errors.password}</p>}

            <button type="submit" disabled={loading} className="py-3 mt-4 text-center rounded-full text-white bg-[#aa6aff] ">
              {loading ? 'Logging in...' : 'Login'}
            </button>

             

           
          </div>
        </motion.form>
       
      </div>
    </div>
  );
}

export default Login;

