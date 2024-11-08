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

  const removeHandlerFromWishList = async (blogId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/wish-list/${email}/${blogId}`
      );
      setWishList(wishList.filter((blog) => blog.blogId !== blogId));
      toast.success("Successfully removed the blog from your wish-list");
    } catch (error) {
      console.error("Error removing blog from wishlist:", error);
    }
  };

  console.log(wishList);
  return (
    <div className="min-h-[calc(100vh-250px)] my-12">
      <h3 className="text-center text-white font-bold text-2xl mt-10 mb-4">
        My Wish-List
      </h3>
      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mb-16">
        {wishList.map((blog) => (
          <div key={blog.blogId} className="my-4 border p-4 rounded-md">
            {/* Background image section with title, category, and blogger info */}
            <div
              className="relative w-full h-[200px] bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${blog.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
              <div className="relative z-10 px-6 py-4">
                <h2 className="font-bold text-xl text-white">{blog.title}</h2>
                <p className="text-cyan-400 font-medium">{blog.category}</p>

                
              </div>
            </div>

            {/* Blogger info */}
            <div className="flex items-center mt-4">
                  <img
                    src={blog.bloggerProfile}
                    alt={blog.blogger}
                    className="w-8 h-8 rounded-full border-2 border-white mr-2"
                  />
                  <p className="text-white font-medium">{blog.blogger}</p>
                </div>

            {/* Short description section */}
            <div className="py-2">
              <p className="text-gray-700 text-base">{blog.shortDescription}</p>
            </div>

            {/* Action buttons */}
            <div className=" py-4 flex space-x-2">
              <Link
                to={`/details/${blog.blogId}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md"
              >
                Details
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
                onClick={() => removeHandlerFromWishList(blog.blogId)}
              >
                Remove Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
