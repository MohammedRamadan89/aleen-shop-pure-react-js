import React, { useState, useMemo } from 'react';
import { Button, Stack, alpha, useTheme } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrdersActionButtons = ({ order, handleCancelClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
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
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        startIcon={<InfoOutlined />}
        fullWidth
        size="large"
        onClick={() => navigate(`/orders/${order.id}`)}
        sx={{
          py: 1.5,
          borderRadius: 3,
          textTransform: 'none',
          fontSize: '0.8rem',
          fontWeight: 600,
          minWidth: 140,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.4)}`
          }
        }}
      >
        {t("orders.common.buttons.showDetails")}
      </Button>

      {normalizedStatus === 'processing' ? (
        <Button
          variant="outlined"
          color="error"
          fullWidth
          size="large"
          onClick={() => handleCancelClick(order.id)}
          sx={{
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            minWidth: 140,
          }}
        >
          {t("orders.common.buttons.cancelOrder")}
        </Button>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          disabled
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            minWidth: 140,
            color: normalizedStatus === 'canceled' ? theme.palette.error.main : 'text.secondary',
            borderColor: normalizedStatus === 'canceled' ? theme.palette.error.main : 'text.disabled',
            '&.Mui-disabled': {
              color: normalizedStatus === 'canceled' ? theme.palette.error.main : 'text.secondary',
              borderColor: normalizedStatus === 'canceled' ? theme.palette.error.main : 'text.disabled',
              opacity: 0.7
            }
          }}
        >
          {normalizedStatus !== 'unknown' ? t(`orders.status.${normalizedStatus}`) : order.status}
        </Button>
      )}
    </Stack>
  )
}

export default OrdersActionButtons;