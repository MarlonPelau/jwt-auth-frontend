import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReviewsIndex from "../Reviews/ReviewsIndex";
import "./Platforms.css";

const URL = import.meta.env.VITE_BASE_URL;

const PlatformDetails = ({ reviews, setReviews }) => {
  const [platform, setPlatform] = useState();

  const { platform_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL}/api/platforms/${platform_id}`)
      .then((res) => res.json())
      .then((data) => setPlatform(data));
  }, [platform_id]);

  return (
    <div>
      {platform && (
        <div className="show-container">
          <section className="image-section">
            <img src={platform.image} alt={platform.name} />
          </section>
          <section className="info-section">
            <h3>{platform.name}</h3>
            <p>
              <span>Rated:</span> {platform.rated}
            </p>
            <p>
              <span>Description:</span> {platform.description}
            </p>
            {platform.mo && (
              <p>
                <span>MO:</span> {platform.mo}
              </p>
            )}
            {platform.link && (
              <p>
                <span>Link:</span> <a href={platform.link} target="_blank" rel="noopener noreferrer">{platform.link}</a>
              </p>
            )}
            <article className="btns">
              <button onClick={() => navigate(`/platforms/${platform_id}/new`)}>
                Add Review
              </button>
              <button onClick={() => navigate(`/platforms`)}>Back</button>
            </article>
          </section>
        </div>
      )}

      <ReviewsIndex
        platform_id={platform_id}
        reviews={reviews}
        setReviews={setReviews}
      />
    </div>
  );
};

export default PlatformDetails;
