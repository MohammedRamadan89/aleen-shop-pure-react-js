import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const AccountSettings = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {t("auth.profile.settings.title")}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {t("auth.profile.settings.change_password.title")}
        </Typography>
        <Button variant="contained" color="primary">
          {t("auth.profile.settings.change_password.button")}
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {t("auth.profile.settings.delete_account.title")}
        </Typography>
        <Button variant="outlined" color="error">
          {t("auth.profile.settings.delete_account.button")}
        </Button>
      </Box>
    </Box>
  );
};

export default AccountSettings;
