import { useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [streamer, setStreamer] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setStreamer(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/streamer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setStreamer(data.streamer);
          })
          .catch((error) => console.error("Error fetching streamer:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className="navbar-container">
    <Link to={"/platforms"}>
      <h1>Streamism</h1>
    </Link>
    <article>
      <Link to={"/about"}>
        <p className="p1">About</p>
      </Link>
      {!toggleLogin ? (
        <Link to={"/login"} style={{ textDecoration: "none", color: "black" }}>
          <p className="p2">Login</p>
        </Link>
      ) : (
        <div>
          {streamer && (
            <p className="p2">{`Hello, ${streamer.username.toUpperCase()}`}</p>
          )}
          <Link onClick={handleLogout} style={{ textDecoration: "none", color: "black" }}>
            <p className="p2">Logout</p>
          </Link>
        </div>
      )}
    </article>
  </div>
);
};
      
  

export default NavBar;
