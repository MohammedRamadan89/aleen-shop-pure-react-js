import { Box, Typography, Chip, Stack, Avatar, alpha ,useTheme } from '@mui/material';
import { ShoppingBag, CalendarToday } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const OrderCardHeader = ({ order ,statusConfig }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Normalize order status to stable keys so UI logic doesn't break on language switch
  const normalizeStatus = (status) => {
    const s = (status || '').toString().trim().toLowerCase();
    const map = new Map([
      // processing
      [t('orders.status.processing').toLowerCase(), 'processing'],
      ['processing', 'processing'],
      ['قيد المعالجة', 'processing'],
      // shipped
      [t('orders.status.shipped').toLowerCase(), 'shipped'],
      ['shipped', 'shipped'],
      ['تم الشحن', 'shipped'],
      // delivered
      [t('orders.status.delivered').toLowerCase(), 'delivered'],
      ['delivered', 'delivered'],
      ['تم التوصيل', 'delivered'],
      // canceled
      [t('orders.status.canceled').toLowerCase(), 'canceled'],
      ['canceled', 'canceled'],
      ['تم الإلغاء', 'canceled'],
    ]);
    return map.get(s) || 'unknown';
  };
  
  const normalizedStatus = normalizeStatus(order.status);
  const displayStatus = normalizedStatus !== 'unknown' ? t(`orders.status.${normalizedStatus}`) : order.status;
          return (
                <Box
                  sx={{
                    p: 3,
                    background: `linear-gradient(135deg, ${alpha(statusConfig.bgColor, 0.1)} 0%, ${alpha(statusConfig.bgColor, 0.05)} 100%)`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    height: '120px'
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor: statusConfig.bgColor,
                          width: 48,
                          height: 48
                        }}
                      >
                        <ShoppingBag />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          #{order.id}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarToday fontSize="small" sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {order.date}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Chip
                      icon={statusConfig.icon}
                      label={displayStatus}
                      color={statusConfig.color}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Stack>
                </Box>
          )
}

export default OrderCardHeader;