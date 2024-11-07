import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import api from '../utils/api'
import { UserContext } from '../Context/UserContext';
import { useContext, useState } from 'react';
const Comment =  ({comment})=>{

  const [author,setAuthor] = useState({})
  const {user}=useContext(UserContext)
  //console.log(user);
  const handleDelete = async(id)=>{
    try{
      await api.delete(`/comments/${id}`)
      window.location.reload(true)
    }
    catch(err){
      console.log(err);
    }
  }
  const userId = comment.userId ;
  //console.log(comment);
  async function getUser() {
    try {
      const res = await api.get(`/users/${userId}`);
      return res.data; 
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  
  async function fetchAuthor() {
    const author = await getUser();
    setAuthor(author)
    //console.log(author); 
  }
  
  fetchAuthor();
    return(
        <div>
        <section className="mt-8">
          
          <div className="bg-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              
                {/* //user?._id===comment?.userId? */}
                <h4 className="font-bold text-gray-600">@{author.username}</h4>
              
              
              <div className="flex space-x-4 text-gray-500 text-sm">
              <span>{new Date(comment.updatedAt).toString().slice(0,15)}</span>
              <span>{new Date(comment.updatedAt).toString().slice(16,21)}</span>
                {
                  user?._id===comment?.userId?
                    <div className="flex space-x-2">
                    {/* <button aria-label="Edit comment"><BiEdit/></button> */}
                    <button className='cursor-pointer' onClick={()=>handleDelete(comment._id)} aria-label="Delete comment"><MdDelete/></button>
                  </div>:""
                }
              </div>
            </div>
            <p className="mt-2">{comment.comment}</p>
          </div>
        </section>
        </div>
    )
}
export default Comment;