import React from 'react';
import {
  Box, Typography, Button, Divider, useTheme, Stack, useMediaQuery
} from '@mui/material';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CartSummary = ({ total }) => {
    const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down('md'));
      const { t } = useTranslation();
    return (
        <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[2],
              position: isMobile ? 'static' : 'sticky',
              top: 100
            }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t("cart.cartSummary")}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.5} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t("cart.subtotal")}</Typography>
                <Typography variant="body2">${total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t("cart.shipping")}</Typography>
                <Typography variant="body2">{t("cart.free")}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t("cart.tax")}</Typography>
                <Typography variant="body2">$0.00</Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">{t("cart.total")}</Typography>
              <Typography variant="h6" fontWeight={700}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              component={Link}
              to='/checkout'
              variant="contained"
              fullWidth
              size="large"
              startIcon={<ShoppingCartCheckout />}
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 15px ${theme.palette.primary.light}`,
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                },
                transition: 'all 0.3s ease'
              }}
            >
              {t("cart.proceedCheckout")}
            </Button>
          </Box>
    )
          
}

export default CartSummary;