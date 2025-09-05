import React, { use } from "react";
import { Box, Typography, Button, Grid, useTheme, useMediaQuery, } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import { toggleFavorite } from "../../favorites/favoritesSlice";
import { useCart } from "../../../common/hooks/useCart";
import { useTranslation } from "react-i18next";

const ButtonBgColor = '#5a67d8'

const ProductSection = ({ title, products, moreLink, limit = 8 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const favorites = useSelector(state => state.favorites);
  const displayProducts = products.slice(0, limit);
const { handleAddToCart, handleRemoveFromCart, isInCart } = useCart();

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };
  
  
  return (
    <Box sx={{
      px: { xs: 1, sm: 2, md: 4 },
      py: 4,
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* العنوان وزر المزيد */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        px: 1
      }}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          {title}
        </Typography>
        <Button
          component={Link}
          to={moreLink}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            borderWidth: 2,
            '&:hover': { borderWidth: 2 }
          }}
        >
          {t("products.viewAll")}
        </Button>
      </Box>

      {/* شبكة المنتجات */}
      <Grid container spacing={3} >
        {displayProducts.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <ProductCard
              key={product.id}
              product={product}
              isInCart={isInCart(product)}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              isFavorite={favorites.some(fav => fav.id === product.id)}
              onToggleFavorite={handleToggleFavorite}
              onPreview={() => navigate(`/product/${product.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductSection;