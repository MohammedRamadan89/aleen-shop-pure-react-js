import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Grid, Typography, Divider, IconButton, Chip, Skeleton, Stack
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { removeFromCart, updateQuantity } from '../cartSlice';
import CartEmpty from '../components/CartEmpty';
import CartCardItems from '../components/CartCardItems';
import CartSummary from '../components/CartSummary';

const CartPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isLoading = useSelector((state) => state.cart.loading);
  const navigate = useNavigate();

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      id: item.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({
        id: item.id,
        quantity: newQuantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      }));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const isEmpty = !cartItems?.length;
  const total = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" width="40%" height={60} />
        {[...Array(3)].map((_, index) => (
          <Box key={index} sx={{ display: 'flex', mb: 2, p: 2 }}>
            <Skeleton variant="rectangular" width={100} height={100} />
            <Box sx={{ flexGrow: 1, ml: 2 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (isEmpty) return <CartEmpty handleGoBack={handleGoBack} />;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, position: 'relative', pt: { xs: 6, md: 8 } }}>
      {/* زر العودة */}
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: 'absolute',
          top: { xs: 10, md: 20 },
          left: { xs: 5, md: 20 },
          color: 'text.primary',
          zIndex: 1,
        }}
        aria-label={t("cart.goBack")}
      >
        <ArrowBack />
      </IconButton>

      <Grid container spacing={4}>
        {/* قسم المنتجات */}
        <Grid size={{ xs:12, md:8 }} >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t("cart.shoppingCart")}
            </Typography>
            <Chip
              label={t("cart.itemsCount", { count: cartItems.length })}
              color="primary"
              size="small"
              sx={{ ml: 2 }}
            />
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3}>
            {cartItems.map((item) => (
              <CartCardItems
                key={item.id}
                item={item}
                handleRemoveItem={handleRemoveItem}
                handleQuantityChange={handleQuantityChange}
              />
            ))}
          </Stack>
        </Grid>

        {/* ملخص الطلب */}
        <Grid size={{ xs:12, md:4 }} >
<CartSummary total={total} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
