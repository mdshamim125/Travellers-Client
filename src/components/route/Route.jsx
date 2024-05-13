import { createBrowserRouter } from "react-router-dom";
import Root from "../../layout/Root";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import ErrorPage from "../../pages/error-page/ErrorPage";
import AllBlogs from "./../../pages/all-blogs/AllBlogs";
import AddBlog from "./../../pages/add-blog/AddBlog";
import FeaturedBlogs from "./../../pages/featured-blogs/FeaturedBlogs";
import WishList from "./../../pages/wishlist/WishList";
import MyBlogs from "../../pages/my-blog/MyBlogs";
import UpdateBlog from "../../pages/my-blog/UpdateBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-blogs",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "/add-blog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: "/wish-list",
        element: <WishList></WishList>,
      },
      {
        path: "/my-blogs",
        element: <MyBlogs></MyBlogs>,
      },
      {
        path: "/update/:id",
        element: <UpdateBlog />,
      },
    ],
  },
]);
