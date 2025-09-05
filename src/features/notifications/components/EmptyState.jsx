import React from "react";
import { Box, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useTranslation } from "react-i18next";

const EmptyState = () => {
  const { t } = useTranslation("notifications");

  return (
    <Box textAlign="center" py={6}>
      <NotificationsNoneIcon sx={{ fontSize: 48, mb: 1 }} color="disabled" />
      <Typography variant="h6">{t("empty_state.title")}</Typography>
      <Typography color="text.secondary">{t("empty_state.subtitle")}</Typography>
    </Box>
  );
};

export default EmptyState;
