import React, { useState, useEffect } from "react";
import axios from "axios";

const FeaturedBlogs = () => {
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/featured-blogs`
        );

        const sortedBlogs = response.data
          .map((blog) => ({
            ...blog,
            wordCount: blog.long_description.split(" ").length,
          }))
          .sort((a, b) => b.wordCount - a.wordCount);

        const topTenBlogs = sortedBlogs.slice(0, 10);

        setTopBlogs(topTenBlogs);
      } catch (error) {
        console.error("Error fetching top blogs: ", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-center font-semibold mb-6">
        Featured Blogs
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Blog Title</th>
              <th>Blogger Name</th>
              <th>Blogger Profile</th>
            </tr>
          </thead>
          <tbody>
            {topBlogs.map((blog, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td>{blog.blog_owner}</td>
                <td>
                  <img
                    src={blog.blog_owner_profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
