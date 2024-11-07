// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUserName] = useState('');
//   const [rollNo, setRollNo] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (event) => {
//     event.preventDefault();

//     // Validate roll number format
//     /* const rollNoPattern = /^[0-9]{2}[Bb][8][1][Aa][0-9A-Za-z]{4}$/i;
//     if (!rollNoPattern.test(rollNo)) {
//       setError('Invalid roll number');
//       return;
//     }

//     // Validate email format
//     const emailPattern = new RegExp(`^${rollNo}@cvr.ac.in$`, 'i');
//     if (!emailPattern.test(email)) {
//       setError('Invalid email');
//       return;
//     }

//     // Validate password length
//     if (password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }

//     // Validate password match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     } */

//     try {
//       const res = await axios.post(`${URL}api/auth/register`, { username, rollNo, email, password });
//       console.log(res.data);
//       setError('');
//       navigate('/login');
//     } catch (err) {
//       if (err.response && err.response.status === 400) {
//         setError(err.response.data); // Display error message from server
//       } else {
//         setError('Error occurred while registering');
//       }
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-blue-900 p-4 sm:p-6 lg:p-8">
//       <div className="bg-gradient-to-r from-black to-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-white">Create Account</h2>
//         <form onSubmit={handleSignUp}>
//           <div className="mb-4">
//             <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUserName(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter your username"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white text-sm font-bold mb-2" htmlFor="rollNo">
//               Roll No
//             </label>
//             <input
//               type="text"
//               id="rollNo"
//               value={rollNo}
//               onChange={(e) => setRollNo(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter your roll number"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
//               placeholder="Confirm your password"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Validate roll number format
    /* const rollNoPattern = /^[0-9]{2}[Bb][8][1][Aa][0-9A-Za-z]{4}$/i;
    if (!rollNoPattern.test(rollNo)) {
      setError('Invalid roll number');
      return;
    }

    // Validate email format
    const emailPattern = new RegExp(`^${rollNo}@cvr.ac.in$`, 'i');
    if (!emailPattern.test(email)) {
      setError('Invalid email');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } */

    try {
      const res = await axios.post(`${URL}api/auth/register`, { username, rollNo, email, password });
      console.log(res.data);
      setError('');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data); // Display error message from server
      } else {
        setError('Error occurred while registering');
      }
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Create Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="rollNo">
              Roll No
            </label>
            <input
              type="text"
              id="rollNo"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your roll number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
          <p className="signin-link mt-4">
  Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
</p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
