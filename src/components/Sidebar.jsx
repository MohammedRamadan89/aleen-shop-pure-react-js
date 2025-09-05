// src/components/Sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Category as CategoriesIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Storefront as StoreIcon,
  LocalOffer as OffersIcon,
  Payment as PaymentIcon,
  Support as SupportIcon,
  Assessment as ReportsIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const Sidebar = ({ sideBarOpen, handleDrawerClose }) => {
  const { t } = useTranslation();

  // قائمة العناصر الرئيسية
  const mainMenuItems = [
    { text: t("sideBar.dashboard"), icon: <DashboardIcon />, path: "/dashboard" },
    { text: t("sideBar.products"), icon: <ProductsIcon />, path: "/products" },
    { text: t("sideBar.categories"), icon: <CategoriesIcon />, path: "/categories" },
    { text: t("sideBar.orders"), icon: <OrdersIcon />, path: "/orders" },
  ];

  // قائمة إدارة العملاء والمبيعات
  const salesMenuItems = [
    { text: t("sideBar.customers"), icon: <CustomersIcon />, path: "/customers" },
    { text: t("sideBar.offers"), icon: <OffersIcon />, path: "/offers" },
    { text: t("sideBar.payments"), icon: <PaymentIcon />, path: "/payments" },
    { text: t("sideBar.reports"), icon: <ReportsIcon />, path: "/reports" },
  ];

  // قائمة الإعدادات والدعم
  const systemMenuItems = [
    { text: t("sideBar.storeSettings"), icon: <StoreIcon />, path: "/store-settings" },
    { text: t("sideBar.analytics"), icon: <AnalyticsIcon />, path: "/analytics" },
    { text: t("sideBar.support"), icon: <SupportIcon />, path: "/support" },
    { text: t("sideBar.settings"), icon: <SettingsIcon />, path: "/settings" },
  ];

  const renderMenuItems = (items) =>
    items.map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton
          sx={{
            borderRadius: 1,
            mx: 1,
            mb: 0.5,
            "&:hover": {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "0.9rem",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    ));

  const drawerContent = (
    <Box onClick={handleDrawerClose}>
      <Divider />

      {/* القسم الرئيسي */}
      <Box sx={{ px: 1, py: 1 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: "text.secondary",
            fontWeight: "bold",
            fontSize: "0.75rem",
          }}
        >
          {t("sideBar.sections.main")}
        </Typography>
        <List sx={{ py: 0.5 }}>{renderMenuItems(mainMenuItems)}</List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* قسم المبيعات والعملاء */}
      <Box sx={{ px: 1, py: 1 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: "text.secondary",
            fontWeight: "bold",
            fontSize: "0.75rem",
          }}
        >
          {t("sideBar.sections.sales")}
        </Typography>
        <List sx={{ py: 0.5 }}>{renderMenuItems(salesMenuItems)}</List>
      </Box>

      <Divider sx={{ mx: 2 }} />
      {/* قسم النظام والإعدادات */}
      <Box sx={{ px: 1, py: 1 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: "text.secondary",
            fontWeight: "bold",
            fontSize: "0.75rem",
          }}
        >
          {t("sideBar.sections.system")}
        </Typography>
        <List sx={{ py: 0.5 }}>{renderMenuItems(systemMenuItems)}</List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={sideBarOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true,
        disableScrollLock: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          mt: "128px",
          backgroundColor: "#fafafa",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  sideBarOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default Sidebar;
