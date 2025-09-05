import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  useTheme,
} from '@mui/material';
import { useTranslation } from "react-i18next";

const OrderSummaryBox = ({ cartItems, subtotal, shippingCost, total, showButton = true, onSubmit }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: theme.shadows[1],
        position: 'sticky',
        top: 100
      }}
      
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {t("orders.orderSummary.title")}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {cartItems.map((item) => (
        <Box key={item.itemKey || item.id} sx={{ mb: 2 }} dir="ltr">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }} >
            <Typography variant="body2" fontWeight={600}>
              {item.name}
            </Typography>
            <Typography variant="body2">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {t("orders.orderSummary.quantity")}{'\u200E'}: {'\u200E'} {item.quantity} × ${item.price.toFixed(2)}
          </Typography>
          {item.selectedSize && (
            <Typography variant="body2" color="text.secondary">
              {t("orders.orderSummary.size")}{'\u200E'}: {'\u200E'} {item.selectedSize}
            </Typography>
          )}
          {item.selectedColor && (
            <Typography variant="body2" color="text.secondary">
            {t("orders.orderSummary.color")}{'\u200E'}: {'\u200E'}{t(`products.colors.${item.selectedColor}`)}
            </Typography>
          )}
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{t("orders.orderSummary.subtotal")}</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{t("orders.orderSummary.shipping")}</Typography>
          <Typography>
            {shippingCost === 0 ? t("orders.orderSummary.free") : `$${shippingCost.toFixed(2)}`}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">{t("orders.orderSummary.total")}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          ${total.toFixed(2)}
        </Typography>
      </Box>

      {showButton && (
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={onSubmit}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`,
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.success.dark} 0%, ${theme.palette.success.main} 100%)`
            }
          }}
        >
          {t("orders.orderSummary.placeOrder")}
        </Button>
      )}
    </Card>
  );
};

export default OrderSummaryBox;
