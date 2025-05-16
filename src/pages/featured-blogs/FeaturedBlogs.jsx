import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const FeaturedBlogs = () => {
  const [topBlogs, setTopBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
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
        setError("Failed to load featured blogs. Please try again later.");
        toast.error("Failed to load featured blogs");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

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
    <div
      className="min-h-[calc(100vh-250px)] py-12 relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Travel Stories
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Blog Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Word Count
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topBlogs.map((blog, index) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                          ${
                            index === 0
                              ? "bg-yellow-400 text-yellow-900"
                              : index === 1
                              ? "bg-gray-300 text-gray-700"
                              : index === 2
                              ? "bg-amber-600 text-amber-100"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {blog.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={blog.blog_owner_profile}
                          alt={blog.blog_owner}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          {blog.blog_owner}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {blog.wordCount} words
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/details/${blog._id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Read Story
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {topBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No featured blogs available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
