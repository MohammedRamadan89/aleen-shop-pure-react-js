import React from 'react';
import { Box, Typography, Stack, Chip, Rating } from '@mui/material';
import { Category, CheckCircle, Inventory } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCategoryClick = (categoryType, categoryValue) => {
    if (categoryType === 'main') {
      navigate(`/products/${categoryValue}`);
    } else if (categoryType === 'sub') {
      navigate(`/category/${product.mainCategory}/${categoryValue}`);
    }
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
        {product.name}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Rating value={product.rating} precision={0.1} readOnly size="large" />
        <Typography variant="body1" fontWeight={600}>{product.rating}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({product.reviewCount} {t('products.reviews')})
        </Typography>
      </Stack>

      <Typography variant="body1" color="text.secondary" lineHeight={1.8} sx={{ mb: 3 }}>
        {product.description}
      </Typography>

      {/* Categories with Navigation */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        {/* Main Category */}
        <Chip 
          icon={<Category />} 
          label={product.mainCategory} 
          variant="outlined" 
          sx={{ 
            textTransform: 'capitalize',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white'
            }
          }}
          onClick={() => handleCategoryClick('main', product.mainCategory)}
        />

        {/* Sub Category */}
        <Chip 
          icon={<Category />} 
          label={product.category} 
          variant="outlined" 
          color="primary"
          sx={{ 
            textTransform: 'capitalize',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'primary.dark',
              color: 'white'
            }
          }}
          onClick={() => handleCategoryClick('sub', product.category)}
        />

        {/* Stock Status */}
        <Chip
          icon={product.inStock ? <CheckCircle /> : <Inventory />}
          label={product.inStock ? t('products.productCard.inStock') : t('products.productCard.outOfStock')}
          color={product.inStock ? 'success' : 'error'}
          variant="outlined"
        />
      </Stack>
    </Box>
  );
};

export default ProductInfo;
