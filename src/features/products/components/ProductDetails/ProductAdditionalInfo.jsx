import React from 'react';
import { Avatar, CardContent, Card, Typography, alpha, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Star, CheckCircle, Info } from '@mui/icons-material';
import { useTranslation } from "react-i18next";

const ProductAdditionalInfo = ({ product }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Grid container spacing={4} sx={{ mt: 6 }}>
      {/* تفاصيل المنتج */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.info.main, 0.1),
                width: 80,
                height: 80,
                margin: '0 auto 16px'
              }}
            >
              <Info sx={{ fontSize: 40, color: 'info.main' }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t("products.productDetails.details.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              {t("products.productDetails.details.description")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* ضمان الجودة */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.success.main, 0.1),
                width: 80,
                height: 80,
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t("products.productDetails.quality.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              {t("products.productDetails.quality.description")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* تقييم العملاء */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                width: 80,
                height: 80,
                margin: '0 auto 16px'
              }}
            >
              <Star sx={{ fontSize: 40, color: 'warning.main' }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t("products.productDetails.reviews.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              {t("products.productDetails.reviews.description", { count: product.reviewCount, rating: product.rating })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductAdditionalInfo;
