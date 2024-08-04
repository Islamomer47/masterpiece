import React, { useState } from "react";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-red-500 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [review, setReview] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  const categories = ["Restaurant", "Hotel", "Attraction", "Shop", "Service"];
  const subcategories = {
    Restaurant: ["Fine Dining", "Casual Dining", "Fast Food", "Cafe"],
    Hotel: ["Luxury", "Mid-range", "Budget", "Resort"],
    Attraction: ["Historical Site", "Museum", "Park", "Entertainment"],
    Shop: ["Clothing", "Electronics", "Grocery", "Souvenir"],
    Service: ["Beauty", "Health", "Education", "Transportation"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      rating,
      title,
      category,
      subcategory,
      placeName,
      review,
      photos,
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemovePhoto = (index) => {
    setPhotoPreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-2xl font-bold text-[#060640] mb-4">
        Write Your Review
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a brief title for your review"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#060640]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("");
          }}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#060640]"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {category && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory
          </label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#060640]"
          >
            <option value="">Select a subcategory</option>
            {subcategories[category].map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Place or Product Name
        </label>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Enter the name of the place or product"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#060640]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review Content
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience in detail..."
          className="w-full p-3 border border-gray-300 rounded-md mb-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#060640]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Photos
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#060640] file:text-white
            hover:file:bg-opacity-80
          "
        />
        {photoPreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {photoPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-auto object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-200"
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-[#060640] text-white py-3 rounded-md font-bold hover:opacity-90"
      >
        Submit Review
      </motion.button>
    </form>
  );
};

export default ReviewForm;
