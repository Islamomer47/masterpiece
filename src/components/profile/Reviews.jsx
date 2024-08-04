import React from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reviews</h2>
        <Link
          to="/userReview"
          className="text-[#FADED9] text-sm hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="border-t pt-4">
        <h3 className="font-bold text-lg mb-1">Hashem Restaurant</h3>
        <p className="text-sm text-gray-600 mb-2">
          Middle Eastern, Jordanian, Vegetarian Friendly
        </p>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-xl">
              ★
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-600">7/15/2023</span>
        </div>
        <p className="text-sm text-gray-800">
          Authentic Jordanian cuisine in the heart of downtown Amman. Their
          falafel and hummus are simply unbeatable...
        </p>
      </div>
    </div>
  );
};

export default Reviews;
