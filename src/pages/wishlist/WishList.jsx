import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/Hooks";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const { user } = useAuth();
  const email = user?.email;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/wish-list/${email}`
      );
      setWishList(data);
    };
    getData();
  }, [email]);
  // console.log(wishList);

  const removeHandlerFromWishList = async (blogId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/wish-list/${email}/${blogId}`
      );
      setWishList(wishList.filter((blog) => blog.blogId !== blogId));
      toast.success("successfully removed the blog from your wish-list");
    } catch (error) {
      console.error("Error removing blog from wishlist:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-250px)] my-12">
      <h3 className="text-center font-bold text-2xl mt-10 mb-4">
        My Wish-List
      </h3>
      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mb-16">
        {wishList.map((blog) => (
          <div key={blog.blogId} className="my-4 border p-4 rounded-md">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[300px]"
            />
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className=" text-gray-600 font-xl font-medium">
              {blog.category}
            </p>
            <p className="text-gray-600">{blog.shortDescription}</p>

            <Link to={`/details/${blog.blogId}`} className="bg-blue-500 text-white py-1 px-2 rounded-md mt-2 mr-2">
              Details
            </Link>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md mt-2"
              onClick={() => removeHandlerFromWishList(blog.blogId)}
            >
              Remove Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
