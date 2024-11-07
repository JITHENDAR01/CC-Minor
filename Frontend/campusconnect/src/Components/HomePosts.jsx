/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {IF} from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="flex  mt-8 space-x-2 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* left - Image section */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          alt={post.title}
          className="h-full w-[80%]  object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
      {/* right - Content section */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl text-blue-900 hover:underline ">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toTimeString().slice(0, 5)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg font-normal  text-gray-700 mb-2">
          {post.description.slice(0, 200) + " ..."}
        </p>
        <a
          href="#"
          className="inline-block text-blue-500 hover:text-blue-700 font-semibold text-sm md:text-md mt-auto"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default HomePosts;
