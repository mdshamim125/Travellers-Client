import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Hooks";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const { googleLogin, createUser, updateUserProfile, setUser } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const pass = form.password.value;
    // console.log({ email, pass, name, photo });

    setRegisterError("");

    if (pass.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(pass)) {
      setRegisterError(
        "Your password should have at least one uppercase character."
      );
      return;
    } else if (!/[!@#$%^&*]/.test(pass)) {
      setRegisterError(
        "Your password should have at least one special character."
      );
      return;
    } else if (!/\d/.test(pass)) {
      setRegisterError(
        "Your password should have at least one numeric character."
      );
      return;
    }

    try {
      const result = await createUser(email, pass);

      await updateUserProfile(name, photo);
      setUser({ ...result?.user, photoURL: photo, displayName: name });
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      // console.log(data);

      navigate(from, { replace: true });
      toast.success("Sign-up Successful");
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleLogin();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      // console.log(data);
      toast.success("Sign-in Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-10">
  <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-gradient-to-b from-[rgba(1,3,19,0.41)] to-[#0204155b] rounded-lg shadow-lg lg:max-w-4xl">
    <div className="w-full mx-auto px-6 py-8 md:px-8 lg:w-1/2">
      <div
        onClick={handleGoogleSignIn}
        className="flex cursor-pointer items-center justify-center mt-4 text-gray-200 transition-colors duration-300 transform border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
      >
        <div className="px-4 py-2">
          <svg className="w-6 h-6" viewBox="0 0 40 40">
            {/* SVG paths unchanged */}
          </svg>
        </div>

        <span className="w-5/6 px-4 py-3 font-bold text-center">
          Continue with Google
        </span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
        <div className="text-center text-gray-200">or Register with Email</div>
        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
      </div>

      <form onSubmit={handleSignUp}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="name"
              >
                UserName
              </label>
              <input
                id="name"
                autoComplete="name"
                placeholder="UserName"
                name="name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="photo"
              >
                Photo URL
              </label>
              <input
                id="photo"
                autoComplete="photo"
                placeholder="Photo URL"
                name="photo"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                placeholder="Email Address"
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                placeholder="Give a Strong Password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>

      {registerError && (
        <p className="p-4 text-red-400 bg-red-200 rounded-lg">{registerError}</p>
      )}

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b border-gray-300 md:w-1/4"></span>
        <Link
          to="/login"
          className="text-xs text-gray-300 hover:text-white uppercase"
        >
          or sign in
        </Link>
        <span className="w-1/5 border-b border-gray-300 md:w-1/4"></span>
      </div>
    </div>
  </div>
</div>

  );
};

export default Register;
