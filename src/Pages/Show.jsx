import React from "react";
import PlatformDetails from "../Components/Platforms/PlatformDetails";

const Show = ({ reviews, setReviews }) => {
  return (
    <div>
      <PlatformDetails
        reviews={reviews}
        setReviews={setReviews}
      />
    </div>
  );
};

export default Show;