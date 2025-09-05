import React from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  TextField,
} from '@mui/material';
import { CreditCard, Payment, LocalShipping } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import OrderSummary from '../../OrderSummaryBox';
import { paymentSchema } from '../../../validations/payment.validation.schemas';

const PaymentStep = ({
  paymentMethod,
  setPaymentMethod,
  cartItems,
  subtotal,
  shippingCost,
  total,
  onPaymentSubmit,
  setFormSubmitRef,
}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardholderName: '',
      paymentMethod,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      paypalEmail: '',
      deliveryNote: '',
    },
    resolver: yupResolver(paymentSchema),
  });

  React.useEffect(() => {
    if (setFormSubmitRef) {
      setFormSubmitRef(handleSubmit(onPaymentSubmit));
    }
  }, [handleSubmit, onPaymentSubmit, setFormSubmitRef]);

  return (
    <form onSubmit={handleSubmit(onPaymentSubmit)}>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, sm: 8 }}>
          <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {t("orders.checkout.paymentStep.paymentMethod")}
            </Typography>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setPaymentMethod(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CreditCard sx={{ mr: 1 }} />
                        <span>{t("orders.checkout.paymentStep.credit")}</span>
                      </Box>
                    }
                    sx={{ py: 1 }}
                  />
                  <Divider />

                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Payment sx={{ mr: 1 }} />
                        <span>{t("orders.checkout.paymentStep.paypal")}</span>
                      </Box>
                    }
                    sx={{ py: 1 }}
                  />

                  <Divider />

                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalShipping sx={{ mr: 1 }} />
                        <span>{t("orders.checkout.paymentStep.cod")}</span>
                      </Box>
                    }
                    sx={{ py: 1 }}
                  />
                </RadioGroup>
              )}
            />

            {paymentMethod === 'credit' && (
              <Box sx={{ mt: 2, pl: 4 }}>
                <Controller
                  name="cardholderName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={t("orders.checkout.paymentStep.cardholderName")}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("orders.checkout.paymentStep.placeholder.cardholderName")}
                      error={!!errors.cardholderName}
                      helperText={errors.cardholderName?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={t("orders.checkout.paymentStep.cardNumber")}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("orders.checkout.paymentStep.placeholder.cardNumber")}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber?.message}
                      {...field}
                    />
                  )}
                />

                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="expiryDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label={t("orders.checkout.paymentStep.expiryDate")}
                          variant="outlined"
                          margin="normal"
                          placeholder={t("orders.checkout.paymentStep.placeholder.expiryDate")}
                          error={!!errors.expiryDate}
                          helperText={errors.expiryDate?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="cvv"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label={t("orders.checkout.paymentStep.cvv")}
                          variant="outlined"
                          margin="normal"
                          placeholder={t("orders.checkout.paymentStep.placeholder.cvv")}
                          error={!!errors.cvv}
                          helperText={errors.cvv?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {paymentMethod === 'paypal' && (
              <Box sx={{ mt: 2, pl: 4 }}>
                <Controller
                  name="paypalEmail"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={t("orders.checkout.paymentStep.paypalEmail")}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("orders.checkout.paymentStep.placeholder.paypalEmail")}
                      error={!!errors.paypalEmail}
                      helperText={errors.paypalEmail?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
            )}

            {paymentMethod === 'cod' && (
              <Box sx={{ mt: 2, pl: 4 }}>
                <Controller
                  name="deliveryNote"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={t("orders.checkout.paymentStep.deliveryNote")}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("orders.checkout.paymentStep.placeholder.deliveryNote")}
                      error={!!errors.deliveryNote}
                      helperText={errors.deliveryNote?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
            )}
          </Card>
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shippingCost={shippingCost}
            total={total}
            showButton={false}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PaymentStep;
