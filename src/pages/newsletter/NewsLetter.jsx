import { useEffect } from "react";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsLetter = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in-out",
    });
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    toast.success("Thank you for subscribing to us!");
    e.target.reset();
  };

  return (
    <header className="rounded-sm">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-right" // Animation for the left section
          >
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                Subscribe To The{" "}
                <span className="text-blue-500">Newsletter</span>
              </h1>

              <p className="mt-3 text-gray-600 text-xl">
                Subscribe to our newsletter to get the latest news from us.
              </p>

              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Email Address"
                  />
                  <button className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:bg-blue-500">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2"
            data-aos="fade-right" // Animation for the right section
          >
            <img
              className="w-full h-full rounded-md"
              src="https://i.ibb.co/5sBnStq/10769817-4529564.jpg"
              alt="email illustration vector art"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NewsLetter;
