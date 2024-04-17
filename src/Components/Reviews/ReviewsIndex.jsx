import { useEffect } from "react";
import { Link } from "react-router-dom";
import Review from "./Review";

const URL = import.meta.env.VITE_BASE_URL;

const ReviewsIndex = ({ platform_id, reviews, setReviews }) => {
  const formatDate = (review) => {
    let date = review.updated_at ? review.updated_at : review.created_at;
    return date.split(`-`).map((elem) => +elem);
  };

  const sortByDate = (reviews) => {
    return reviews.sort((reviewA, reviewB) => {
      const dateA = formatDate(reviewA);
      const dateB = formatDate(reviewB);

      if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0];
      if (dateA[1] !== dateB[1]) return dateB[1] - dateA[1];
      if (dateA[2] !== dateB[2]) return dateB[2] - dateA[2];
      return +reviewB.id - +reviewA.id;
    });
  };

  useEffect(() => {
    fetch(`${URL}/api/platforms/${platform_id}/reviews`, {
      credentials: "include", // Important: Include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => setReviews(data.allReviews));
  }, [platform_id]);

  return (
    <section className="reviews-container">
      <h2>Reviews?</h2>
      {reviews.length === 0 ? (
        <Link to={`/platforms/${platform_id}/new`} style={{ margin: "20px" }}>
          Be my guest, add a review!
        </Link>
      ) : (
        sortByDate(reviews).map((review) => (
          <Review
            key={review.id}
            review={review}
            reviews={reviews}
            setReviews={setReviews}
          />
        ))
      )}
    </section>
  );
};

export default ReviewsIndex;
