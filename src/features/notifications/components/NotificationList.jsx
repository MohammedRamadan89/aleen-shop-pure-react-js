import React from "react";
import { List } from "@mui/material";
import NotificationItem from "./NotificationItem";

const NotificationsList = ({
  items,
  toggleRead,
  handleMenuOpen,
  handleMenuClose,
  removeNotification,
  activeMenuId,
  anchorEl,
}) => (
  <List disablePadding>
    {items.map((n) => (
      <NotificationItem
        key={n.id}
        n={n}
        toggleRead={toggleRead}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        removeNotification={removeNotification}
        activeMenuId={activeMenuId}
        anchorEl={anchorEl}
      />
    ))}
  </List>
);

export default NotificationsList;
