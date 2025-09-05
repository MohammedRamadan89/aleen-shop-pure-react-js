import { Box, Typography,  Avatar, alpha, useTheme } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const OrderPaymentMethod = ({ order, getPaymentMethodLabel }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.success.main, 0.1),
                          width: 36,
                          height: 36
                        }}
                      >
                        <CreditCard fontSize="small" color="success" />
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {t("orders.common.paymentMethod")}
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {getPaymentMethodLabel(order.paymentMethod)}
                        </Typography>
                      </Box>
                    </Box>
  )
}

export default OrderPaymentMethod;