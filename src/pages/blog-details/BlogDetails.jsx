import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();
  //   console.log(id);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/blog/${id}`
      );
      setBlog(data);
    };
    getData();
  }, [id]);
  //   console.log(blog);
  return (
    <div className="min-h-[calc(100vh-250px)] my-12">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <p className="text-2xl font-medium text-gray-600 uppercase mb-4">
            {blog.category}
          </p>
          <p className="text-xl font- text-gray-700 mb-4">{blog.short_description}</p>
          <p className="text-gray-700 text-lg">
            {blog.long_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
