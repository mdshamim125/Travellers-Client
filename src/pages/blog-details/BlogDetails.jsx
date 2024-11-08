import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/Hooks";
import axios from "axios";

const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
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

  const commentHandler = async (e) => {
    e.preventDefault();
    const name = user?.displayName;
    const profile = user?.photoURL;
    const blogId = id;
    const comment = e.target.comment.value;
    const commentDetails = { blogId, comment, profile, name };
    // console.log(commentDetails);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        commentDetails
      );
      // console.log(data);
      // toast.success("Blog added Successfully to the wish-list!");
    } catch (err) {
      // console.log(err);
    }
    e.target.reset();
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/comments/${id}`
      );
      setComments(data);
    };
    getData();
  }, [id,user]);

  console.log(comments);

  return (
    <div className="min-h-[calc(100vh-250px)] my-12">
      <div className="container mx-auto p-6  shadow-lg rounded-lg">
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
          <p className="text-xl font- text-gray-700 mb-4">
            {blog.short_description}
          </p>
          <p className="text-gray-700 text-lg">{blog.long_description}</p>
        </div>
        
        {blog.email !== user?.email && (
          <>
            <div className="text-xl font-bold mb-10">Comment Below...</div>
            <form onSubmit={commentHandler} className="flex gap-4 items-center">
              <textarea
                name="comment"
                placeholder="comment here"
                className="p-2 rounded-md outline-none border"
                required
              ></textarea>
              <input type="submit" className="btn btn-primary text-white" />
            </form>
          </>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.map((comment, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md">
              <div className="flex items-center mb-2">
                <img
                  src={comment.profile}
                  alt={comment.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <p className="font-bold text-lg">{comment.name}</p>
              </div>
              <p className="">{comment.comment}</p>
            </div>
          ))}
        </div>

        {/* <Comments comments={comments}></Comments> */}
      </div>
    </div>
  );
};

export default BlogDetails;
