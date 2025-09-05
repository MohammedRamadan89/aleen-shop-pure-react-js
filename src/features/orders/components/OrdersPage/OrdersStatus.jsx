import React from 'react';
import { Chip, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const OrdersStatus = ({ statusCounts, setOrdersStatus, filterStatus }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation();
    const items = [
        { key: 'all', label: t("orders.common.all") },
        { key: 'processing', label: t("orders.status.processing") },
        { key: 'shipped', label: t("orders.status.shipped") },
        { key: 'delivered', label: t("orders.status.delivered") },
        { key: 'canceled', label: t("orders.status.canceled") },
    ];

    return (
        <Stack direction={isSmallScreen ? "column" : "row"} spacing={1} flexWrap="wrap">
            {items.map(({ key, label }) => (
                <Chip
                    key={key}
                    label={`${label} (${key === 'all' ? statusCounts.all : (statusCounts[key] ?? 0)})`}
                    onClick={() => setOrdersStatus(key)}
                    color={filterStatus === key ? 'secondary' : 'default'}
                    variant={filterStatus === key ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 600 }}
                />
            ))}
        </Stack>
    )
}

export default OrdersStatus;