import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogCard from "./BlogCard";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/recent-blogs`
      );
      setBlogs(data);
    };
    getData();
  }, []);

  //   console.log(blogs);

  return (
    <div>
      <h2 className="text-3xl my-10 font-bold text-center">
        Recent Blogs Section
      </h2>

      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mb-16">
        {blogs.slice(0, 6).map((blog, index) => (
          <BlogCard
            key={index}
            blogId={blog._id}
            title={blog.title}
            category={blog.category}
            image={blog.image}
            shortDescription={blog.short_description}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
