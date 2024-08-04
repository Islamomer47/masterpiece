import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategoryCard = () => {
  const listings = [
    {
      id: 1,
      name: "Bella Italia",
      image:
        "https://img.freepik.com/premium-photo/plate-risotto-italy-nature-background-professional-advertising-food-photo-ai-generated_755721-55473.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      description:
        "A cozy Italian restaurant offering authentic pizza, pasta, and a warm atmosphere.",
      rating: 4.7,
      category: "Restaurants",
      subCategory: "Italian",
    },
    {
      id: 2,
      name: "Gourmet Burger Bar",
      image:
        "https://img.freepik.com/free-photo/meat-burger-tomato-cucumber-egg-coleslaw-lettuce-cheese-olives-side-view_141793-1801.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      description:
        "A trendy spot for gourmet burgers with unique toppings and sides.",
      rating: 4.3,
      category: "Restaurants",
      subCategory: "Burgers",
    },
    {
      id: 3,
      name: "The Sushi Corner",
      image:
        "https://images.unsplash.com/photo-1506748686214e9df14f4d0d2b4b2b95eab14d3031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "Fresh and delicious sushi with a variety of rolls and sashimi.",
      rating: 4.6,
      category: "Restaurants",
      subCategory: "Reservations",
    },
    {
      id: 4,
      name: "Cafe Delights",
      image:
        "https://img.freepik.com/premium-photo/delicious-cake-with-cream-chocolate-coffee-cozy-setting_1025753-120363.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      description:
        "A charming cafe known for its pastries, coffee, and relaxed ambiance.",
      rating: 4.2,
      category: "Restaurants",
      subCategory: "TakeOut",
    },
    {
      id: 5,
      name: "The Bistro",
      image:
        "https://img.freepik.com/free-photo/close-up-woman-eating-iskender-kebab-copper-platter-with-pickles-yogurt-ayran_141793-2082.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      description:
        "A bistro offering a diverse menu with both local and international dishes.",
      rating: 4.5,
      category: "Restaurants",
      subCategory: "Delivery",
    },
    {
      id: 6,
      name: "The Bistro",
      image:
        "https://img.freepik.com/free-photo/close-up-woman-eating-iskender-kebab-copper-platter-with-pickles-yogurt-ayran_141793-2082.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      description:
        "A bistro offering a diverse menu with both local and international dishes.",
      rating: 4.5,
      category: "Pizza",
      subCategory: "Cheese",
    },
    {
      id: 7,
      name: "The Bistro",
      image:
        "https://img.freepik.com/free-photo/close-up-woman-eating-iskender-kebab-copper-platter-with-pickles-yogurt-ayran_141793-2082.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
      description:
        "A bistro offering a diverse menu with both local and international dishes.",
      rating: 4.5,
      category: "FastFood",
      subCategory: "Burgers",
    },
  ];

  const { categoryName, subCategoryName } = useParams();
  const category = categoryName.replace(/-/g, " ");
  const subCategory = subCategoryName
    ? subCategoryName.replace(/-/g, " ")
    : null;

  const [sort, setSort] = useState("most-recent");

  // Filtering and sorting logic
  const filteredAndSortedListings = listings
    .filter((listing) => listing.category === category)
    .filter((listing) => !subCategory || listing.subCategory === subCategory)
    .sort((a, b) =>
      sort === "most-recent" ? b.id - a.id : b.rating - a.rating
    );

  return (
    <div className="container mx-auto py-6 px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
          >
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-48 object-cover rounded-t-md mb-4"
            />
            <div className="flex flex-col items-start w-full">
              <h2 className="font-bold text-xl text-[#060640] mb-2">
                {listing.name}
              </h2>
              <p className="text-gray-700 mb-4">{listing.description}</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-yellow-500 font-bold">{listing.rating} ★</p>
                <Link
                  to={`/category/${categoryName.replace(/ /g, "-")}/${
                    subCategoryName
                      ? subCategoryName.replace(/ /g, "-") + "/"
                      : ""
                  }${listing.id}`}
                  className="text-[#060640] hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
