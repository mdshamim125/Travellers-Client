import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/Hooks";
import { BeatLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p><BeatLoader color="green" className="text-center mt-4"></BeatLoader></p>;
  if (user) return children;

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default PrivateRoute;
