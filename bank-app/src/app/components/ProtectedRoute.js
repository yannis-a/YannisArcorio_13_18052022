import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hook";
import { selectToken } from "../../features/user/tokenSlice";

export function ProtectedRoute({ children }) {
  const token = useAppSelector(selectToken);

  if (!token || !token.length) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
