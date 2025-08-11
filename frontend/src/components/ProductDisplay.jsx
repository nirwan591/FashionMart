import React, { useContext } from "react";
import Item from "./Item";
import { ShopContext } from "../context/ShopContext";

const ProductDisplay = ({category}) => {
  const { all_products } = useContext(ShopContext);


  if (!all_products) {
    return <p className="text-center text-xl">Loading products...</p>;
  }

  return (
    <section id="shop" className="max-padd-container py-16">
      {/* Title */}
      <div className="flexBetween pd-20">
        <h4 className="text-4xl font-extrabold leading-none font-ace flex flex-col">
          Products
        </h4>
      </div>
      {/* Container */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-s gap-x-8 pt-16">
        {all_products.map((product) => {
          if (category === "All" || category === product.category){
            return (
          <div key={product._id}>
            <Item product={product} />
          </div>
            );
          }
})}
      </div>
    </section>
  );
};

export default ProductDisplay;

