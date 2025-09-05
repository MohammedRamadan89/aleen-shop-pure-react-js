import React from 'react';
import {
  Grid,
  Card,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Box
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import OrderSummary from '../../OrderSummaryBox';
import { shippingSchema } from '../../../validations/shipping.validation.schemas';

const ShippingStep = ({
  shippingAddress,
  onShippingSubmit,
  shippingMethod,
  setShippingMethod,
  setFormSubmitRef,
  cartItems,
  subtotal,
  shippingCost,
  total
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    defaultValues: shippingAddress,
    resolver: yupResolver(shippingSchema),
    mode: 'onSubmit'
  });

  const { t } = useTranslation();

  React.useEffect(() => {
    if (setFormSubmitRef) {
      setFormSubmitRef(
        handleSubmit(
          onShippingSubmit,
          (formErrors) => {
            const firstErrorField = Object.keys(formErrors)[0];
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) {
              errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              errorElement.focus();
            }
          }
        )
      );
    }
  }, [handleSubmit, onShippingSubmit, setFormSubmitRef]);

  return (
    <form onSubmit={handleSubmit(onShippingSubmit)}>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {t("orders.checkout.shipping.address")}
            </Typography>
            <Grid container spacing={2}>
              {[
                { name: 'firstName', label: t("orders.checkout.shipping.firstName") },
                { name: 'lastName', label: t("orders.checkout.shipping.lastName") },
                { name: 'address', label: t("orders.checkout.shipping.addressField"), full: true },
                { name: 'city', label: t("orders.checkout.shipping.city") },
                { name: 'zipCode', label: t("orders.checkout.shipping.zipCode") },
                { name: 'phone', label: t("orders.checkout.shipping.phone") }
              ].map((field, i) => (
                <Grid item size={{ xs: 12, sm: field.full ? 12 : 6 }} key={i}>
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                      <TextField
                        fullWidth
                        label={field.label}
                        variant="outlined"
                        margin="normal"
                        error={!!errors[field.name]}
                        helperText={errors[field.name]?.message}
                        {...controllerField}
                      />
                    )}
                  />
                </Grid>
              ))}

              <Grid item size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth margin="normal" error={!!errors.country}>
                      <InputLabel>{t("orders.checkout.shipping.country")}</InputLabel>
                      <Select label={t("shipping.country")} {...field}>
                        <MenuItem value="us">{t("orders.checkout.shipping.countries.us")}</MenuItem>
                        <MenuItem value="sa">{t("orders.checkout.shipping.countries.sa")}</MenuItem>
                        <MenuItem value="eg">{t("orders.checkout.shipping.countries.eg")}</MenuItem>
                        <MenuItem value="ae">{t("orders.checkout.shipping.countries.ae")}</MenuItem>
                      </Select>
                      {errors.country && (
                        <Typography variant="caption" color="error">
                          {errors.country.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Card>

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {t("orders.checkout.shipping.method")}
            </Typography>
            <RadioGroup
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Typography variant="body2">{t("orders.checkout.shipping.methods.standard")}</Typography>
                    <Typography variant="body2">{t("orders.checkout.shipping.free")}</Typography>
                  </Box>
                }
                sx={{
                  py: 1,
                  width: '100%',
                  '.MuiFormControlLabel-label': { width: '100%' },
                }}
              />
              <Divider />
              <FormControlLabel
                value="express"
                control={<Radio />}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Typography variant="body2">{t("orders.checkout.shipping.methods.express")}</Typography>
                    <Typography variant="body2">{t("orders.checkout.shipping.expressCost")}</Typography>
                  </Box>
                }
                sx={{
                  py: 1,
                  width: '100%',
                  '.MuiFormControlLabel-label': { width: '100%' },
                }}
              />


            </RadioGroup>
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

export default ShippingStep;
