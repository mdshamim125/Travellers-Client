import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../recent-blogs/BlogCard";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Duration of the animation in ms
      offset: 200, // Offset for triggering the animation
      easing: "ease-in-out", // Easing function for the animation
    });

    const getData = async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/all-blogs?filter=${filter}&search=${search}`
      );
      setBlogs(data);
    };
    getData();
  }, [filter, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div className="min-h-[calc(100vh-250px)] my-12">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-6">
        <div>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
            name="category"
            id="category"
            className="border p-4 rounded-lg"
          >
            <option value="">Filter By Category</option>
            <option value="Solo Travel">Solo Travel</option>
            <option value="Luxury Travel">Luxury Travel</option>
            <option value="Adventure Travel">Adventure Travel</option>
          </select>
        </div>

        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              name="search"
              placeholder="Enter Blog Title"
              aria-label="Enter Blog Title"
            />
            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mb-16">
        {blogs.map((blog, index) => (
          <div
            key={index}
            data-aos="fade-up" // Apply fade-up animation
            data-aos-delay={index * 100} // Stagger animations for cards
          >
            <BlogCard
              blogId={blog._id}
              title={blog.title}
              category={blog.category}
              image={blog.image}
              shortDescription={blog.short_description}
              longDescription={blog.long_description}
              bloggerProfile={blog.blog_owner_profile}
              blogger={blog.blog_owner}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
