// src/pages/HomePage.jsx
import React from "react";
import HomeSlider from "../components/HomeSlider";
import ProductSection from "../features/products/components/ProductSection";
import products from "../features/products/components/data";

const electronics = products.filter((product)=> product.mainCategory==='electronics')
const clothing = products.filter((product)=> product.mainCategory==='clothing')
const food = products.filter((product)=> product.mainCategory==='food')

const HomePage = () => {

  return (
    <>
      <HomeSlider />
      <ProductSection title="Electronics" products={electronics} moreLink="/products/electronics" />
      <ProductSection title="Clothing" products={clothing} moreLink="/products/clothing" />
      <ProductSection title="Food" products={food} moreLink="/products/food" />
    </>
  );
};

export default HomePage;
