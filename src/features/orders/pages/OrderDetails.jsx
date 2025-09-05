// src/pages/OrderDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grid, Button, useTheme, alpha } from '@mui/material';
import { ReceiptLong, TrackChanges, } from '@mui/icons-material';

import OrderDetailsHeader from '../components/orderDetails/detailsHeader';
import OrderNotFound from '../components/OrderContent/OrderNotFound';
import OrderItems from '../components/OrderContent/OrderItems';
import ShippingInfo from '../components/OrderContent/ShippingInfo';
import PaymentInfo from '../components/OrderContent/PaymentInfo';
import { useTranslation } from 'react-i18next';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { t } = useTranslation();
  const theme = useTheme();

  const order = useSelector((state) =>
    state.orders.items.find((o) => o.id === orderId)
  );

  // Normalize order status to stable keys so UI logic doesn't break on language switch
  const normalizeStatus = (status) => {
    const s = (status || '').toString().trim().toLowerCase();
    const map = new Map([
      // processing
      [t('orders.status.processing').toLowerCase(), 'processing'],
      ['processing', 'processing'],
      ['قيد المعالجة', 'processing'],
      // shipped
      [t('orders.status.shipped').toLowerCase(), 'shipped'],
      ['shipped', 'shipped'],
      ['تم الشحن', 'shipped'],
      // delivered
      [t('orders.status.delivered').toLowerCase(), 'delivered'],
      ['delivered', 'delivered'],
      ['تم التوصيل', 'delivered'],
      // canceled
      [t('orders.status.canceled').toLowerCase(), 'canceled'],
      ['canceled', 'canceled'],
      ['تم الإلغاء', 'canceled'],
    ]);
    return map.get(s) || 'unknown';
  };

  if (!order) {
    return (
      <OrderNotFound
        title={t("orders.orderNotFound.orderNotFound")}
        subtitle={t("orders.orderNotFound.orderErrorSubtitle")}
        description={t("orders.orderNotFound.orderErrorDescription")}
        buttonText={t("orders.orderNotFound.backToMyOrders")}
        buttonIcon={<ReceiptLong />}
        redirectTo="/orders"
      />
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <OrderDetailsHeader />
      {/* Products Section */}
      <OrderItems order={order} />
      <Grid container spacing={4}>


        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 6 }}>

          {/* Shipping Info */}
          <ShippingInfo order={order} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Payment Info */}
          <PaymentInfo order={order} />

          {/* Action Button */}
          {normalizeStatus(order.status) === 'shipped' && (
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<TrackChanges />}
              onClick={() => alert('يتم التتبع عبر شركة الشحن...')}
              sx={{
                py: 2,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`
              }}
            >
              {t("orders.trackOrder")}
            </Button>
          )}

        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetails;