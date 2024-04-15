// src/components/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [streamer, setStreamer] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${URL}/api/auth/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const { isAuthenticated, streamer } = await response.json();

          setIsAuthenticated(isAuthenticated);
          setStreamer(streamer);
          setIsLoading(false);
        } else {
          setIsAuthenticated(isAuthenticated);
          setIsLoading(false);
          setStreamer(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading, streamer };
};

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, streamer } = useAuth();
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={streamer} />; // If authenticated, continue rendering the component the route is pointing to
};

export default ProtectedRoute;
