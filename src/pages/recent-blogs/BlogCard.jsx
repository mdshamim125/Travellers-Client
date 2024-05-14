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
  };
  const wishListHandler = async (blogData) => {
    if (user) {
      // console.log(blogData);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/wish-list`,
          blogData
        );
        // console.log(data);
        toast.success("Blog added Successfully to the wish-list!");
      } catch (err) {
        // console.log(err);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="max-w-sm  overflow-hidden shadow-lg my-4 border p-4 rounded-md">
      <img src={image} alt={title} className="w-full h-[300px]" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-cyan-600 font-medium text-lg">{category}</p>
        <p className="text-gray-700 text-base mt-2">{shortDescription}</p>
      </div>
      <div className="px-6 py-4">
        <Link
          to={`/details/${blogId}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Details
        </Link>
        <Link
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => wishListHandler(blogData)}
        >
          Wishlist
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
