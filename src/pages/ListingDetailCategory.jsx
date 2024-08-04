import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewForm from "../components/SearchAndReview/ReviewForm";

const listings = [
  {
    id: 1,
    name: "Bella Italia",
    image:
      "https://img.freepik.com/premium-photo/plate-risotto-italy-nature-background-professional-advertising-food-photo-ai-generated_755721-55473.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    images: [
      "https://images.unsplash.com/photo-1604566577876-79a39d5bbf87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1594938613828-40c6e96c4936?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1605751601863-9205e69f07b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
    description:
      "A cozy Italian restaurant offering authentic pizza, pasta, and a warm atmosphere. Perfect for a romantic dinner or a family gathering.",
    rating: 4.7,
    reviews: 28,
    address: "456 Elm St, Rome, Italy",
    contact: "+39 06 1234 5678",
    website: "https://bellaitalia.com",
    location: { lat: 41.902782, lng: 12.496366 },
    category: "Restaurants",
    subCategory: "TakeOut",
    reviewsList: [
      {
        id: 1,
        rating: 5,
        text: "Amazing food and great service. Highly recommend the Margherita pizza!",
        user: {
          name: "Alice Smith",
          profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        date: "2024-07-01",
        likes: 12,
        dislikes: 0,
      },
      // Add more reviews as needed
    ],
  },
  {
    id: 2,
    name: "Gourmet Burger Bar",
    image:
      "https://images.unsplash.com/photo-1533086005087-9d98f3b30d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1512052911871-263d62a06c47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581373937688-e8b5c843b084?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1580660677321-002089bf5cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
    description:
      "A trendy spot for gourmet burgers with unique toppings and sides.",
    rating: 4.3,
    reviews: 15,
    address: "789 Oak St, New York, NY, USA",
    contact: "+1 212-555-1234",
    website: "https://gourmetburgerbar.com",
    location: { lat: 40.712776, lng: -74.005974 },
    category: "Restaurants",
    subCategory: "Delivery",
    reviewsList: [
      {
        id: 1,
        rating: 4,
        text: "Great burgers but delivery took longer than expected.",
        user: {
          name: "Bob Johnson",
          profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        date: "2024-07-10",
        likes: 8,
        dislikes: 2,
      },
      // Add more reviews as needed
    ],
  },
  {
    id: 3,
    name: "Sushi Corner",
    image:
      "https://images.unsplash.com/photo-1531272641736-22e9e6e5b95e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1506753002872-5f0a1f6c7f11?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1588899654186-f927f2d0cb1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1598272532156-8339d45737c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
    description:
      "Fresh and delicious sushi with a variety of rolls and sashimi.",
    rating: 4.6,
    reviews: 22,
    address: "321 Pine St, Los Angeles, CA, USA",
    contact: "+1 323-555-5678",
    website: "https://sushicorner.com",
    location: { lat: 34.052235, lng: -118.243683 },
    category: "Restaurants",
    subCategory: "Reservations",
    reviewsList: [
      {
        id: 1,
        rating: 5,
        text: "The best sushi in town! The rolls were incredibly fresh.",
        user: {
          name: "Carla Martinez",
          profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        date: "2024-07-12",
        likes: 10,
        dislikes: 1,
      },
      // Add more reviews as needed
    ],
  },
  {
    id: 4,
    name: "Cafe Delights",
    image:
      "https://img.freepik.com/premium-photo/delicious-cake-with-cream-chocolate-coffee-cozy-setting_1025753-120363.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    images: [
      "https://img.freepik.com/premium-photo/ode-irresistible-charm-chocolate-desserts-timeless-appeal-cafa-brews_1003076-2105.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      "https://img.freepik.com/premium-photo/cozy-cafe-ambiance-with-delicious-pastries-wooden-board_1252915-5431.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      "https://img.freepik.com/premium-photo/cozy-cafe-tantalizing-desserts-captured_961875-271071.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      "https://img.freepik.com/premium-photo/cup-coffee-cup-coffee-table_976492-68772.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    ],
    description:
      "A charming cafe known for its pastries, coffee, and relaxed ambiance.",
    rating: 4.2,
    reviews: 18,
    address: "654 Maple Ave, San Francisco, CA, USA",
    contact: "+1 415-555-9876",
    website: "https://cafedelights.com",
    location: { lat: 37.774929, lng: -122.419418 },
    category: "Restaurants",
    subCategory: "TakeOut",
    reviewsList: [
      {
        id: 1,
        rating: 4,
        text: "Great coffee and pastries, but the service could be faster.",
        user: {
          name: "Diana Brooks",
          profilePicture:
            "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg",
        },
        date: "2024-07-22",
        likes: 7,
        dislikes: 2,
      },
      // Add more reviews as needed
    ],
  },
  {
    id: 5,
    name: "The Bistro",
    image:
      "https://images.unsplash.com/photo-1526620423080-e5a7e20c244b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1533786778477-e01b2ff1cfed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1555685818-071afc41a761?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1517367828676-61da5b124d52?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
    description:
      "A bistro offering a diverse menu with both local and international dishes.",
    rating: 4.5,
    reviews: 30,
    address: "123 River Rd, Chicago, IL, USA",
    contact: "+1 312-555-3456",
    website: "https://thebistro.com",
    location: { lat: 41.878113, lng: -87.629799 },
    category: "Restaurants",
    subCategory: "Reservations",
    reviewsList: [
      {
        id: 1,
        rating: 5,
        text: "Fantastic food and service. The steak was cooked to perfection.",
        user: {
          name: "Emily White",
          profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        date: "2024-07-30",
        likes: 15,
        dislikes: 3,
      },
      // Add more reviews as needed
    ],
  },
  {
    id: 6,
    name: "Urban Eatery",
    image:
      "https://images.unsplash.com/photo-1586281366080-c87a7c885d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1506748686214e9df14f4d0d2b4b2b95eab14d3031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1593692254811-8d2fcdb20d37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1575935914466-92409a66597f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
    description:
      "A modern eatery with a focus on healthy, farm-to-table meals.",
    rating: 4.4,
    reviews: 12,
    address: "987 Birch St, Seattle, WA, USA",
    contact: "+1 206-555-6789",
    website: "https://urbaneatery.com",
    location: { lat: 47.606209, lng: -122.332069 },
    category: "Restaurants",
    subCategory: "TakeOut",
    reviewsList: [
      {
        id: 1,
        rating: 4,
        text: "Healthy and tasty options. The quinoa salad was excellent.",
        user: {
          name: "Frank Miller",
          profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        date: "2024-07-25",
        likes: 6,
        dislikes: 1,
      },
      // Add more reviews as needed
    ],
  },
  {
    id: 7,
    name: "Vegan Haven",
    image:
      "https://images.unsplash.com/photo-1601414820546-65732c4d82b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1587195104321-2e7c0638e440?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1580293192683-9b8ecb2f6815?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1591033930905-5a9824fd7d2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
    description:
      "A plant-based restaurant offering a diverse menu of vegan dishes.",
    rating: 4.8,
    reviews: 25,
    address: "654 Willow St, Austin, TX, USA",
    contact: "+1 512-555-7890",
    website: "https://veganhaven.com",
    location: { lat: 30.267153, lng: -97.743057 },
    category: "Restaurants",
    subCategory: "Delivery",
    reviewsList: [
      {
        id: 1,
        rating: 5,
        text: "The vegan burger was amazing! Will definitely be ordering again.",
        user: {
          name: "Grace Lee",
          profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        date: "2024-07-18",
        likes: 11,
        dislikes: 0,
      },
      // Add more reviews as needed
    ],
  },
];

const ListingDetail = () => {
  const { listingId } = useParams();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const listing = listings.find(
    (listing) => listing.id === parseInt(listingId)
  );

  const handleMapOpen = () => {
    setIsMapOpen(true);
  };

  const handleMapClose = () => {
    setIsMapOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "map-modal") {
      handleMapClose();
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
  };

  useEffect(() => {
    if (isMapOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMapOpen]);

  if (!listing) {
    return <p className="text-center text-red-500">Listing not found</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      {/* Hero Section with Image  */}
      <div className="flex flex-col lg:flex-row lg:space-x-6 mb-8">
        {/* Large Image at the Top */}
        <div className="relative lg:w-1/2 mb-4 lg:mb-0">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-transform transform hover:scale-110"
            onClick={() => handleImageClick(listing.image)}
          />
          {/* Optional Overlay */}
        </div>

        {/* Smaller Images Grid Below */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {listing.images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={image}
                alt={`${listing.name} ${index + 1}`}
                className="w-full h-[200px] object-cover transition-transform transform group-hover:scale-110"
                onClick={() => handleImageClick(image)}
              />
              {/* Optional Hover Effect */}
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          id="image-modal"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-1 right-1 text-gray-600"
              onClick={handleImageModalClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-100 to-white p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {listing.name}
        </h1>
        <div className="flex flex-col sm:flex-row sm:space-x-6 mb-4">
          <p className="text-gray-700 text-lg">
            <strong className="text-gray-900">Category:</strong>{" "}
            {listing.category}
          </p>
          <p className="text-gray-700 text-lg">
            <strong className="text-gray-900">Subcategory:</strong>{" "}
            {listing.subCategory}
          </p>
        </div>
        <p className="text-gray-700 text-lg">
          <strong className="text-gray-900">Address:</strong>
          <button
            className="text-blue-500 hover:text-blue-700 font-medium underline"
            onClick={handleMapOpen}
          >
            {listing.address}
          </button>
        </p>
      </div>

      {/* Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col space-y-6">
          {/* Description */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-semibold text-gray-900">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed mt-2">
              {listing.description}
            </p>
          </div>

          {/* Contact and Rating */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-2xl font-semibold text-gray-900">Contact</h3>
              <p className="text-gray-700 mt-2">{listing.contact}</p>
            </div>

            <div className="flex-1 bg-gradient-to-r from-yellow-100 to-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-yellow-500 text-4xl mr-3">
                  {listing.rating} ★
                </span>
                <p className="text-gray-700 text-lg font-semibold">
                  ({listing.reviews} reviews)
                </p>
              </div>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews and Review Form Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Review Form */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <ReviewForm />
        </div>

        {/* Reviews */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reviews</h2>
          <div className="space-y-4">
            {listing.reviewsList.map((review) => (
              <div
                key={review.id}
                className="p-6 border rounded-lg shadow-md bg-white"
              >
                <div className="flex items-start mb-4">
                  <img
                    src={review.user.profilePicture}
                    alt={review.user.name}
                    className="w-14 h-14 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {review.user.name}
                    </p>
                    <p className="text-yellow-500 text-lg">{review.rating} ★</p>
                    <p className="text-gray-600 text-sm">{review.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="text-blue-500 text-sm">
                      Like ({review.likes})
                    </button>
                    <button className="text-red-500 text-sm">
                      Dislike ({review.dislikes})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div
          id="map-modal"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-1 right-1 text-gray-600"
              onClick={handleMapClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <LoadScript googleMapsApiKey="AIzaSyBQXGWGdJBbKQkwymEp2gESxr__JJKXq7U">
              <GoogleMap
                mapContainerStyle={{ height: "400px", width: "100%" }}
                center={listing.location}
                zoom={14}
              >
                <Marker position={listing.location} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
