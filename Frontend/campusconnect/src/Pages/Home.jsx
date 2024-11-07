import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import HomePosts from "../Components/HomePosts";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import api from '../utils/api';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(true); // Start with loader true
  const { search } = useLocation();
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoader(true); 
    try {
      const res = await api.get(`/posts${search}`); 
      console.log(res.data);
      setPosts(res.data);
      setNoResults(res.data.length === 0); 
    } catch (err) {
      console.error('Error fetching posts:', err);
      setNoResults(true); 
    } finally {
      setLoader(false); 
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchPosts();
    }
  }, [search, loading]);

  if (loading) {
    return (
      <div className="h-[40vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    navigate('/'); 
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-4 mb-4 flex-col w-full md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          !noResults ? (
            posts.map((post) => (
              <div key={post._id}>
                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                  <HomePosts post={post} />
                </Link>
              </div>
            ))
          ) : (
            <h3 className="text-center font-bold mt-16">No posts available</h3>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
