import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    toast.error("Please login first ⚠️");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;