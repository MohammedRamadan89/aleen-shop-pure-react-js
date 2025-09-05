import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  alpha,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import products from '../components/data';
import ProductActions from '../components/ProductDetails/ProductActions';
import ProductAdditionalInfo from '../components/ProductDetails/ProductAdditionalInfo';
import ProductHeader from '../components/ProductDetails/ProductHeader';
import ProductImage from '../components/ProductDetails/ProductImage';
import ProductInfo from '../components/ProductDetails/ProductInfo';
import ProductOptions from '../components/ProductDetails/ProductOptions';
import ProductPrice from '../components/ProductDetails/ProductPrice';
import RelatedProducts from '../components/ProductDetails/RelatedProducts';
import { useCart } from '../../../common/hooks/useCart';

const ProductDetails = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const product = products.find((p) => p.id === parseInt(productId));

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Gray', 'Navy'];

  const { handleAddToCart, handleRemoveFromCart, isInCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');

  const handleQuantityChange = (action) => {
    if (action === 'increase') setQuantity((prev) => prev + 1);
    else if (action === 'decrease' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleCartAction = () => {
    const options = { quantity, selectedSize, selectedColor };
    if (isInCart(product, options)) {
      handleRemoveFromCart?.(product, options);
    } else {
      handleAddToCart?.(product, options);
    }
  };

  const handleBuyNow = () => {
    const options = { quantity, selectedSize, selectedColor };
    handleAddToCart(product, options);
    navigate('/checkout');
  };

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
              theme.palette.secondary.main,
              0.1
            )} 100%)`,
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" gutterBottom color="text.secondary">
            🔍 {t('productDetails.notFound')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            {t('productDetails.notFoundDescription')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
            }}
          >
            {t('productDetails.goBack')}
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Navigation */}
      <ProductHeader product={product} />

      <Grid container spacing={6}>
        {/* Product Image */}
        <ProductImage product={product} />

        {/* Product Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4}>
            <ProductInfo product={product} />
            <ProductPrice product={product} />

            <ProductOptions
              product={product}
              sizes={sizes}
              colors={colors}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
            />

            <ProductActions
              product={product}
              quantity={quantity}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleCartAction}
              onBuyNow={handleBuyNow}
              isInCart={isInCart(product, { selectedSize, selectedColor })}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Additional Info */}
      <ProductAdditionalInfo product={product} />

      {/* Related Products */}
      <RelatedProducts product={product} />
    </Container>
  );
};

export default ProductDetails;
