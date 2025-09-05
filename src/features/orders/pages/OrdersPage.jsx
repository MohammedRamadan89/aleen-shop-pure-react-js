import React, { useState, useMemo } from 'react';
import { Container, Grid } from '@mui/material';
import { LocalShipping, CheckCircle, Pending, TrackChanges } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useNotifications from '../../../common/hooks/useNotifications';
import { cancelOrder, clearOrders } from '../ordersSlice';
import OrderNotFound from '../components/OrderContent/OrderNotFound';
import OrderCard from '../components/OrdersPage/orderCard/OrderCard';
import OrdersHeader from '../components/OrdersPage/OrdersHeader';
import ConfirmDialog from '../components/OrdersPage/ConfirmDialog';
import { useTranslation } from 'react-i18next';



const OrdersPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const orders = useSelector((state) => state.orders.items);
  const notify = useNotifications();
  const { t } = useTranslation();

  // Normalize any localized or variant status strings to canonical keys
  const normalizeStatus = (status) => {
    if (!status) return 'unknown';
    const s = String(status).trim().toLowerCase();
    const map = {
      // canonical
      delivered: 'delivered',
      shipped: 'shipped',
      processing: 'processing',
      canceled: 'canceled',

      // Arabic localized labels (defensive)
      'تم التوصيل': 'delivered',
      'تم الشحن': 'shipped',
      'قيد المعالجة': 'processing',
      'تم الإلغاء': 'canceled',
    };
    return map[s] || 'unknown';
  };

  const getStatusConfig = (status) => {
    const key = normalizeStatus(status);
    switch (key) {
      case 'delivered':
        return { color: 'success', icon: <CheckCircle fontSize="small" />, bgColor: '#4caf50' };
      case 'shipped':
        return { color: 'info', icon: <LocalShipping fontSize="small" />, bgColor: '#2196f3' };
      case 'processing':
        return { color: 'warning', icon: <TrackChanges fontSize="small" />, bgColor: '#ff9800' };
      case 'canceled':
        return { color: 'error', icon: <Pending fontSize="small" />, bgColor: '#f44336' };
      default:
        return { color: 'default', icon: <Pending fontSize="small" />, bgColor: '#9e9e9e' };
    }
  };

const getPaymentMethodLabel = (method) => {
  switch (method) {
    case 'credit': return t("orders.payment.credit");
    case 'paypal': return t("orders.payment.paypal");
    default: return t("orders.payment.cod");
  }
};

  const filteredOrders = useMemo(() => {
    if (filterStatus === 'all') return orders;
    return (orders || []).filter(order => normalizeStatus(order.status) === filterStatus);
  }, [orders, filterStatus]);

  const statusCounts = useMemo(() => {
    const list = orders || [];
    const counts = {
      all: list.length,
      delivered: 0,
      shipped: 0,
      processing: 0,
      canceled: 0,
      unknown: 0,
    };
    for (const order of list) {
      const key = normalizeStatus(order.status);
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [orders]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleCancelClick = (orderId) => {
    setSelectedOrderId(orderId);
    setConfirmDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    if (selectedOrderId) {
      dispatch(cancelOrder(selectedOrderId));
      notify("info", t("notifications.cancelOrder"));
    }
    setConfirmDialogOpen(false);
    setSelectedOrderId(null);
  };

  const handleCancelClose = () => {
    setConfirmDialogOpen(false);
    setSelectedOrderId(null);
  };
  const clearOrdersOnDev = () => {
    dispatch(clearOrders())
  }
  const handleArrow = () => {
    navigate('../');
  };
  if (!orders || orders.length === 0) {
    return (

      <OrderNotFound
        title=" "
        subtitle={t("orders.orderNotFound.noOrdersYet")}
        description={t("orders.orderNotFound.noOrdersDescription")}
        buttonText={t("orders.orderNotFound.browseProducts")}
        buttonIcon
        redirectTo="/products"
        handleArrow={handleArrow}
      />
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      <OrdersHeader
        handleArrow={handleArrow}
        statusCounts={statusCounts}
        setOrdersStatus={setFilterStatus}
        filterStatus={filterStatus}
        clearOrdersOnDev={clearOrdersOnDev}
      />


      {/* Orders Grid */}
      <Grid container spacing={4}>
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);

          return (
            <OrderCard
              order={order}
              statusConfig={statusConfig}
              handleCancelClick={handleCancelClick}
              getPaymentMethodLabel={getPaymentMethodLabel}
            />
          );
        })}
      </Grid>
      <ConfirmDialog
        open={confirmDialogOpen}
        title={t("orders.dialog.title")}
        content={t("orders.dialog.content")}
        onClose={handleCancelClose}
        onConfirm={handleCancelConfirm}
      />

    </Container>

  );
};

export default OrdersPage;