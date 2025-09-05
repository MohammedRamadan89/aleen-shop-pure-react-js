import { Box, Typography, Avatar, alpha, useTheme } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const OrderTotalAmount = ( { order }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                          width: 36,
                          height: 36
                        }}
                      >
                        <AttachMoney fontSize="small" color="warning" />
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {t("orders.common.total")}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
  )
}

export default OrderTotalAmount;