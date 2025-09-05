import React from 'react';
import { Paper, Stack, Typography, Chip, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ProductPrice = ({ product }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Paper
      elevation={0}
      sx={{ 
        p: 3, 
        backgroundColor: alpha(theme.palette.primary.main, 0.08), 
        borderRadius: 3, 
        border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h3" fontWeight={700} color="primary.main">
          ${product.price.toFixed(2)}
        </Typography>

        {product.originalPrice && (
          <Typography 
            variant="h5" 
            sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
          >
            ${product.originalPrice.toFixed(2)}
          </Typography>
        )}

        {product.discount > 0 && (
          <Chip 
            label={`${t("products.productCard.save")} ${product.discount}%`} 
            color="success" 
            size="small" 
            sx={{ fontWeight: 600 }} 
          />
        )}
      </Stack>
    </Paper>
  );
};

export default ProductPrice;
