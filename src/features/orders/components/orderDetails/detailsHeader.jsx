import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Box, Grid, Button, Chip, Paper, Stack, useTheme, alpha } from '@mui/material';
import { LocalShipping, ArrowBack, Receipt, TrackChanges, CheckCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const OrderDetailsHeader = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

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

  const normalizedStatus = normalizeStatus(order.status);
  const displayStatus = normalizedStatus !== 'unknown' ? t(`orders.status.${normalizedStatus}`) : order.status;

  const getStatusColor = (status) => {
    switch (normalizeStatus(status)) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'canceled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (normalizeStatus(status)) {
      case 'delivered': return <CheckCircle fontSize="small" />;
      case 'shipped': return <LocalShipping fontSize="small" />;
      case 'processing': return <TrackChanges fontSize="small" />;
      default: return <Receipt fontSize="small" />;
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        mb: 4, 
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        borderRadius: 4
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/orders')}
          sx={{ 
            color: 'white', 
            '&:hover': { backgroundColor: alpha('#fff', 0.1) },
            borderRadius: 3
          }}
        >
          {t('orders.orderDetails.back')}
        </Button>
      </Stack>

      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs:12, md:8}} >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            {t('orders.orderDetails.orderInfo')}
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>{t('orders.orderDetails.orderNumber')}</Typography>
              <Typography variant="h6" fontWeight={600}>#{order.id}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>{t('orders.orderDetails.orderDate')}</Typography>
              <Typography variant="h6" fontWeight={600}>{order.date}</Typography>
            </Box>
            {order.trackingNumber && (
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{t('orders.orderDetails.trackingNumber')}</Typography>
                <Typography variant="h6" fontWeight={600}>{order.trackingNumber}</Typography>
              </Box>
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs:12, md:4}} >
          <Box textAlign={{ xs: 'left', md: 'right' }}>
            <Chip
              icon={getStatusIcon(order.status)}
              label={displayStatus}
              color={getStatusColor(order.status)}
              size="large"
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                px: 2,
                py: 1,
                height: 'auto'
              }}
            />
            <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>
              ${order.total.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {t('orders.orderDetails.finalTotal')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default OrderDetailsHeader;
