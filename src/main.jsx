import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./components/route/Route.jsx";
import { RouterProvider } from "react-router-dom";
// import FirebaseProvider from "./pages/firebase-provider/FirebaseProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <FirebaseProvider> */}
      <RouterProvider router={router} />
    {/* </FirebaseProvider> */}
  </React.StrictMode>
);
