import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, useTheme, alpha } from '@mui/material';
import { LocalShipping, TrackChanges, CheckCircle, Receipt } from '@mui/icons-material';

import OrderNotFound from '../components/OrderContent/OrderNotFound';
import SuccessHeader from '../components/orderConfirmation/SuccessHeader';
import OrderItems from '../components/OrderContent/OrderItems';
import ShippingInfo from '../components/OrderContent/ShippingInfo';
import PaymentInfo from '../components/OrderContent/PaymentInfo';
import OrderSidebar from '../components/OrderContent/OrderSidebar';
import { useTranslation } from 'react-i18next';

const OrderConfirmation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate('/');
  };

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

  const getOrderStatusConfig = (status) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case 'shipped':
        return { color: theme.palette.info.main, bgColor: alpha(theme.palette.info.main, 0.1), icon: <LocalShipping /> };
      case 'processing':
        return { color: theme.palette.warning.main, bgColor: alpha(theme.palette.warning.main, 0.1), icon: <TrackChanges /> };
      case 'delivered':
        return { color: theme.palette.success.main, bgColor: alpha(theme.palette.success.main, 0.1), icon: <CheckCircle /> };
      default:
        return { color: theme.palette.grey[600], bgColor: alpha(theme.palette.grey[600], 0.1), icon: <Receipt /> };
    }
  };
  const handleArrow = () => { navigate('../') }
  if (!order) return <OrderNotFound handleArrow={handleArrow} />;

  // Validate required order properties
  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    return <OrderNotFound />;
  }

  const statusConfig = getOrderStatusConfig(order.status);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Success Header */}
      <SuccessHeader order={order} handleGoBack={handleGoBack} />
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 12, lg: 8 }} >
          {/* Order Items */}
          <OrderItems order={order} />
          {/* Shipping & Payment Info */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }} >
              <PaymentInfo order={order} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
              <ShippingInfo order={order} />
            </Grid>

          </Grid>
        </Grid>
        {/* Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }} >
          <OrderSidebar order={order} statusConfig={statusConfig} navigate={navigate} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderConfirmation;
