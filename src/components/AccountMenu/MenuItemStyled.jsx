import React from "react";
import { MenuItem, ListItemIcon, ListItemText, Badge } from "@mui/material";
import { MenuItemStyled as StyledItem } from "./StyledComponents";

const MenuItemStyled = ({ item, onClick, isSmallScreen }) => {
  const Icon = item.icon;

  return (
    <StyledItem onClick={onClick} danger={item.danger} isSmallScreen={isSmallScreen}>
      <ListItemIcon>
        <Badge
          badgeContent={item.badge}
          color="error"
          invisible={!item.badge}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.7rem",
              minWidth: 16,
              height: 16,
              borderRadius: 8,
            },
          }}
        >
          <Icon fontSize="small" />
        </Badge>
      </ListItemIcon>
<ListItemText
  slotProps={{
    primary: {
      sx: { fontWeight: 600, fontSize: "0.95rem" }
    },
    secondary: {
      sx: { fontSize: "0.8rem", color: "text.secondary" }
    }
  }}
  primary={item.label}
  secondary={!isSmallScreen ? item.description : undefined}
/>

    </StyledItem>
  );
};

export default MenuItemStyled;
