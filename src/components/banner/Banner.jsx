import { Typewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const Banner = () => {
  
  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/jbzSfwD/mike-swigunski-Fz0-XVa-r-LQI-unsplash.jpg')",
        minHeight: "calc(100vh - 80px)", // Adjust 80px to match your navbar height
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-gray-950 opacity-70"></div>
      <div className="relative container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2" data-aos="fade-right" data-aos-duration="1000"
    data-aos-easing="ease-in-out">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                Welcome To Our <br />
                <span className="text-blue-500">
                  <Typewriter
                    words={['Travelers']}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </h1>

              <p className="mt-3 text-gray-200">
                Explore the wonders of the world with us as we embark on
                exciting adventures, uncover hidden gems, and share
                unforgettable experiences. Join our community of fellow
                travelers and discover the joy of exploration, one destination
                at a time.
              </p>

              <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
