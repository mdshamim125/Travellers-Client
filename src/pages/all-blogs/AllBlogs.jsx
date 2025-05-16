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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const blogsPerPage = 6;

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Duration of the animation in ms
      offset: 200, // Offset for triggering the animation
      easing: "ease-in-out", // Easing function for the animation
    });

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Log the API URL and parameters
        const apiUrl = `${
          import.meta.env.VITE_API_URL
        }/all-blogs?filter=${filter}&search=${search}&page=${currentPage}&limit=${blogsPerPage}`;
        // console.log("Fetching data from:", apiUrl);

        const response = await axios(apiUrl);
        // console.log("API Response:", response.data);

        if (!response.data) {
          throw new Error("No data received from the server");
        }

        // Handle the response data
        if (Array.isArray(response.data)) {
          // If the response is an array, slice it for pagination
          const startIndex = (currentPage - 1) * blogsPerPage;
          const endIndex = startIndex + blogsPerPage;
          const paginatedData = response.data.slice(startIndex, endIndex);

          setBlogs(paginatedData);
          setTotalPages(Math.ceil(response.data.length / blogsPerPage));
        } else if (response.data.blogs) {
          // If the response has blogs property
          setBlogs(response.data.blogs);
          setTotalPages(
            Math.ceil(
              (response.data.total || response.data.blogs.length) / blogsPerPage
            )
          );
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        console.error("Error details:", error);
        setError(
          error.message || "Failed to fetch blogs. Please try again later."
        );
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [filter, search, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-250px)] my-12">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-6">
        <div>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1); // Reset to first page on filter change
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

      {blogs && blogs.length > 0 ? (
        <>
          <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mb-16">
            {blogs.map((blog, index) => (
              <div
                key={blog._id || index}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-600 text-xl">
          No blogs found. Try adjusting your search or filter.
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
