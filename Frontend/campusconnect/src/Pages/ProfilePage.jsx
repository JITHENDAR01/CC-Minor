// import React, { useContext, useEffect, useState } from 'react';
// import Footer from "../Components/Footer";
// import Navbar from "../Components/Navbar";
// import ProfilePosts from '../Components/ProfilePosts';
// import api from '../utils/api';
// import { UserContext } from '../Context/UserContext';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const {user,setUser}=useContext(UserContext)
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const[rollNo,setrollNo] = useState("")
//   const [updated, setUpdated] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?._id) {
//       fetchProfile(user._id);
//       userPosts(user._id);
//     }
//   }, [user]);

//   const fetchProfile = async (userId) => {
//     try {
//       const res = await api.get(`/users/${userId}`);
//       console.log(`User in profile ${userId}`);
//       setUserName(res.data.username);
//       setEmail(res.data.email);
//       setrollNo(res.data.rollNo)
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdate = async () => {
//     setUpdated(false);
//     try {
//       const res = await api.put(`/users/${user?._id}`, { username, email });
//       console.log(res.data);
//       setUpdated(true);
//     } catch (err) {
//       console.log(err);
//       setUpdated(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/users/${user?._id}`);
//       setUser(null);
//       navigate("/login");
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const userPosts = async (userId) => {
//     try {
//       const res = await api.get(`/posts/user/${userId}`);
//       console.log(res.data);
//       setPosts(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow px-8 md:px-[300px] mt-8 flex md:flex-row flex-col-reverse">
//         <div className="flex flex-col md:w-[70%] w-full">
//           <h1 className="text-xl font-bold mb-4">Your Posts</h1>
//           {posts.length > 0 ? (
//             posts.map((p) => <ProfilePosts key={p._id} p={p} />)
//           ) : (
//             <p>No posts available</p>
//           )}
//         </div>
//         <div className="flex flex-col space-y-4 ml-24 md:w-[30%] w-full mb-4 md:mb-0">
//           <h1 className="text-xl font-bold mb-4">Profile</h1>
//           <input
//             onChange={(e) => setUserName(e.target.value)}
//             value={username}
//             className="outline-none px-4 py-2 text-gray-500"
//             placeholder="Your username"
//             type="text"
//           />
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="outline-none px-4 py-2 text-gray-500"
//             placeholder="Your email"
//             type="email"
//           />
//           <input
//             onChange={(e) => setrollNo(e.target.value)}
//             value={rollNo}
//             className="outline-none px-4 py-2 text-gray-500"
//             placeholder="Your RollNo"
//             type="text"
//           />
//           <div className="flex items-center space-x-4 mt-8">
//             <button
//               onClick={handleUpdate}
//               className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
//             >
//               Update
//             </button>
//             <button
//               onClick={handleDelete}
//               className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
//             >
//               Delete
//             </button>
//           </div>
//           {updated && (
//             <h3 className="text-green-500 text-sm text-center mt-4">
//               User details updated successfully
//             </h3>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;
import React, { useContext, useEffect, useState } from 'react';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ProfilePosts from '../Components/ProfilePosts';
import api from '../utils/api';
import { UserContext } from '../Context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user: loggedInUser, setUser } = useContext(UserContext);
  const { userId } = useParams(); // Get userId from URL params
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // This check ensures that if userId is not defined, we fallback to the logged-in user's ID.
  //console.log(userId);
  console.log(loggedInUser?._id);
  let currentUserId;
  if(userId==='undefined'){
    currentUserId = loggedInUser?._id;
  }
  else currentUserId = userId ; 
  console.log(currentUserId) ;
  useEffect(() => {
    if (currentUserId) {
      fetchProfile(currentUserId);
      userPosts(currentUserId);
    }
  }, [currentUserId]);

  const fetchProfile = async (id) => {
    try {
      const res = await api.get(`/users/${id}`);
      console.log(res);
      setUserName(res.data.username);
      setEmail(res.data.email);
      setRollNo(res.data.rollNo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    setUpdated(false);
    try {
      const res = await api.put(`/users/${loggedInUser._id}`, { username, email });
      console.log(res.data);
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${loggedInUser._id}`);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const userPosts = async (id) => {
    try {
      const res = await api.get(`/posts/user/${id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow px-8 md:px-[300px] mt-8 flex md:flex-row flex-col-reverse">
        <div className="flex flex-col md:w-[70%] w-full">
          <h1 className="text-xl font-bold mb-4">User's Posts</h1>
          {posts.length > 0 ? (
            posts.map((p) => <ProfilePosts key={p._id} p={p} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>

        <div className="flex flex-col space-y-4 ml-24 md:w-[30%] w-full mb-4 md:mb-0">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            className="outline-none px-4 py-2 text-gray-500"
            placeholder="Username"
            type="text"
            disabled={loggedInUser?._id !== currentUserId} // Disable if not the logged-in user's profile
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none px-4 py-2 text-gray-500"
            placeholder="Email"
            type="email"
            disabled={loggedInUser?._id !== currentUserId} // Disable if not the logged-in user's profile
          />
          <input
            onChange={(e) => setRollNo(e.target.value)}
            value={rollNo}
            className="outline-none px-4 py-2 text-gray-500"
            placeholder="Roll No"
            type="text"
            disabled={loggedInUser?._id !== currentUserId} // Disable if not the logged-in user's profile
          />

          {/* Show Update and Delete buttons only if this is the logged-in user's profile */}
          {loggedInUser?._id === currentUserId && (
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
          )}
          {updated && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              User details updated successfully
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
