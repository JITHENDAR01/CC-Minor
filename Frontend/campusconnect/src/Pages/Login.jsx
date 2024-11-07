// /* eslint-disable no-unused-vars */
// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';
// import api from '../utils/api';
// import loginLogo from '../assets/CVRCDark.mp4'
// import { UserContext } from '../Context/UserContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.post(`${URL}api/auth/login`, {
//         email: email.toLowerCase(),
//         password
//       });
//       console.log(res.data);
//       localStorage.setItem('token', res.data.token);

//       setUser(res.data);
//       navigate('/home');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data);
//       } else {
//         setError('Error occurred while logging in');
//       }
//       console.error('Error:', err);
//     }
//   };

//   return (
//     <div className="sm:items-center min-h-screen bg-gradient-to-r from-black via-blue-800 to-black flex justify-center items-center">
//       {/* Left Side - Background Video */}
//       <div className="lg:flex w-1/2 h-full relative ">

//       <div className='invisible lg:visible from-black via-blue-800 to-blue-700  h-320 w-320 ml-32 '>
//       <video
//           autoPlay
//           loop
//           muted
//           className="object-cover rounded-lg "
//         >
//           <source src={loginLogo} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
        
//         {/* <div className="absolute bottom-10 left-10 text-white">
//           {/* <h1 className="text-4xl font-bold">AI Generative</h1>
//           <p className="text-lg">Anything you can Imagine</p>
//           <p>Generate any type of art with CVR Corner</p> 
//         </div> */}
//       </div>

//       {/* Right Side - Login Form */}
//       <div className=" lg:w-1/2 w-full h-full flex flex-col justify-center items-center">
//         <div className="bg-gradient-to-r from-blue-800 to-black p-20 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-white text-3xl mb-6 text-center">Welcome Back!</h2>
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="text-white block mb-1" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 text-black bg-white-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="text-white block mb-1" for="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 text-black bg-white-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="Enter your password"
//               />
//             </div>
//             {error && <p className="text-red-500 text-xs">{error}</p>}
//             <div className="flex items-center justify-between">
//               <button
//                 type="submit"
//                 className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//               >
//                 Login
//               </button>
//             </div>
//           </form>
//           <div className="mt-4 text-center">
//             <Link
//               to="/signup"
//               className="text-blue-400 hover:text-blue-500 text-sm font-medium"
//             >
//               Don't have an account? Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import logo from '../assets/logo.png'; // Make sure this is the path to your image
import { UserContext } from '../Context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${URL}api/auth/login`, {
        email: email.toLowerCase(),
        password,
      });
      console.log(res.data);
      localStorage.setItem('token', res.data.token);

      setUser(res.data);
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error occurred while logging in');
      }
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      {/* Right Side - Login Form */}
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="p-20 rounded-lg shadow-lg w-full max-w-md bg-white">
          {/* Image Above the Welcome Back Text */}
          <div className="mb-6 flex justify-center">
            <img
              src={logo} // Change this to the path of your image
              alt="Logo"
              className="w-2/5 h-auto"
            />
          </div>
          <h2 className="text-black text-3xl mb-6 text-center font-bold">Welcome Back👋</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-black block mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-black block mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-500 text-sm font-medium"
            >
              Don't have an account yet? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
