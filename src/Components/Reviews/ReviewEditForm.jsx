import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useOutletContext,
  Link,
} from "react-router-dom";
import Ratings from "./Ratings";

const ReviewEditForm = ({ setReviews, reviews }) => {
  const { streamer } = useOutletContext();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
  const day = currentDate.getDate();

  const { platform_id, review_id } = useParams();

  const [updatedReview, setUpdatedReview] = useState({
    content: "",
    rating: 0,
    // streamer_id: streamer.id,
    updated_at: "",
  });

  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit(updatedReview);
    navigate(`/platforms/${platform_id}`);
  };

  updatedReview.updated_at = `${year}-${month}-${day}`;

  const handleEdit = (updatedReview) => {
    const token = localStorage.getItem("token");
    fetch(`${URL}/api/platforms/${platform_id}/reviews/${review_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(updatedReview),
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        const copyReviewArray = [...reviews];
        const indexUpdatedReview = copyReviewArray.findIndex((review) => {
          return review.id === review_id;
        });
        copyReviewArray[indexUpdatedReview] = responseJSON;
        setReviews(copyReviewArray);
        setUpdatedReview({
          content: "",
          rating: "",
          updated_at: ``,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleTextChange = (event) => {
    setUpdatedReview({
      ...updatedReview,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${URL}/api/platforms/${platform_id}/reviews/${review_id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdatedReview(data.review);
        setRating(data.review.rating);
      })
      .catch((error) => console.error(error));
  }, []);

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
            value={updatedReview.content}
            placeholder="What do you think..."
            onChange={handleTextChange}
            required
          />
        </section>
        <section className="rating-input">
          <label htmlFor="rating">Rating:</label>
          <Ratings
            review={updatedReview}
            setReview={setUpdatedReview}
            rating={rating}
            setRating={setRating}
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

export default ReviewEditForm;
