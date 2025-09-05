import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Divider, Card, CardContent, useTheme, Avatar, Stack, alpha } from '@mui/material';
import { LocalShipping, Phone, Email } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ShippingInfo = ({ order }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
            <Box
                sx={{
                    p: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.light, 0.1)} 100%)`,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                        <LocalShipping />
                    </Avatar>
                    <Typography variant="h6" fontWeight={700}>
                        {t('orders.paymentInfo.shippingInfo')}
                    </Typography>
                </Stack>
            </Box>

            <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {t('orders.paymentInfo.recipientName')}
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                            {order.shippingAddress.name}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {t('orders.paymentInfo.address')}
                        </Typography>
                        <Typography variant="body2" lineHeight={1.6}>
                            {order.shippingAddress.address}<br/>
                            {order.shippingAddress.city}, {order.shippingAddress.zipCode}<br/>
                            {order.shippingAddress.country}
                        </Typography>
                    </Box>

                    <Divider />

                    <Stack spacing={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Phone fontSize="small" color="action" />
                            <Typography variant="body2">
                                {order.shippingAddress.phone}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Email fontSize="small" color="action" />
                            <Typography variant="body2">
                                {order.shippingAddress.email}
                            </Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ mt: 2, p: 2, bgcolor: alpha(theme.palette.info.main, 0.08), borderRadius: 2 }}>
                        <Typography variant="body2" fontWeight={600}>
                            {t('orders.paymentInfo.shippingMethod')}: {order.shippingMethod === 'express'
                                ? t('orders.paymentInfo.shippingExpress')
                                : t('orders.paymentInfo.shippingStandard')}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

ShippingInfo.propTypes = {
  order: PropTypes.shape({
    paymentMethod: PropTypes.string.isRequired,
    cardInfo: PropTypes.shape({
      cardholderName: PropTypes.string,
      last4: PropTypes.string,
      exp: PropTypes.string
    }),
    paypalEmail: PropTypes.string
  }).isRequired
};

export default ShippingInfo;
