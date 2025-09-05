import { Grid, Card, CardContent, Divider, Stack, alpha, useTheme } from '@mui/material';

import OrderCardHeader from './OrderCardHeader';
import OrderShippingMethod from './OrderShippingMethod';
import OrderPaymentMethod from './OrderPaymentMethod';
import OrderTotalAmount from './OrderTotalAmount';
import OrdersActionButtons from './OrdersActionButtons';


const OrderCard = ({ order, statusConfig, handleCancelClick, getPaymentMethodLabel }) => {
  const theme = useTheme();
  return (
    <Grid key={order.id} size={{ xs: 12, md: 6, lg: 4 }}>
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.15)}`
          }
        }}
      >
        {/* Card Header */}
        <OrderCardHeader order={order} statusConfig={statusConfig} />

        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            {/* Shipping Method */}
            <OrderShippingMethod order={order} />

            {/* Payment Method */}
            <OrderPaymentMethod order={order} getPaymentMethodLabel={getPaymentMethodLabel} />

            {/* Total Amount */}
            <OrderTotalAmount order={order} />

            <Divider sx={{ my: 1 }} />

            {/* Action Button */}
            <OrdersActionButtons order={order} handleCancelClick={handleCancelClick} />

          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default OrderCard;