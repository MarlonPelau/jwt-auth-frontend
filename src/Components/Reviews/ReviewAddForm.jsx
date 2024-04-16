import { useState } from "react";
import {
  useNavigate,
  Link,
  useParams,
  useOutletContext,
} from "react-router-dom";
import Ratings from "./Ratings";
const ReviewAddForm = ({ reviews, setReviews }) => {
  const { platform_id } = useParams();
  const { streamer } = useOutletContext();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
  const day = currentDate.getDate();

  const [newReview, setNewReview] = useState({
    content: "",
    rating: 0,
    streamer_id: streamer.id,
    created_at: `${year}-${month}-${day}`,
  });

  const handleTextChange = (event) => {
    setNewReview({
      ...newReview,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (newReview.content.length > 0 && newReview.rating > 0) {
      fetch(`${URL}/api/platforms/${platform_id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(newReview),
      })
        .then((res) => res.json())
        .then((data) => {
          setReviews([data, ...reviews]);
        })
        .then(() => navigate(`/platforms/${platform_id}`))
        .catch((error) => console.error("catch", error));
    } else {
      alert(`Invalid Inputs`);
      navigate(`/platforms/${platform_id}`);
    }
  };

  return (
    <div>
      {/* {children} */}
      <form onSubmit={handleSubmit} className="form-container">
        <section>
          <label htmlFor="content">Review:</label>
          <textarea
            style={{
              width: "90%",
              height: "90%",
              marginTop: "20px",
              border: "2px solid black",
              fontSize: "20px",
            }}
            id="content"
            type="text"
            name="content"
            value={newReview.content}
            placeholder="What do you think..."
            onChange={handleTextChange}
            required
          />
        </section>
        <section className="rating-input">
          <label htmlFor="rating">Rating:</label>
          <Ratings
            review={newReview}
            setReview={setNewReview}
            rating={newReview.rating}
          />
        </section>
        <section className="form-button-section">
          <input className="submit-button" type="submit" />
          <Link to={`/platforms/${platform_id}`}>Cancel</Link>
        </section>
      </form>
    </div>
  );
};

export default ReviewAddForm;
