import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // If allowedRoles is set, check role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      navigate("/"); // or navigate("/unauthorized")
    }
  }, [user, allowedRoles, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
