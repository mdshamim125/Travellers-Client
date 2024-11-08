import toast from "react-hot-toast";

const NewsLetter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // console.log(email);
    toast.success("Thanks You For Subscribing Us.");
    e.target.reset();
  };
  return (
    <header className=" rounded-sm">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl  font-semibold text-white dark:text-white lg:text-4xl">
                Subscribe To The{" "}
                <span className="text-blue-500">Newsletter</span>
              </h1>

              <p className="mt-3 text-gray-600 text-xl dark:text-gray-400">
                subscribe our newsletter{" "}
                to get the latest new from us
              </p>

              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Email Address"
                  />

                  <button className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
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
