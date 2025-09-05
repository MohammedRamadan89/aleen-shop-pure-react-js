import React from 'react';
import { Box, Grid, Paper, Typography, Chip } from '@mui/material';
import { 
  Inventory, 
  AttachMoney, 
  Star, 
  LocalOffer 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CategoryStats = ({ products }) => {
      const { t } = useTranslation();

  const stats = React.useMemo(() => {
    if (!products.length) return null;

    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock).length;
    const onSaleProducts = products.filter(p => p.discount > 0).length;
    const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
    const averageRating = products.reduce((sum, p) => sum + p.rating, 0) / totalProducts;
    const priceRange = {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    };

    return {
      totalProducts,
      inStockProducts,
      onSaleProducts,
      averagePrice,
      averageRating,
      priceRange
    };
  }, [products]);

  if (!stats) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        {t("products.categoryOverview")}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid size={{ xs:6, sm:3}} >
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Inventory color="primary" sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h6" fontWeight={700}>
              {stats.totalProducts}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("products.total")}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs:6, sm:3}} >
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <AttachMoney color="success" sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h6" fontWeight={700}>
              ${stats.averagePrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("products.avgPrice")}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs:6, sm:3}} >
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Star color="warning" sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h6" fontWeight={700}>
              {stats.averageRating.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("products.avgRating")}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs:6, sm:3}} >
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <LocalOffer color="error" sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h6" fontWeight={700}>
              {stats.onSaleProducts}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("products.onSale")}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Price Range */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Chip 
          label={`${t("products.priceRange")} : $${stats.priceRange.min.toFixed(2)} - $${stats.priceRange.max.toFixed(2)}`}
          variant="outlined"
          color="primary"
          sx={{ fontWeight: 600 }}
        />
      </Box>
    </Box>
  );
};

export default CategoryStats;
