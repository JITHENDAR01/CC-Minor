import React, { useContext } from 'react'
import './App.css'
import {Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import PostDetails from './Pages/PostDetails';
import CreatePost from './Pages/CreatePost';
import EditPost from './Pages/EditPost';
import Profile from './Pages/ProfilePage';
import MyBlogs from './Pages/MyBlogs';
import Home from './Pages/Home';
import { UserContext, UserContextProvider } from './Context/UserContext';
import LandingPage from './Pages/LandingPage';
import Privacy from './Pages/Privacy';
import AboutUs from './Pages/About';
function App() {
  

  return ( 
    
    <UserContextProvider>
      
      <Routes>
        <Route exact path='/' element={<LandingPage/>}></Route>
        {/* <Route exact path="/" element={<Login/>}/> */}
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/privacy" element={<Privacy/>}/>
        <Route exact path="/about" element={<AboutUs/>}/>
        <Route exact path="/write" element={<CreatePost/>}/>
        <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
        <Route exact path="/edit/:id" element={<EditPost/>}/>
        <Route exact path="/bookmarks/" element={<MyBlogs/>}/>
        <Route path="/profile/:userId" element={<Profile />} />
        <Route exact path="/profile/:id" element={<Profile/>}/>
      
      </Routes>
    
    </UserContextProvider>
  )
}

export default App
