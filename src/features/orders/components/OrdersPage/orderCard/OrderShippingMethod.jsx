import React from 'react';
import {
  Box, Typography, useTheme, Avatar, alpha 
} from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const OrderShippingMethod = ({ order }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar
        sx={{
          bgcolor: alpha(theme.palette.info.main, 0.1),
          width: 36,
          height: 36
        }}
      >
        <LocalShipping fontSize="small" color="info" />
      </Avatar>
      <Box flex={1}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t("orders.orderShipping.method")}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {order.shippingMethod === "express"
            ? t("orders.orderShipping.express")
            : t("orders.orderShipping.standard")}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderShippingMethod;
