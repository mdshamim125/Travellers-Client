import { useContext } from "react";
import { AuthContext } from "../pages/firebase-provider/FirebaseProvider";

const useAuth = () => {
  const all = useContext(AuthContext);
  return all;
};

export default useAuth;
