import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/Hooks";
import axios from "axios";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/blog/${id}`
        );
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/comments/${id}`
        );
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, [id]);

  const commentHandler = async (e) => {
    e.preventDefault();
    setCommentLoading(true);

    const commentDetails = {
      blogId: id,
      comment: e.target.comment.value.trim(),
      profile: user?.photoURL,
      name: user?.displayName,
    };

    if (!commentDetails.comment) {
      toast.error("Please enter a comment");
      setCommentLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        commentDetails
      );
      setComments([...comments, data]);
      toast.success("Comment added successfully!");
      e.target.reset();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add comment!");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[calc(100vh-250px)] flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Blog not found</p>
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

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-[400px]">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                {blog.title}
              </h1>
              <p className="text-xl font-medium text-cyan-400">
                {blog.category}
              </p>
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-8">
            <p className="text-xl font-medium text-gray-600 mb-6">
              {blog.short_description}
            </p>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {blog.long_description}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

            {/* Comment Form */}
            {blog.email !== user?.email && (
              <form onSubmit={commentHandler} className="mb-8">
                <div className="flex gap-4">
                  <textarea
                    name="comment"
                    placeholder="Share your thoughts..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    rows="3"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    disabled={commentLoading}
                    className={`
                      px-6 py-2 rounded-lg text-white font-medium self-end
                      ${
                        commentLoading
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
                      }
                    `}
                  >
                    {commentLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Posting...
                      </span>
                    ) : (
                      "Post Comment"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={comment.profile}
                        alt={comment.name}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {comment.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-13">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
