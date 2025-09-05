import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import products from '../../components/data';
import ProductCard from '../ProductCard';
import { useCart } from '../../../../common/hooks/useCart';
import { toggleFavorite } from '../../../favorites/favoritesSlice';

const RelatedProducts = ({ product, maxProducts = 4 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const { handleAddToCart, handleRemoveFromCart, isInCart } = useCart();

  // الحصول على منتجات مشابهة من نفس الفئة الفرعية
  const relatedProducts = React.useMemo(() => {
    return products
      .filter(p => 
        p.id !== product.id && 
        p.mainCategory === product.mainCategory && 
        p.category === product.category
      )
      .slice(0, maxProducts);
  }, [product, maxProducts]);

  if (relatedProducts.length === 0) return null;

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };



  const handlePreview = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Related Products in {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </Typography>
      
      <Grid container spacing={3}>
        {relatedProducts.map((relatedProduct) => (
          <Grid size={{ xs:12, sm:6, md:3 }} key={relatedProduct.id}>
            <ProductCard
              product={relatedProduct}
              isFavorite={favorites.some(fav => fav.id === relatedProduct.id)}
              isInCart={isInCart(relatedProduct)}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onToggleFavorite={handleToggleFavorite}
              onPreview={handlePreview}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RelatedProducts;
