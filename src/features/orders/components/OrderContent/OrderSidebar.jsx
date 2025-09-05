import React from "react";
import PropTypes from "prop-types";
import {
  Box, Typography, Button, Divider, Card, CardContent, useTheme, Avatar, Stack, alpha,
} from '@mui/material';
import { Timeline, ArrowForward, TrackChanges } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const OrderSidebar = ({ order, statusConfig, navigate }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
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
  
  const normalizedStatus = normalizeStatus(order.status);
  const displayStatus = normalizedStatus !== 'unknown' ? t(`orders.status.${normalizedStatus}`) : order.status;

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 4,
        position: 'sticky',
        top: 20,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${statusConfig.color} 0%, ${alpha(statusConfig.color, 0.8)} 100%)`,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Avatar
          sx={{
            bgcolor: alpha('#fff', 0.2),
            width: 64,
            height: 64,
            margin: '0 auto 16px',
            border: `3px solid ${alpha('#fff', 0.3)}`
          }}
        >
          {statusConfig.icon}
        </Avatar>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t('orders.orderSidebar.orderStatus')}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.95 }}>
          {displayStatus}
        </Typography>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t('orders.orderSidebar.orderDetails')}
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">{t('orders.orderSidebar.orderNumber')}:</Typography>
                <Typography variant="body2" fontWeight={600}>#{order.id}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">{t('orders.orderSidebar.orderDate')}:</Typography>
                <Typography variant="body2" fontWeight={600}>{order.date}</Typography>
              </Box>
              {order.trackingNumber && (
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">{t('orders.orderSidebar.trackingNumber')}:</Typography>
                  <Typography variant="body2" fontWeight={600}>{order.trackingNumber}</Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ p: 3, bgcolor: alpha(theme.palette.info.main, 0.08), borderRadius: 2 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Timeline color="info" />
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  {t('orders.orderSidebar.whatHappensNow')}
                </Typography>
                <Typography variant="body2" lineHeight={1.6}>
                  {t('orders.orderSidebar.emailConfirmationMessage')}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack spacing={2}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ArrowForward />}
              onClick={() => navigate('/')}
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
              {t('orders.orderSidebar.continueShopping')}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<TrackChanges />}
              onClick={() => navigate('/orders')}
              sx={{
                py: 2,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {t('orders.orderSidebar.viewAllOrders')}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OrderSidebar.propTypes = {
  order: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })).isRequired,
    subtotal: PropTypes.number.isRequired,
    shippingCost: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  statusConfig: PropTypes.object,
  navigate: PropTypes.func.isRequired
};

export default OrderSidebar;
