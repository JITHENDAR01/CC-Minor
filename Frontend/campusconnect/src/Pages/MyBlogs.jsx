import { Link, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import HomePosts from "../Components/HomePosts";
import Navbar from "../Components/Navbar";
import Loader from '../Components/Loader';
import api from '../utils/api';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const MyBlogs = () => {
    const [posts, setPosts] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loader, setLoader] = useState(false);
    const { user } = useContext(UserContext);

    const fetchPosts = async () => {
        setLoader(true);
        try {
            const res = await api.get(`/users/getAllBookmarks/`);
            console.log(res.data);

            if (res.data.length === 0) {
                setNoResults(true);
            } else {
                setPosts(res.data); // res.data now contains post details
                setNoResults(false);
            }
           
        } catch (err) {
            console.error("Error fetching bookmarks:", err.message);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="px-4 mb-4 md:px-[200px] min-h-[80vh]">
                {loader ? (
                    <div className="h-[40vh] flex justify-center items-center"><Loader /></div>
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
                        <h3 className="text-center font-bold mt-16">No posts Bookmarked!</h3>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyBlogs;
