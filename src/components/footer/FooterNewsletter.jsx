import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const FooterNewsletter = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="body2" gutterBottom>
        {t("footer.newsletter.title")}
      </Typography>
      <Box component="form" sx={{ display: "flex" }}>
        <input
          type="email"
          placeholder={t("footer.newsletter.placeholder")}
          style={{
            flexGrow: 1,
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px 0 0 4px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
          }}
        >
          {t("footer.newsletter.button")}
        </button>
      </Box>
    </Box>
  );
};

export default FooterNewsletter;
