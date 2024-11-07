import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ImCross } from 'react-icons/im';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import api from '../utils/api';
import {IF} from '../url'
const EditPost = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const postId = useParams().id;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [error, setError] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/post/${postId}`);
      console.log(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
      setCats(res.data.categories);
      if (res.data.photo) {
        setImgPreview(`${res.data.photo}`);
      }
      console.log(imgPreview)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  const addCategory = () => {
    if (cat.trim() === "") {
      setError("Category cannot be empty.");
      return;
    }
    if (cats.includes(cat.trim())) {
      setError("Category already added.");
      return;
    }
    setCats([...cats, cat.trim()]);
    setCat("");
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const post = {
      title,
      description: desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append('img', filename);
      formData.append("file", file);
      post.photo = filename;

      try {
        await api.post("/upload", formData);
      } catch (err) {
        console.error(err);
        return;
      }
    } else {
      const res = await api.get(`/posts/post/${postId}`);
      post.photo = res.data.photo;
    }
    
    try {
      const res = await api.put(`/posts/${postId}`, post);
      navigate('/posts/post/' + res.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 my-2">
        <h1 className="font-bold text-xl md:text-2xl mb-4">Update the Post</h1>
        <form className="flex flex-col space-y-4 md:space-y-6" onSubmit={handleUpdate}>
          <input 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text" 
            placeholder="Enter post title" 
            className="px-4 py-2 border border-gray-300 rounded" 
          />
          <input 
            onChange={(e) => {
              setFile(e.target.files[0]);
              if (e.target.files[0]) {
                setImgPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            type="file" 
            className="px-4 py-2 border border-gray-300 rounded" 
          />
          {
          (imgPreview && file) ?
            <img src={imgPreview} alt="Preview" className="mt-4 w-32 h-32 object-cover" /> 
          :
          
            <img src={IF+imgPreview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />
          
        }
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
                className="bg-black text-white px-4 py-2 font-semibold rounded hover:bg-gray-700"
              >
                Add
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex flex-wrap mt-3">
              {cats.map((c, i) => (
                <div key={i} className="flex items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                  <p>{c}</p>
                  <button 
                    type="button" 
                    onClick={() => deleteCategory(i)} 
                    className="text-white bg-red-600 rounded-full p-1 text-xs hover:bg-red-800"
                    aria-label="Remove category"
                  >
                    <ImCross />
                  </button>
                </div>
              ))}
            </div>
            <textarea 
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={15} 
              cols={30}
              placeholder="Write your post here..." 
              className="w-full px-4 py-2 border border-gray-300 rounded resize-none" 
            />
            <button 
              type="submit" 
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 rounded hover:bg-gray-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
