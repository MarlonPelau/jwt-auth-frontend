import React from "react";
import PlatformDetails from "../Components/Platforms/PlatformDetails";

const Show = ({ reviews, setReviews, loggedStreamer }) => {
  return (
    <div>
      <PlatformDetails
        reviews={reviews}
        setReviews={setReviews} loggedStreamer={loggedStreamer}
      />
    </div>
  );
};

export default Show;