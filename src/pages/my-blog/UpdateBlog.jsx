import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/Hooks";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate()
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    short_description: "",
    long_description: "",
    image: "",
  });

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

  //   useEffect(() => {
  //     if (!user) return;

  //     fetch(`${import.meta.env.VITE_API_URL}/blog/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBlog(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching blog items:", error);
  //       });
  //   }, [user, id]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const category = e.target.category.value;
    const short_description = e.target.short_description.value;
    const long_description = e.target.long_description.value;
    const email = user?.email;
    // console.log(title, image, category, short_description, long_description, email);
    const blogData = {
        title,
        image,
        category,
        short_description,
        long_description,
        email,
      };

      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/blog/${id}`,
          blogData
        )
        console.log(data)
        toast.success('Blog Data Updated Successfully!')
        navigate('/my-blogs')
      } catch (err) {
        console.log(err)
        toast.error(err.message)
      }

  };

  return (
    <div className="w-full px-4 md:max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center mt-6">
        Update Your Blog Here
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={blog.title}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block font-semibold">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={blog.image}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-semibold">
            Category:
          </label>
          <select
            id="category"
            name="category"
            defaultValue={blog.category}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="Solo Travel">Solo Travel</option>
            <option value="Luxury Travel">Luxury Travel</option>
            <option value="Adventure Travel">Adventure Travel</option>
          </select>
        </div>
        <div>
          <label htmlFor="shortDescription" className="block font-semibold">
            Short Description:
          </label>
          <input
            type="text"
            id="short_description"
            name="short_description"
            defaultValue={blog.short_description}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="longDescription" className="block font-semibold">
            Long Description:
          </label>
          <textarea
            rows="7"
            id="long_description"
            name="long_description"
            defaultValue={blog.long_description}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
