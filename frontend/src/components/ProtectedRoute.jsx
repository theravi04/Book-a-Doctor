import { Navigate } from "react-router-dom";
import { getAuth } from "../auth";

export default function ProtectedRoute({ children, role }) {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" />;
  if (role && auth.user.role !== role) return <Navigate to="/" />;
  return children;
}
