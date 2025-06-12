import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowed }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" />;
  if (allowed === "admin" && !user.isAdmin) return <Navigate to="/dashboard" />;
  if (allowed === "user" && user.isAdmin) return <Navigate to="/admin" />;

  return children;
};

export default ProtectedRoute;
