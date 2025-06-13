import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type ProtectedRouteType = {
  children: React.ReactNode;
};
function ProtectedRoute({ children }: ProtectedRouteType) {
  const auth = useAuthContext();

  if (!auth) return null; // or a fallback spinner

  const { isLoggedIn, token } = auth;

  // Wait until token is checked (i.e., localStorage loaded)
  if (token === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Checking login...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
