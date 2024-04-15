import { Link } from "react-router-dom";
import "./FourOFourDetails.css";

const FourOFourDetails = () => {
  return (
    <div className="fof-details">
      <h1>Oh No, which Platform?</h1>
      <section className="stream-container">
        <article id="stream" className="stream-1"></article>
        <article id="stream" className="stream-2"></article>
        <article id="stream" className="stream-3"></article>
        <article id="stream" className="stream-4"></article>
      </section>
      <img
        src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1713196706/Streamism-dif_logos_kkuvqc.avif"
        alt="Too Many Platforms"
      />
      <Link to={"/platforms"}>Back to Streamism</Link>
    </div>
  );
};

export default FourOFourDetails;
