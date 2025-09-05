import { styled, alpha } from "@mui/material/styles";
import { IconButton, Avatar, Menu, MenuItem, Box, Badge } from "@mui/material";

// زر الحساب
export const StyledIconButton = styled(IconButton)(({ theme, open }) => ({
  position: "relative",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(0.5),
  background: open
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`
    : "transparent",
  border: `2px solid ${open ? theme.palette.primary.main : "transparent"}`,
}));

// الصورة
export const StyledAvatar = styled(Avatar)(({ theme, online }) => ({
  width: 28,
  height: 28,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  border: `2px solid ${theme.palette.background.paper}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  position: 'relative',
  color: theme.palette.common.white,
  '&::after': online ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: theme.palette.success.main,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.success.main, 0.4)}`,
  } : {}
}));

// القائمة
export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 280,
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(2),
    background: `linear-gradient(145deg, 
      ${theme.palette.background.paper} 0%, 
      ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
    boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -8,
      right: 20,
      width: 16,
      height: 16,
      background: theme.palette.background.paper,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
      borderBottom: 'none',
      borderRight: 'none',
      transform: 'rotate(45deg)',
    }
  },
  '& .MuiMenuItem-root': {
    padding: theme.spacing(1.5, 2),
    margin: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1.5),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      background: `linear-gradient(135deg, 
        ${alpha(theme.palette.primary.main, 0.08)}, 
        ${alpha(theme.palette.secondary.main, 0.08)})`,
      transform: 'translateX(4px)',
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
    }
  }
}));

// العنصر
export const MenuItemStyled = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "isSmallScreen" && prop !== "danger",
})(({ theme, isSmallScreen, danger }) => ({
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1.5),
  transition: "all 0.2s ease-in-out",
  fontSize: isSmallScreen ? "0.85rem" : "1rem", // استعمل isSmallScreen هنا
  color: danger ? theme.palette.error.main : theme.palette.text.primary,
  "&:hover": {
    background: danger
      ? alpha(theme.palette.error.main, 0.08)
      : `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.08
        )}, ${alpha(theme.palette.secondary.main, 0.08)})`,
    transform: "translateX(4px)",
    boxShadow: danger
      ? `0 4px 12px ${alpha(theme.palette.error.main, 0.15)}`
      : `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
  "& .MuiListItemIcon-root": {
    color: danger ? theme.palette.error.main : theme.palette.primary.main,
    minWidth: 40,
  },
}));

// بوكس بيانات المستخدم
export const UserSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 2, 1.5, 2),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.05)}, 
    ${alpha(theme.palette.secondary.main, 0.05)})`,
  borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '1px',
    background: `linear-gradient(90deg, 
      transparent, 
      ${alpha(theme.palette.primary.main, 0.3)}, 
      transparent)`,
  }
}));

// شارة الإشعارات
export const NotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.light})`,
    color: theme.palette.error.contrastText,
    fontWeight: 700,
    fontSize: '0.75rem',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    transform: 'scale(1)',
    transition: 'none',
  }
}));
