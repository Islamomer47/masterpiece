import React from "react";
import { useParams } from "react-router-dom";
import Filter from "../components/CategoryDetail/Filter";
import CategoryCard from "../components/CategoryDetail/CategoryCard";

const images = {
  Restaurants:
    "https://img.freepik.com/premium-photo/plate-food-with-plant-it_337384-107361.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
  HomeServices: "path/to/home-services-image.jpg",
  AutoServices: "path/to/auto-services-image.jpg",
  More: "path/to/more-image.jpg",
};

const CategoryDetail = () => {
  const { categoryName, subCategoryName } = useParams();
  const category = categoryName.replace(/-/g, " ");
  const subCategory = subCategoryName
    ? subCategoryName.replace(/-/g, " ")
    : null;

  const heroImage = images[category] || images["More"]; // Default to 'More' if category not found

  return (
    <div className="max-w-[1640px] m-auto px-4 pt-20">
      {/* Hero Image with centered heading */}
      <div className="relative px-32">
        <div
          className="w-full h-[300px] bg-cover bg-center "
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Overlay container for centered heading */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[#060640] font-bold text-4xl text-center bg-opacity-60 bg-white p-4 rounded">
              {category.toUpperCase()}
              {subCategory && ` - ${subCategory.toUpperCase()}`}
            </h1>
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <Filter />

      {/* Cards for Each Listing */}
      <CategoryCard />
    </div>
  );
};

export default CategoryDetail;
