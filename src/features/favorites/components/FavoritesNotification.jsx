import React from "react";
import { Snackbar, Alert } from "@mui/material";

const FavoritesNotification = ({ notification, onClose }) => {
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={notification.severity} variant="filled" onClose={onClose}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default FavoritesNotification;
