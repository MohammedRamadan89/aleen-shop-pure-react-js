import React from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import {
  Notifications as NotificationsIcon,
  DoneAll as DoneAllIcon,
  ClearAll as ClearAllIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const NotificationsHeader = ({ markAllRead, clearAll }) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
          <NotificationsIcon />
        </Avatar>
        <div>
          <Typography variant="h5">{t("notifications.header.title")}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t("notifications.header.subtitle")}
          </Typography>
        </div>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Button
          variant="outlined"
          startIcon={<DoneAllIcon />}
          onClick={markAllRead}
        >
          {t("notifications.header.mark_all_read")}
        </Button>
        <IconButton onClick={clearAll} title={t("notifications.header.clear_all")}>
          <ClearAllIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NotificationsHeader;
