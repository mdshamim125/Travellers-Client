import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/Hooks";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    short_description: "",
    long_description: "",
    image: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/blog/${id}`
        );
        setBlog(data);
        setImagePreview(data.image);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog data");
      }
    };
    getData();
  }, [id]);

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setImagePreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value.trim(),
      image: e.target.image.value.trim(),
      category: e.target.category.value,
      short_description: e.target.short_description.value.trim(),
      long_description: e.target.long_description.value.trim(),
      email: user?.email,
    };

    // Validate form data
    if (
      !formData.title ||
      !formData.image ||
      !formData.category ||
      !formData.short_description ||
      !formData.long_description
    ) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/blog/${id}`, formData);
      toast.success("Blog updated successfully!");
      navigate("/my-blogs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update blog!");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Update Your Travel Story
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={blog.title}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter a captivating title"
                required
              />
            </div>

            {/* Image URL Input with Preview */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Featured Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                defaultValue={blog.image}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Paste your image URL here"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 w-full object-cover rounded-lg"
                    onError={() => setImagePreview("")}
                  />
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={blog.category}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select a category</option>
                <option value="Solo Travel">Solo Travel</option>
                <option value="Luxury Travel">Luxury Travel</option>
                <option value="Adventure Travel">Adventure Travel</option>
              </select>
            </div>

            {/* Short Description */}
            <div>
              <label
                htmlFor="short_description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Short Description
              </label>
              <input
                type="text"
                id="short_description"
                name="short_description"
                defaultValue={blog.short_description}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Brief summary of your blog"
                required
              />
            </div>

            {/* Long Description */}
            <div>
              <label
                htmlFor="long_description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Story
              </label>
              <textarea
                id="long_description"
                name="long_description"
                defaultValue={blog.long_description}
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Share your travel experience in detail..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-8 py-3 rounded-lg text-white font-medium
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
