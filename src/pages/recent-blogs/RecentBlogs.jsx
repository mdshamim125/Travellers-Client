import axios from "axios";
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS
import toast from "react-hot-toast";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Duration of the animation
      offset: 200, // Offset for triggering animation
      easing: "ease-in-out", // Animation easing
    });

    // Fetch recent blogs data
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/recent-blogs?limit=6`
        );
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
        setError("Failed to load recent blogs. Please try again later.");
        toast.error("Failed to load recent blogs");
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
    <div className="min-h-[calc(100vh-250px)] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-500 mb-4">
            Latest Travel Stories
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Discover the most recent adventures and experiences shared by our
            community of travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <BlogCard
                blogId={blog._id}
                title={blog.title}
                category={blog.category}
                image={blog.image}
                shortDescription={blog.short_description}
                bloggerProfile={blog.blog_owner_profile}
                blogger={blog.blog_owner}
              />
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No recent blogs available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;
