import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Box, Stack, Avatar, Typography, List,
  ListItem, ListItemAvatar, ListItemText, Divider, Chip, alpha, useTheme
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const OrderItems = ({ order }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Add safety checks for order properties
  if (!order || !order.items || !Array.isArray(order.items)) {
    return (
      <Card elevation={2} sx={{ mb: 4, borderRadius: 4, p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {t('orders.orderContent.noOrderItems')}
        </Typography>
      </Card>
    );
  }

  return (
    <Card 
      elevation={2}
      sx={{ 
        mb: 4,
        borderRadius: 4,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: 4,
          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56
            }}
          >
            <ShoppingBag sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {t('orders.orderContent.orderDetails')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {order.items.length} {t('orders.orderContent.itemsInOrder')}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <CardContent sx={{ p: 0 }}>
        <List sx={{ py: 0 }}>
          {order.items.map((item, i) => (
            <React.Fragment key={`item-${i}-${item.itemKey || item.name}`}>
              <ListItem 
                sx={{ 
                  py: 3,
                  px: 4,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04)
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant="rounded"
                    sx={{ 
                      width: 90, 
                      height: 90, 
                      mr: 3,
                      border: `2px solid ${theme.palette.divider}`
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                        <Chip 
                          label={`${t('orders.orderContent.quantity')}: ${item.quantity}`}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                        <Typography variant="body2" color="text.secondary">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </Typography>
                      </Stack>
                      {(item.selectedSize || item.selectedColor) && (
                        <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                          {item.selectedSize && (
                            <Chip 
                              label={`${t('orders.orderContent.size')}: ${item.selectedSize}`}
                              size="small"
                              variant="outlined"
                              color="secondary"
                            />
                          )}
                          {item.selectedColor && (
                            <Chip 
                              label={`${t('orders.orderContent.color')}: ${item.selectedColor}`}
                              size="small"
                              variant="outlined"
                              color="info"
                            />
                          )}
                        </Stack>
                      )}
                    </Box>
                  }
                />
                <Box textAlign="right">
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </ListItem>
              {i < order.items.length - 1 && (
                <Divider variant="inset" component="li" sx={{ ml: 15 }} />
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Order Summary */}
        <Box sx={{ p: 4, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
          <Typography variant="h5" fontWeight={700} gutterBottom mb={3}>
            {t('orders.orderContent.invoiceSummary')}
          </Typography>
          
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">{t('orders.orderContent.subtotal')}:</Typography>
              <Typography variant="h6" fontWeight={600}>
                ${order.subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">{t('orders.orderContent.shippingCost')}:</Typography>
              <Typography variant="h6" fontWeight={600} color="text.secondary">
                {order.shippingMethod === 'express'
                  ? `$${order.shippingCost.toFixed(2)}`
                  : t('orders.orderContent.free')}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center"
              sx={{
                p: 3,
                backgroundColor: alpha(theme.palette.success.main, 0.1),
                borderRadius: 3,
                border: `2px solid ${alpha(theme.palette.success.main, 0.2)}`
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                {t('orders.orderContent.total')}
              </Typography>
              <Typography variant="h4" fontWeight={700} color="success.main">
                ${order.total.toFixed(2)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

OrderItems.propTypes = {
  order: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string
    })).isRequired,
    subtotal: PropTypes.number,
    shippingCost: PropTypes.number,
    total: PropTypes.number,
    shippingMethod: PropTypes.string
  }).isRequired
};

export default OrderItems;
