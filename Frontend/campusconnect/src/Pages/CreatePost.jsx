/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ImCross } from 'react-icons/im';
import { UserContext } from "../Context/UserContext";
import api from '../utils/api'
import { Navigate, useNavigate } from "react-router-dom";
import { MdDescription } from "react-icons/md";
const CreatePost = () => {

  const [title,setTitle]= useState("")
  const [desc,setDesc]=useState("")
  const [file,setFile]=useState(null)
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate  = useNavigate();
  const {user}=useContext(UserContext);

  const deleteCategory = (i) => {
    setCats(cats.filter((_, index) => index !== i));
  };

  const addCategory = () => {
    if (cat.trim() !== "") {
      setCats([...cats, cat.trim()]);
      setCat("");
    }
  };

  const handleCreate = async(e)=>{
    e.preventDefault()
    const post  = {
      title,
      description:desc ,
      username:user.username,
      userId:user._id,
      categories:cats
    }

    if(file){
      const formData = new FormData();
      const filename = Date.now()+file.name;
      formData.append('img', filename);
      formData.append("file",file)
      post.photo=filename
      //img upload
      try{
        const imgUpload = await api.post("/upload",formData)
        //console.log(imgUpload.data)
      }
      catch(err){
        console.error(err);
      }
    }
    
    try{
      const res = await api.post('/posts/write',post)
      console.log(res.data);
      navigate('/posts/post/'+res.data._id)
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 my-2">
        <h1 className="font-bold text-xl md:text-2xl mb-4">Create a New Post</h1>
        <form className="flex flex-col space-y-4 md:space-y-6" action="">
          <input 
            onChange={(e)=>setTitle(e.target.value)}
            type="text" 
            placeholder="Enter post title" 
            className="px-4 py-2 border border-gray-300 rounded" 
          />
          <input 
           onChange={(e)=>setFile(e.target.files[0])}
            type="file" 
            className="px-4 py-2 border border-gray-300 rounded" 
          />
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <input 
                value={cat} 
                onChange={(e) => setCat(e.target.value)} 
                type="text" 
                placeholder="Enter post category" 
                className="px-4 py-2 border border-gray-300 rounded" 
              />
              <button 
                type="button" 
                onClick={addCategory} 
                className="bg-black text-white px-4 py-2 font-semibold rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-3">
              {cats.map((c, i) => (
                <div key={i} className="flex items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                  <p>{c}</p>
                  <button 
                    type="button" 
                    onClick={() => deleteCategory(i)} 
                    className="text-white bg-red-600 rounded-full p-1 text-xs"
                    aria-label="Remove category"
                  >
                    <ImCross />
                  </button>
                </div>
              ))}
            </div>
            <textarea 
              onChange={(e)=>setDesc(e.target.value)}
              rows={15} cols={30}
              placeholder="Write your post here..." 
              className="w-full px-4 py-2 border border-gray-300 rounded resize-none" 
            />
            <button 
  onClick={handleCreate}
  type="submit" 
  className="bg-[#0056b3] w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 rounded"
>
  Create
</button>

          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
