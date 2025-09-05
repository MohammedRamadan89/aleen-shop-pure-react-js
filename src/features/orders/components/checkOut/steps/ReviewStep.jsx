import React from 'react';
import {
  Grid,
  Card,
  Typography,
  Divider,
  Box
} from '@mui/material';
import OrderSummaryBox from '../../OrderSummaryBox';
import { useTranslation } from 'react-i18next';

const ReviewStep = ({ shippingAddress, shippingMethod, paymentMethod, cartItems, subtotal, shippingCost, total, handlePlaceOrder }) => {
  const { t } = useTranslation();

  const renderCountryName = (code) => {
    switch (code) {
      case 'sa': return t("countries.sa");
      case 'eg': return t("countries.eg");
      case 'ae': return t("countries.ae");
      case 'us': return t("countries.us");
      default: return '';
    }
  };

  const renderPaymentMethod = (method) => {
    switch (method) {
      case 'credit': return t("orders.checkout.paymentMethods.credit");
      case 'paypal': return t("orders.checkout.paymentMethods.paypal");
      case 'cod': return t("orders.checkout.paymentMethods.cod");
      default: return '';
    }
  };

  const renderShippingMethod = (method) => {
    return method === 'standard'
      ? t("orders.checkout.shippingMethods.standard")
      : t("orders.checkout.shippingMethods.express");
  };

  return (
    <Grid container spacing={4}>
      <Grid item size={{ xs: 12, sm: 8 }}>
        <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t("orders.checkout.review.shippingInfo")}
          </Typography>
          <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
          <Typography>{shippingAddress.address}</Typography>
          <Typography>{shippingAddress.city}, {shippingAddress.zipCode}</Typography>
          <Typography>{renderCountryName(shippingAddress.country)}</Typography>
          <Typography>{shippingAddress.phone}</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t("orders.checkout.review.shippingMethod")}
          </Typography>
          <Typography>{renderShippingMethod(shippingMethod)}</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t("orders.checkout.review.paymentMethod")}
          </Typography>
          <Typography>{renderPaymentMethod(paymentMethod)}</Typography>
        </Card>

        <Card variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t("orders.checkout.review.orderItems")}
          </Typography>
          {cartItems.map((item) => (
            <Box key={item.itemKey || item.id} sx={{ display: 'flex', mb: 2 }}>
              <Box sx={{ width: 60, height: 60, mr: 2 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("orders.orderSummary.quantity")}{'\u200E'}: {'\u200E'} {item.quantity} × ${item.price.toFixed(2)}
                </Typography>
                {item.selectedSize && (
                  <Typography color="text.secondary" variant="body2">
                    {t("orders.orderSummary.size")}{'\u200E'}: {'\u200E'} {item.selectedSize}
                  </Typography>
                )}
                {item.selectedColor && (
                  <Typography color="text.secondary" variant="body2" dir="ltr">
                    {t("orders.orderSummary.color")}{'\u200E'}: {'\u200E'} {t(`products.colors.${item.selectedColor}`)}
                  </Typography>
                )}
              </Box>
              <Typography variant="subtitle1" fontWeight={600}>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Card>
      </Grid>

      <Grid item size={{ xs: 12, sm: 4 }}>
        <OrderSummaryBox
          cartItems={cartItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
          onSubmit={handlePlaceOrder}
        />
      </Grid>
    </Grid>
  );
};

export default ReviewStep;
