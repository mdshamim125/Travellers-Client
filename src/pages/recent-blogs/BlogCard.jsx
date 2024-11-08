import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Hooks";

const BlogCard = ({
  blogId,
  title,
  category,
  image,
  shortDescription,
  longDescription,
  bloggerProfile,
  blogger,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const email = user?.email;
  const blogData = {
    email,
    blogId,
    title,
    category,
    image,
    shortDescription,
    longDescription,
    bloggerProfile,
    blogger,
  };

  const wishListHandler = async (blogData) => {
    if (user) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/wish-list`,
          blogData
        );
        toast.success("Blog added Successfully to the wish-list!");
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-sm overflow-hidden shadow-lg my-4 border p-4 rounded-md">
      {/* Wrapper div for title, category, and blogger info with background image */}
      <div
        className="relative w-full h-[200px] bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
        <div className="relative z-10 px-6 py-4 flex flex-col gap-2">
          <div className="font-bold text-xl text-white">{title}</div>
          <p className="text-cyan-400 font-medium text-lg">{category}</p>
        </div>
      </div>

      {/* Blogger info */}
      <div className="flex items-center mt-4">
        <img
          src={bloggerProfile}
          alt={blogger}
          className="w-8 h-8 rounded-full border-2 border-white mr-2"
        />
        <p className="text-white font-medium">{blogger}</p>
      </div>

      {/* Short description section */}
      <div className=" ">
        <p className="text-gray-700 text-base mt-2">{shortDescription}</p>
      </div>

      {/* Action buttons */}
      <div className=" py-4">
        <Link
          to={`/details/${blogId}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Details
        </Link>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => wishListHandler(blogData)}
        >
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
