import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useStepScrollToTop from '../../../common/hooks/ScrollToTop';
import StepContent from '../components/checkOut/StepContent';
import { clearCart } from '../../cart/cartSlice';
import { addOrder } from '../../orders/ordersSlice';
import { Box, Container, Stepper, Step, StepLabel, Typography, Button, IconButton, useTheme } from '@mui/material';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CheckoutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phone: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({});

  const shippingFormRef = useRef(null);
  const paymentFormRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.items);
  const shippingCost = shippingMethod === 'express' ? 9.99 : 0;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handlePaymentSubmit = (data) => {
    setPaymentDetails(data);
    setActiveStep((prev) => prev + 1);
  };

  const handleShippingSubmit = (data) => {
    setShippingAddress(data);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      shippingFormRef?.current?.();
    } else if (activeStep === 1) {
      paymentFormRef?.current?.();
    } else if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    const order = {
      id: 'ORD-' + Date.now(),
      date: new Date().toLocaleDateString(),
      status: t("orders.status.processing"),
      trackingNumber: 'TRK-' + Math.floor(Math.random() * 1000000),
      items: cartItems,
      shippingAddress,
      paypalEmail: paymentDetails.paypalEmail,
      paymentMethod: paymentDetails.paymentMethod,
      cardInfo: {
        cardholderName: paymentDetails.cardholderName,
        last4: paymentDetails.cardNumber.slice(-4),
        exp: paymentDetails.expiryDate,
      },
      shippingMethod,
      subtotal,
      shippingCost,
      total: subtotal + shippingCost
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    navigate('/order-confirmation', { state: { order } });
  };

  const steps = [
    t("orders.checkout.steps.shipping"),
    t("orders.checkout.steps.payment"),
    t("orders.checkout.steps.review")
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative' }}>
      <IconButton
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 32 },
          left: { xs: 8, md: 32 },
          color: 'text.primary',
          zIndex: 1
        }}
      >
        <ArrowBack />
      </IconButton>

      <Box sx={{ maxWidth: 800, mx: 'auto', mb: 4, pt: { xs: 6, md: 0 } }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
          {t("orders.checkout.title")}
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <StepContent
        step={activeStep}
        shippingAddress={shippingAddress}
        onShippingSubmit={handleShippingSubmit}
        onPaymentSubmit={handlePaymentSubmit}
        handleAddressChange={handleAddressChange}
        shippingMethod={shippingMethod}
        setShippingMethod={setShippingMethod}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cartItems={cartItems}
        subtotal={subtotal}
        shippingCost={shippingCost}
        total={total}
        setShippingFormSubmit={(fn) => (shippingFormRef.current = fn)}
        setPaymentFormSubmit={(fn) => (paymentFormRef.current = fn)}
        handlePlaceOrder={handlePlaceOrder}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={activeStep === 0 ? handleBack : handleBackStep}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: 600
          }}
        >
          {t("orders.checkout.buttons.back")}
        </Button>

        {activeStep !== steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<CheckCircle />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
              }
            }}
          >
            {t("orders.checkout.buttons.next")}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default CheckoutPage;
