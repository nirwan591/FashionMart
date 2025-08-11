import React from "react";
import { categories } from "../assets/data";

const Categories = ({ category, setCategory }) => {
  return (
    <section id="categories" className="max-padd-container pt-16">
      {/* Title */}
      <div className="flex justify-between items-center px-4 md:px-0">
        <h4 className="text-3xl md:text-4xl font-extrabold leading-none font-ace">
          Categories
        </h4>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-12">
        {categories.map((item) => (
          <div
            key={item.name}
            onClick={() => setCategory((prev) => (prev === item.name ? "All" : item.name))}
            className="flex flex-col items-center justify-center cursor-pointer text-center"
          >
            <div className="p-6 rounded-2xl bg-primary w-full max-w-[140px] h-[140px] flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-24 h-24"
              />
            </div>
            <h4
              className={`mt-4 text-base sm:text-lg font-medium ${
                category === item.name ? "border-b-4 border-secondary" : "border-b-4 border-transparent"
              }`}
            >
              {item.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
