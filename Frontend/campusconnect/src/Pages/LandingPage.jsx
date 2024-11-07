// import React, { useState, useEffect } from "react";
// import { Navigate, useNavigate, Link } from "react-router-dom";
// import { FaTwitter, FaInstagram, FaFacebook, FaYoutube , } from "react-icons/fa";
// import logo from '../assets/logo.png'

// const images = [
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxwgMgvi-xh6oz6IHllR_NWtnG_solljH_w&s",
//     "https://www.allschoolscolleges.com/images/college_photo/461477397018.jpg",
//     "https://www.allschoolscolleges.com/images/college_photo/301477397018.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcGfEqEXMg9ZXzEf2U7yk55dyLb_0T_HGAXQ&s",
// ];

// const LandingPage = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 3000); // Change image every 3 seconds
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-800 flex flex-col justify-center items-center px-6 py-8">
//             {/* Header Section */}
//             <header className="flex  items-center justify-between w-full max-w-5xl">
//                 <div className="flex items-center">
//                 <img src={logo} alt="CVR Corner Logo" className="w-32 h-32 rounded-lg" />
//                 <div className="text-4xl font-bold text-blue-800 italic font-serif">CampusConnect</div>
//                 </div>
//                 <div>
//                     {/* <a href="#" className="text-white hover:text-black">
//                         About
//                     </a> */}
//                 </div>
//             </header>

//             {/* Main Section with Text and Image */}
//             <main className="flex items-center space-x-20 justify-between w-full max-w-5xl mt-10">
//                 {/* Text Section */}
//                 <div className="text-left w-1/2 mr-8">

//                     <h1 className="text-5xl font-bold text-blue-700 mb-4">
//                     Discover, Connect, Succeed Together.
//                     </h1>
//                     <p className="text-lg text-gray-600 mb-6">
//                     Exchange your ideas, articles, and feedback with your classmates and peers.
                        
//                     </p>
//                     <p className="text-lg text-gray-600 mb-6">
//                     Join the CampusConnect community.
                        
//                     </p>
//                     <div className="flex space-x-4">
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                         <Link to="/signup">Join now</Link>
//                     </button>
//                     <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
//                         <Link to="/login">Login</Link>
//                     </button>
//                 </div>
//                 </div>
                

//                 {/* Image Carousel Section with Background Blocks */}
//                 <div className="ml-8 relative w-1/2 h-80 flex justify-center items-center overflow-hidden">
//                     {/* Background Blocks 
//                     <div className="absolute bg-yellow-400 w-40 h-50 -right-10 -top-0 z-20"></div>
//                     <div className="absolute bg-orange-500 w-32 h-32 -right-20 -bottom-10 z-0"></div>

//                     {/* Image Carousel */}
//                     <div className="relative w-full h-full flex">
//                         {images.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={image}
//                                 alt={`Slide ${index + 1}`}
//                                 className={`absolute w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out ${
//                                     index === currentIndex ? "opacity-100" : "opacity-0"
//                                 }`}
//                             />
//                         ))}
//                     </div>
//                 </div>
                
//             </main>

//             {/* Footer Section */}
//             <footer className="w-full max-w-5xl text-center mt-20 mb-0 text-gray-600">
//                 {/* Social Icons */}
//                 <div className="flex justify-center space-x-4 mb-4">
//                     <a href="#" className="text-blue-800 hover:text-blue-600">
//                         <FaTwitter />
//                     </a>
//                     <a href="#" className="text-blue-800 hover:text-blue-600">
//                         <FaInstagram />
//                     </a>
//                     <a href="#" className="text-blue-800 hover:text-blue-600">
//                         <FaFacebook />
//                     </a>
//                     <a href="#" className="text-blue-800 hover:text-blue-600">
//                         <FaYoutube />
//                     </a>
//                 </div>
//                 <p>&copy; 2024 CampusConnect. All rights reserved.</p>
//                 <div className="flex justify-center space-x-4 mt-2">
//                     <a href="#" className="text-blue-600 hover:text-blue-800">
//                         Privacy Policy
//                     </a>
//                     <a href="#" className="text-blue-600 hover:text-blue-800">
//                         Terms of Service
//                     </a>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import logo from '../assets/logo.png';
import landingimg from '../assets/landingimg.jpg';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-8">
            {/* Header Section */}
            <header className="flex items-center justify-between w-full max-w-5xl">
                <div className="flex items-center">
                <img src={logo} alt="CVR Corner Logo" className="w-20 h-20 rounded-lg" />
<div className="text-4xl font-bold text-black-800 ml-4" style={{ fontFamily: 'Georgia, serif' }}>
    CampusConnect
</div>
                </div>
            </header>

            {/* Main Section with Text and Image */}
            <main className="flex items-center space-x-20 justify-between w-full max-w-5xl mt-10">
                {/* Text Section */}
                <div className="text-left w-1/2 mr-8">
                    <h1 className="text-5xl font-bold text-blue-700 mb-4">
                        Discover, Connect, Succeed Together.
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Exchange your ideas, articles, and feedback with your classmates and peers.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                        Join the CampusConnect community.
                    </p>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            <Link to="/signup">Join now</Link>
                        </button>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                            <Link to="/login">Login</Link>
                        </button>
                    </div>
                </div>

                {/* Static Image Section */}
                <div className="ml-8 w-1/2">
                    <img
                        src={landingimg}// Replace with desired static image
                        alt="Campus"
                        className="w-full h-80 object-cover rounded-lg shadow-lg"
                    />
                </div>
            </main>

            {/* Footer Section */}
            <footer className="w-full max-w-5xl text-center mt-20 mb-0 text-gray-600">
                {/* Social Icons */}
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://twitter.com" className="text-blue-800 hover:text-blue-600">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" className="text-blue-800 hover:text-blue-600">
                        <FaInstagram />
                    </a>
                    <a href="https://facebook.com" className="text-blue-800 hover:text-blue-600">
                        <FaFacebook />
                    </a>
                    <a href="https://linkedin.com" className="text-blue-800 hover:text-blue-600">
                        <FaLinkedin />
                    </a>
                </div>
                <p>&copy; 2024 CampusConnect. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/about" className="text-blue-600 hover:text-blue-800">
                        About Us
                    </a>
                    <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

