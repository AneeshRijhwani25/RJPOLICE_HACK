import React, { useState } from "react";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleHover = (hoveredRating) => {
    setRating(hoveredRating);
  };

  const handleLeave = () => {
    // Reset the rating when leaving the container
    setRating(0);
  };

  const handleClick = (selectedRating) => {
    // Save the rating immediately on click
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          } cursor-pointer transition duration-300 ease-in-out hover:text-yellow-500`}
          onMouseEnter={() => handleHover(star)}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
