import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome to Streamism</h1>

      <h3>
        <Link to="/platforms">
          <img
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/t_Gradient%20fade/v1712885004/Screenshot_2024-04-11_at_9.22.31_PM_r13jiu.png"
            alt="Streamism Logo"
            style={{ maxWidth: "100%", height: "auto", cursor: "pointer" }}
          />
        </Link>
      </h3>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default LandingPage;
