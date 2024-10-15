import React, { useState } from "react";
import i1 from "../../assets/register-main-h1.png";
import '../../Static/register.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return re.test(String(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (fullname.length < 3) {
      formErrors.fullname = "Full name must be at least 3 characters long";
    }
    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 8 characters long and include at least one digit, one uppercase letter, one lowercase letter, and one special character";
    }
    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const data = {
        fullname,
        email,
        password,
        confirmPassword
      };

      setError('');
      setLoading(true);

      try {
        const response = await axios.post('/api/v1/users/register', data);
        console.log(response.data);
        // Handle successful registration here
        navigate('/auth/login'); // Replace with the actual path
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] dark:bg-[black]  relative">
      <div className="absolute 2xl:w-[40vw] 2xl:h-[40vw]  md:w-[10vw] md:h-[30vw] w-[40vw] h-[20vw] rounded-full bg-[#df73fa98]"></div>
      <div className="absolute 2xl:w-[40vw] 2xl:h-[40vw] md:w-[10vw] md:h-[30vw] w-[30vw] h-[20vw] bottom-0 right-0 rounded-full bg-[#bcadff91]"></div>
      <div className="w-full h-full  absolute backdrop-blur-[300px]  flex justify-center items-center">
        <motion.form 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1 }}
        onSubmit={handleSubmit} className=" mt-10 w-[90vw] lg:w-[60vw] 2xl:w-[35vw] bg-[#3b3a3a34] shadow-lg p-8 backdrop-blur-[800px] border-slate-700 rounded-xl">
          <h1 className="text-[2.4rem] sm:text-[3.4rem] text-[#f5ededd0] font-bold flex flex-col">Stay in Touch With Your <span className="flex gap-2 items-center">Institute <span> 🏫</span></span></h1>
          <div className="flex flex-col mt-8 gap-5 register-form rounded-3xl ">
            {error && <p className="text-red-500 text-opacity-[0.7]">{error}</p>}
            <input
              style={{border:"solid 1px #3b3b3b7e"}}
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="p-3 rounded-xl outline-none text-[#c2c2c2] "
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            {errors.fullname && <p className=" text-[0.8rem] text-[#e06767]">{errors.fullname}</p>}

            <input
              style={{border:"solid 1px #3b3b3b7e"}}
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl outline-none text-[#c2c2c2] "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-[#e06767] text-[0.8rem] ">{errors.email}</p>}

            <input
              style={{border:"solid 1px #3b3b3b7e"}}
              type="password"
              name="password1"
              placeholder="Password"
              className="p-3 rounded-xl outline-none text-[#c2c2c2] "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-[#e06767] text-[0.8rem] ">{errors.password}</p>}

            <input
              style={{border:"solid 1px #3b3b3b7e"}}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="outline-none p-3 rounded-xl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-[#e06767] text-[0.8rem]">{errors.confirmPassword}</p>}

            <button type="submit" disabled={loading} className="py-3 mt-4 text-center rounded-full bg-[#aa6aff] text-[white]">
              {loading ? 'Registering...' : 'Register'}
            </button>
            <span className="text-center block mt-10 text-[white]">Already a member? <NavLink to="/auth/login" className="underline">Login</NavLink></span>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

export default Register;
