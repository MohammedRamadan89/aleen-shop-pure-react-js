// src/pages/HomePage.jsx
import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import HomeSlider from "../components/HomeSlider";
import ProductSection from "../features/products/components/ProductSection";
import products from "../features/products/components/data";

const electronics = products.filter((product)=> product.mainCategory==='electronics')
const clothing = products.filter((product)=> product.mainCategory==='clothing')
const food = products.filter((product)=> product.mainCategory==='food')

const HomePage = () => {
  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <HomeSlider />
      <ProductSection title="Electronics" products={electronics} moreLink="/products/electronics" />
      <ProductSection title="Clothing" products={clothing} moreLink="/products/clothing" />
      <ProductSection title="Food" products={food} moreLink="/products/food" />
    </Container>
  );
};

export default HomePage;
