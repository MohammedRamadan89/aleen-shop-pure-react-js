import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../../products/components/ProductCard";

const FavoritesList = ({ products, viewMode, onToggleFavorite }) => {
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid
          size={{xs:12 ,sm: viewMode === "grid" ? 6 : 12 ,md: viewMode === "grid" ? 3 : 12}}
          key={product.id}
        >
          <ProductCard
            product={product}
            viewMode={viewMode}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FavoritesList;
