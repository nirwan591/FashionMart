import React, { useState } from "react";
import Hero from "../components/Hero"; 
import Features from "../components/Features";
import Categories from "../components/Categories";
import ProductDisplay from "../components/ProductDisplay";
import OfferBanner from "../components/OfferBanner";
import MapSection from "../components/MapSection";

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <>
     
      <Hero />
      <Features />
      <Categories category={category} setCategory={setCategory} />
      <ProductDisplay category={category} />
       <OfferBanner />
      <MapSection />
    </>
  );
};

export default Home;
