import React from 'react';
import { Box, Typography, Stack, Button, Paper, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ProductOptions = ({ sizes, colors, selectedSize, setSelectedSize, selectedColor, setSelectedColor, quantity, handleQuantityChange }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Size */}
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t('products.productOptions.size')}: {selectedSize}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {sizes.map(size => (
            <Button
              key={size}
              variant={selectedSize === size ? 'contained' : 'outlined'}
              onClick={() => setSelectedSize(size)}
              sx={{ minWidth: 50, height: 50, borderRadius: 2, fontWeight: 600 }}
            >
              {size}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Color */}
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t('products.productOptions.color')}: {selectedColor}
        </Typography>
        <Stack direction="row" spacing={1}>
          {colors.map(color => (
            <Button
              key={color}
              variant={selectedColor === color ? 'contained' : 'outlined'}
              onClick={() => setSelectedColor(color)}
              sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none' }}
            >
              {t(`products.colors.${color}`)}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Quantity */}
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t('products.productOptions.quantity')}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', borderRadius: 3, overflow: 'hidden' }}>
            <IconButton onClick={() => handleQuantityChange('decrease')} disabled={quantity <= 1} sx={{ borderRadius: 0 }}>
              <Remove />
            </IconButton>
            <Typography variant="h6" fontWeight={600} sx={{ minWidth: 60, textAlign: 'center', py: 1 }}>
              {quantity}
            </Typography>
            <IconButton onClick={() => handleQuantityChange('increase')} sx={{ borderRadius: 0 }}>
              <Add />
            </IconButton>
          </Paper>
        </Stack>
      </Box>
    </>
  );
};

export default ProductOptions;
