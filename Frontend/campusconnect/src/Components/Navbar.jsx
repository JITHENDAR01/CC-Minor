// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { BsSearch } from 'react-icons/bs';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { FaBars } from 'react-icons/fa';
// import logo from '../assets/logo.png'
// import Menu from './Menu';
// import { IoMoon } from "react-icons/io5";
// import { IoSunny } from "react-icons/io5";
// import { IconContext } from "react-icons";

// const Navbar = () => {
//   const [prompt,setPrompt]=useState("")
//   const [menu, setMenu] = useState(false);
//   const navigate = useNavigate()
//   const path = useLocation().pathname
//   const showMenu = () => {
//     setMenu(!menu);
//   };
//   console.log(prompt)
//   const handleSearch =()=>{
//     navigate((prompt)?"?search="+prompt:navigate("/home"))
//     setPrompt("")
//   }
//   return (
//     <div className="flex items-center justify-between px-4 md:px-[200px] py-2.5" style={{ backgroundColor: '#6845b8' }}>
//       <div className="flex items-center">
//   <img src={logo} alt="CampusConnect Logo" className="mr-2 w-8 h-8" />
//   <h1 className="text-lg md:text-xl font-bold text-white hover:text-gray-400 transition duration-300">
//     <Link to="/home">CampusConnect</Link>
//   </h1>
// </div>

//       <div className='flex-1 flex items-center justify-center  space-x-2 md:space-x-4'>
//         {path==='/home'&&<div className='flex items-center border-2  bg-gradient-to-r from-black to-blue-700 border-gray-300 rounded-lg px-3 py-1 transition duration-300 hover:border-gray-500'>
//           <BsSearch className='text-gray-200 cursor-pointer' onClick={handleSearch} />
//           <input 
//             className='outline-none px-2 py-1 bg-gradient-to-r text-gray-200 from-black to-blue-700 w-48 md:w-64' 
//             placeholder='Search by Post Category/Title' 
//             type='text'
//             onChange={(e)=>setPrompt(e.target.value)}
//             onKeyDown={(e)=> {
//               if(e.key=='Enter'){
//               handleSearch()
//             }
//           else return;
//         }}
        
            
//           />
//         </div>}
//       </div>
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-1 text-gray-200 hover:text-black transition duration-300">
//           <AiOutlineEdit className='text-xl' />
//           <h2><Link to="/write">Create Post</Link></h2>
//         </div>
//         <div className='md:hidden ' onClick={showMenu}>
//           <p className='cursor-pointer  flex text-xl'>
//             <FaBars style={{ color: 'white' }}/>
//           </p>
//           {menu && <Menu />}
//         </div>
//         <div className='hidden md:flex' onClick={showMenu}>
//           <p className='cursor-pointer flex text-xl'>
//             <FaBars className='text-gray-200' />
//           </p>
//           {menu && <Menu />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import logo from '../assets/logo.png';
import Menu from './Menu';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  
  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    navigate((prompt) ? "?search=" + prompt : "/home");
    setPrompt("");
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-[200px] py-2.5" style={{ backgroundColor: '#6845b8' }}>
      <div className="flex items-center">
        <img src={logo} alt="CampusConnect Logo" className="mr-2 w-8 h-8" />
        <h1 className="text-lg md:text-xl font-bold text-white hover:text-gray-400 transition duration-300">
          <Link to="/home">CampusConnect</Link>
        </h1>
      </div>

      <div className='flex-1 flex items-center justify-center space-x-2 md:space-x-4'>
        {path === '/home' && (
          <div className='flex items-center border-2 bg-white border-gray-300 rounded-lg px-3 py-1 transition duration-300 hover:border-gray-500'>
            <BsSearch className='text-gray-600 cursor-pointer' onClick={handleSearch} />
            <input 
              className='outline-none px-2 py-1 text-gray-900 w-48 md:w-64' 
              placeholder='Search by Post Category/Title' 
              type='text'
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-gray-200 hover:text-black transition duration-300">
          <AiOutlineEdit className='text-xl' />
          <h2><Link to="/write">Create Post</Link></h2>
        </div>
        <div className='md:hidden' onClick={showMenu}>
          <p className='cursor-pointer flex text-xl'>
            <FaBars style={{ color: 'white' }} />
          </p>
          {menu && <Menu />}
        </div>
        <div className='hidden md:flex' onClick={showMenu}>
          <p className='cursor-pointer flex text-xl'>
            <FaBars className='text-gray-200' />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
