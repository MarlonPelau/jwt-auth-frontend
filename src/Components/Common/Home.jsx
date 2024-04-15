import { Link } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";

const URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  useEffect(() => {
    // Fetch call to the root route of your backend to get the token - new notes
    fetch(`${URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log("Token should now be set.");
        }
      })
      .catch((error) => console.error("Error fetching token:", error));
  }, []);
  

  return (
    <div className="home-div">
      <section className="stream-wrap">
        <article id="stream" className="stream-1"></article>
        <article id="stream" className="stream-2"></article>
        <article id="stream" className="stream-3"></article>
        <article id="stream" className="stream-4"></article>
      </section>
      <section className="logo">
        <Link to={"/platforms"}>
          <img
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1712885004/Screenshot_2024-04-11_at_9.22.31_PM_r13jiu.png"
            alt="Streamism Logo"
          />
        </Link>
      </section>
    </div>
  );
};

export default Home;
