import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-10">
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full lg:w-2/5">
            <div className="px-6">
              

              <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                Join 31,000+ others and never miss our  new trip and other facilities.
              </p>

              <div className="flex mt-6 -mx-2">
                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label="Reddit"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 12C2 16.418 5.589 20 10 20V14C7.794 14 6 12.206 6 10C6 7.794 7.794 6 10 6V2C5.589 2 2 5.582 2 10Z"></path>
                    <path d="M22 10C22 5.582 18.411 2 14 2V6C16.206 6 18 7.794 18 10C18 12.206 16.206 14 14 14V20C18.411 20 22 16.418 22 12Z"></path>
                  </svg>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 2C3 1.447 3.447 1 4 1H20C20.553 1 21 1.447 21 2V20C21 20.553 20.553 21 20 21H12V15.75H16.5L17 12H12V9.25C12 8.102 13.053 7 14.25 7H17V4.875C16.503 4.869 15.33 4.896 13.875 4.896C11.418 4.896 9.947 6.436 9.947 9V12H7V15.75H9.947V21H4C3.447 21 3 20.553 3 20V2Z"></path>
                  </svg>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label="Github"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 12C2 16.418 5.589 20 10 20V14C7.794 14 6 12.206 6 10C6 7.794 7.794 6 10 6V2C5.589 2 2 5.582 2 10Z"></path>
                    <path d="M22 12C22 7.582 18.411 4 14 4V8C16.206 8 18 9.794 18 12C18 14.206 16.206 16 14 16V20C18.411 20 22 16.418 22 12Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white">
                  About
                </h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Company
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Community
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Careers
                </a>
              </div>

              <div>
                <h3 className="text-gray-700 uppercase dark:text-white">
                  Blog
                </h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Tech
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Music
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Videos
                </a>
              </div>

              <div>
                <h3 className="text-gray-700 uppercase dark:text-white">
                  Products
                </h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Mega Cloud
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Aperion UI
                </a>
                
              </div>

              <div>
                <h3 className="text-gray-700 uppercase dark:text-white">
                  Contact
                </h3>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  +1 526 654 8965
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  example@email.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

        <div>
          <p className="text-center text-gray-500 dark:text-gray-400">
            © TB 2024 - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
