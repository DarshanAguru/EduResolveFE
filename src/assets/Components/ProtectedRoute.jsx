// src/assets/Components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user")); // change "user" key to your actual key

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
ProtectedRoute.propTypes = {
  allowedRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;

