import React, { useContext, useEffect, useState } from 'react';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Comment from '../Components/Comment';
import Loader from '../Components/Loader';
import { BiEdit } from 'react-icons/bi';
import { MdDelete, MdBookmark , MdThumbUp } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { URL, IF } from '../url';
import { UserContext } from '../Context/UserContext';

const PostDetails = () => {
    const postId = useParams().id;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useContext(UserContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [author,setAuthor] = useState({})
    useEffect(() => {
        if (user) {
            fetchPost();
        }
    }, [user, postId]);

    const fetchPost = async () => {
        try {
            const response = await api.get(`/posts/post/${postId}`);
            setPost(response.data);
            setLoader(false);

            let flagLike = false;
            let flagBook = false;
            user.bookmarks.map(({ _id }) => {
                if (_id === postId) {
                    flagBook = true;
                }
            });
            user.likes.map(({ _id }) => {
                
                if (_id === postId) {
                    console.log("push")
                    flagLike = true;
                }
            });
            if (user && flagBook) {
                setIsBookmarked(true);
            }
            // if (user && flagLike) {
            //     setIsLiked(true);
            // }
        } catch (error) {
            console.error('Error fetching post:', error);
            setLoader(true);
        }
    };

    const handleBookmark = async () => {
        let route = isBookmarked ? "removeBookmark" : "addBookmark";
        try {
            await api.post(`/users/${route}/${postId}`);
            setIsBookmarked(!isBookmarked);
            window.location.reload(true);
        } catch (err) {
            console.error('Error in handleBookmark:', err);
        }
    };

    // const handleLike = async () => {
    //     let route = isLiked ? "removeLike" : "addLike";
    //     try {
    //         //console.log(typeof postId)
    //         await api.post(`/users/${route}/${postId}`);
    //         setIsLiked(!isLiked);
    //         window.location.reload(true);
    //     } catch (err) {
    //         console.error('Error in handleLike:', err);
    //     }
    // }
    

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${postId}`);
            navigate('/home');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await api.get(`/comments/post/${postId}`);
            setComments(res.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const postComment = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/comments/create`, { comment: comment, author: user.username, postId: postId, userId: user._id });
            window.location.reload(true);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };
    

   const userId = post.userId ;
   console.log(userId)
//   //console.log(comment);
//   async function getUser() {
//     try {
//       const res = await api.get(`/users/${userId}`);
//       return res.data; 
//     } catch (err) {
//       console.log(err);
//       return null;
//     }
//   }
  
//   async function fetchAuthor() {
//     const author = await getUser();
//     setAuthor(author)
//     //console.log(author); 
//   }
  
//   fetchAuthor();

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            {loader ? <div className='h-[80vh] flex justify-center items-center'><Loader /></div> :
                <div className="dark:bg-black px-4 md:px-20 mt-8">
                    {/* Header Section */}
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-black dark:text-white">{post.title}</h1>
                        <div className="flex space-x-4">
                            {user?._id === post.userId && (
                                <>
                                    <button className="text-xl cursor-pointer" onClick={() => navigate("/edit/" + postId)}>
                                        <BiEdit />
                                    </button>
                                    <button className="text-xl cursor-pointer" onClick={handleDelete}>
                                        <MdDelete />
                                    </button>
                                </>
                            )}
                            {/* <button onClick={handleLike} className="text-xl cursor-pointer">
                                <MdThumbUp className={isLiked ? "text-blue-500" : "text-gray-500"} />
                            </button> */}
                            <button onClick={handleBookmark} className="text-xl cursor-pointer">
                                <MdBookmark className={isBookmarked ? "text-yellow-500" : "text-gray-500"} />
                            </button>
                        </div>
                    </header>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-gray-500 mb-4">
                        <p onClick={()=>navigate(`/profile/${post.userId}`)} className='cursor-pointer'>@{post.username}</p>
                        <div className="flex space-x-2">
                            <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
                            <span>{new Date(post.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="clearfix mb-6">
                        <img
                            src={`${IF}${post.photo}`}
                            alt="Post Visual"
                            className="float-left w-[45%] mr-6 mb-4 rounded-lg"
                        />
                        <article className="text-lg dark:text-white leading-relaxed">
                            <p>{post.description}</p>
                        </article>
                    </div>


                    {/* Description */}
                    

                    {/* Categories */}
                    {post.categories?.length > 0 && (
                        <section className="flex items-center mt-6 space-x-4 font-semibold text-gray-700 dark:text-white">
                            <p>Categories:</p>
                            <div className="flex flex-wrap gap-2">
                                {post.categories.map((c, i) => (
                                    <div key={i} className="bg-gray-300 dark:bg-gray-600 rounded-lg px-3 py-1">
                                        {c}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Comments */}
                    <section className="mt-6 flex flex-col">
                        <h3 className="text-xl font-semibold mb-4">Comments:</h3>
                        {comments.length > 0 ? (
                            comments.map((c) => <Comment key={c._id} comment={c} />)
                        ) : (
                            <p className=" text-gray-500 dark:text-gray-300">No comments yet.</p>
                        )}
                    </section>

                    {/* Add Comment */}
                    <section className="w-full mt-4 flex flex-col md:flex-row gap-6 py-6">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 py-2 px-4 border border-gray-300 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none"
                        />
                        <button onClick={postComment} className="md:w-[20%] bg-black text-white py-2 px-4 rounded-md">
                            Add Comment
                        </button>
                    </section>
                </div>
            }
            <Footer />
        </div>
    );
};

export default PostDetails;
