import React from "react"
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, favorites, onAddToCart, onRemoveFromCart,
                       onToggleFavorite, productsRef, isInCart, handlePreview }) => (
    <Grid container spacing={3} ref={productsRef}>
        {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    product={product}
                    isFavorite={favorites?.items?.some(fav => fav.id === product.id) || false}
                    onToggleFavorite={onToggleFavorite}
                    isInCart={isInCart(product)}
                    onPreview={handlePreview}
                />
            </Grid>
        ))}
    </Grid>
);

// ✅ إضافة React.memo لتقليل إعادة التصيير
export default React.memo(ProductList);
