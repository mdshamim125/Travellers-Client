import axios from "axios";
import  { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Duration of the animation
      offset: 200, // Offset for triggering animation
      easing: "ease-in-out", // Animation easing
    });

    // Fetch recent blogs data
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/recent-blogs?limit=6`
      );
      setBlogs(data);
    };

    getData();
  }, []);

  console.log(blogs);

  return (
    <div>
      <h2 className="text-white text-3xl my-10 font-bold text-center">
        Recent Blogs Section
      </h2>

      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mb-16">
        {blogs.slice(0, 6).map((blog, index) => (
          <div
            key={index}
            data-aos="fade-up" // Apply AOS fade-up animation
            data-aos-delay={index * 100} // Delay each card animation by 100ms
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
    </div>
  );
};

export default RecentBlogs;
