import {
    Box, Typography, Button, IconButton, Paper, Stack, alpha, useTheme,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import OrdersStatus from './OrdersStatus';
import { useTranslation } from 'react-i18next';

const OrdersHeader = ({ handleArrow, statusCounts, setOrdersStatus, filterStatus, clearOrdersOnDev }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                mb: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: alpha('#fff', 0.1),
                    zIndex: 0
                }}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} mb={3} sx={{ position: 'relative', zIndex: 1 }}>
                {/* قسم العنوان وزر الرجوع */}
                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                        onClick={handleArrow}
                        sx={{
                            color: 'white',
                            '&:hover': { backgroundColor: alpha('#fff', 0.1) },
                            borderRadius: 2
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <Typography variant="h4" fontWeight={700}>{t("orders.common.myOrders")}</Typography>
                </Stack>
                {process.env.NODE_ENV === 'development' && (
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ color: 'white' }}
                        onClick={clearOrdersOnDev}
                    >
                        
                        {t("orders.deletOrders")}
                    </Button>
                )}

                {/* ملخص الحالات */}
                <OrdersStatus
                    statusCounts={statusCounts}
                    setOrdersStatus={setOrdersStatus}
                    filterStatus={filterStatus}
                />
            </Stack>

        </Paper>
    )
}

export default OrdersHeader;