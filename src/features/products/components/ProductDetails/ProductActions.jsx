import React from 'react';
import { Stack, Button, alpha } from '@mui/material';
import { ShoppingCart, ShoppingBag } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';



const ProductActions = ({
  product,
  onAddToCart,
  onBuyNow,
  isInCart
}) => {

  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCartIcon />}
        fullWidth
        disabled={!product.inStock}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onAddToCart}
        sx={{
          borderRadius: 3,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...(product.inStock
            ? isInCart
              ? hovered
                ? {
                  background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                  color: 'white'
                }
                : {
                  background: 'linear-gradient(135deg, #66bb6a 0%, #81c784 100%)',
                  color: 'white'
                }
              : {
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
              }
            : {
              bgcolor: 'grey.300',
              color: 'grey.600'
            })
        }}
      >
        {!product.inStock
          ? t("products.productCard.outOfStock")
          : isInCart
            ? hovered
              ? t("products.productCard.remove")
              : t("products.productCard.added")
            : t("products.productCard.addToCart")}
      </Button>

      <Button
        variant="outlined"
        size="large"
        startIcon={<ShoppingBag />}
        onClick={onBuyNow}
        disabled={!product.inStock}
        sx={{
          py: 2,
          borderRadius: 3,
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 600,
          borderWidth: 2,
          '&:hover': { borderWidth: 2 }
        }}
      >
        {t("products.buyNow")}
      </Button>
    </Stack>
  );
};

export default ProductActions;
