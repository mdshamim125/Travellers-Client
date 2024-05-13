import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "./../../hooks/Hooks";
import MyBlogCard from "./MyBlogCard";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const { user } = useAuth();
  console.log(user?.email);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/my-blogs/${user?.email}`
      );

      setMyBlogs(data);
    };
    getData();
  }, [user]);

  console.log(myBlogs);
  return (
    <div>
      <h2 className="text-center font-bold text-2xl mt-10 mb-4">My Blogs</h2>

      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mb-16">
        {myBlogs.map((blog, _id) => (
          <MyBlogCard
            key={_id}
            title={blog.title}
            category={blog.category}
            image={blog.image}
            shortDescription={blog.short_description}
            _id={blog._id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
