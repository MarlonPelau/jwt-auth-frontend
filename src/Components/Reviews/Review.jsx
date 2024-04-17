import {
    Link,
    useParams,
    // useOutletContext,
    useNavigate,
  } from "react-router-dom";
  import { useAuth } from "../Authorization/ProtectedRoute";
  import { useState, useEffect } from "react";
  
  const URL = import.meta.env.VITE_BASE_URL;
  
  const Review = ({ review, reviews, setReviews, loggedStreamer, setTrigger, trigger }) => {
    const streamer = useAuth();
    
  
    // const [username, setUserName] = useState("");
    // const [loading, setLoading] = useState(true);
    const { platform_id } = useParams();
    const navigate = useNavigate();
  
    const formattedDate = (reviewDate) => {
      const parts = reviewDate.split("-");
      const newReviewDate = new Date(parts[0], parts[1] - 1, parts[2]);
      return newReviewDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
  
    const handleDelete = (id) => {
      // Assuming you have a different token available in your application
      const token = localStorage.getItem("token");

  if (confirm(`Are you sure you want to delete your review?`)) {
    fetch(`${URL}/api/platforms/${platform_id}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        // Replace "Authorization" with the header name for your token
        Authorization: `Bearer ${token}`,
        // Add other headers if necessary
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    // Handle the response and any errors if needed
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        setTrigger(!trigger)
      }
      // Handle successful deletion or any other action
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    })
          .then((response) => response.json())
          .then((responseJSON) => {
            const copyReviewArray = [...reviews];
            const indexDeletedReview = copyReviewArray.findIndex((review) => {
              return review.id === id;
            });
            copyReviewArray.splice(indexDeletedReview, 1);
            setReviews(copyReviewArray);
          })
          .catch((error) => console.error(error));
      }
    };
    // console.log("loggedStreamer", loggedStreamer)
    // console.log("review.username", review.username)
    return (
      <div className="review-card">
        <h3>Username: {review.username}</h3>
        <p className="center-grid">Rating: {"🎧".repeat(review.rating)}</p>
        {review.updated_at ? (
          <p className="center-grid">
            {formattedDate(review.updated_at)} (Edited)
          </p>
        ) : (
          <p className="center-grid">{formattedDate(review.created_at)}</p>
        )}
  
        <p>{review.content}</p>
  
        {loggedStreamer === review.username && (
          <div className="center-grid">
            <Link to={`/platforms/${platform_id}/edit/${review.id}`}>
              <button
                className="center-grid"
                style={{ textDecoration: "none", color: "black" }}
              >
                Edit
              </button>
            </Link>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Review;
  