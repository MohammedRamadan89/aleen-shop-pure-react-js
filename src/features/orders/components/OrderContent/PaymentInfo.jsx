import React from "react";
import PropTypes from "prop-types";
import {
    Box, Typography, Card, CardContent, Chip, useTheme, Avatar, Stack, alpha,
} from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const PaymentInfo = ({ order }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const getPaymentLabel = () => {
        switch (order.paymentMethod) {
            case 'credit':
                return t('orders.shippingInfo.creditCard');
            case 'paypal':
                return 'PayPal';
            default:
                return t('orders.shippingInfo.cashOnDelivery');
        }
    };

    return (
        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
            <Box
                sx={{
                    p: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.light, 0.1)} 100%)`,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                        <CreditCard />
                    </Avatar>
                    <Typography variant="h6" fontWeight={700}>
                        {t('orders.shippingInfo.paymentInfo')}
                    </Typography>
                </Stack>
            </Box>

            <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {t('orders.shippingInfo.paymentMethod')}
                        </Typography>
                        <Chip
                            label={getPaymentLabel()}
                            color="success"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                        />
                    </Box>

                    {order.paymentMethod === 'credit' && order.cardInfo && (
                        <>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    {t('orders.shippingInfo.cardholderName')}
                                </Typography>
                                <Typography variant="body1">{order.cardInfo.cardholderName}</Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    {t('orders.shippingInfo.cardNumber')}
                                </Typography>
                                <Typography variant="body1" fontFamily="monospace">
                                    •••• •••• •••• {order.cardInfo.last4}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    {t('orders.shippingInfo.expirationDate')}
                                </Typography>
                                <Typography variant="body1">{order.cardInfo.exp}</Typography>
                            </Box>
                        </>
                    )}

                    {order.paymentMethod === 'paypal' && order.paypalEmail && (
                        <Box>
                            <Typography variant="body1">{order.paypalEmail}</Typography>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

PaymentInfo.propTypes = {
    order: PropTypes.shape({
        shippingAddress: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            zipCode: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default PaymentInfo;
