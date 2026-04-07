import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: any) => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;