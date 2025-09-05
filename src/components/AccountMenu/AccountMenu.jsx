import React, { useState } from "react";
import { Fade, Badge, Divider, Tooltip } from "@mui/material";
import { AccountCircle, KeyboardArrowDown, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

import { StyledIconButton, StyledMenu } from "./StyledComponents";
import MenuItemStyled from "./MenuItemStyled";
import UserSection from "./UserSection";
import { menuItems, secondaryItems } from "./menuConfig";

const AccountMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
const { t } = useTranslation();

  // بيانات وهمية للمستخدم
  const userData = {
    name: "Mohammed Ram",
    email: "work.ram88@gmail.com",
    avatar: "",
    isOnline: true,
    membershipLevel: "VIP",
  };

  const handleMenuOpen = (event) => {
    if (isSmallScreen) navigate("/profile");
    else setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    console.log("Logging out...");
    handleMenuClose();
  };

  return (
    <>
      {/* الزر اللي يفتح القائمة */}
      <Tooltip title={open ? "" : t("my account")} arrow placement="bottom">
        <StyledIconButton
          onClick={handleMenuOpen}
          open={open}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={5} color="error">
            <AccountCircle sx={{ fontSize: 28, color: "white" }} />
          </Badge>

          {!isSmallScreen && (
            <KeyboardArrowDown
              sx={{
                ml: 0.5,
                fontSize: 16,
                transition: "transform 0.2s",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          )}
        </StyledIconButton>
      </Tooltip>

      {/* القائمة */}
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock={true}
      >
        {/* بيانات المستخدم */}
        <UserSection userData={userData} />

        {/* العناصر الأساسية */}
{menuItems.map((item, i) => (
  <MenuItemStyled
    key={i}
    item={{
      ...item,
      label: t(item.labelKey),
      description: !isSmallScreen ? t(item.descriptionKey) : undefined,
    }}
    isSmallScreen={isSmallScreen}
    onClick={() => handleNavigate(item.path)}
  />
))}


        <Divider sx={{ my: 1, mx: 2 }} />

        {/* العناصر الثانوية */}
{secondaryItems.map((item, i) => (
  <MenuItemStyled
    key={i}
    item={{
      ...item,
      label: t(item.labelKey),
      description: !isSmallScreen ? t(item.descriptionKey) : undefined,
    }}
    isSmallScreen={isSmallScreen}
    onClick={() => handleNavigate(item.path)}
  />
))}


        <Divider sx={{ my: 1, mx: 2 }} />

        {/* تسجيل الخروج */}
        <MenuItemStyled
          item={{
            icon: Logout,
            label: t("navBar.logout"),
            danger: true,
          }}
          onClick={handleLogout}
        />
      </StyledMenu>
    </>
  );
};

export default AccountMenu;
