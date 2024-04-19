import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome to Streamism</h1>

      <h3>
        <Link to="/platforms">
          <img
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1713196706/Streamism-dif_logos_kkuvqc.avif"
            alt="Streamism Logo"
            style={{ cursor: "pointer" }} // Set cursor to pointer to indicate it's clickable
          />
        </Link>
      </h3>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default LandingPage;
