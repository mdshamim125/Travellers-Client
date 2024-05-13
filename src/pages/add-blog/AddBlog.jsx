import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/Hooks";

const AddBlog = () => {
  const { user } = useAuth();
  // console.log(user?.email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const category = e.target.category.value;
    const short_description = e.target.short_description.value;
    const long_description = e.target.long_description.value;
    const email = user?.email;
    // console.log(title, image, category, short_description, long_description);

    const blogData = {
      title,
      image,
      category,
      short_description,
      long_description,
      email,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        blogData
      );
      // console.log(data);
      toast.success("Blog added Successfully!");
      e.target.reset();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="w-full px-4 md:max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center mt-6">
        Add Your Blog Here
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

export default AddBlog;
