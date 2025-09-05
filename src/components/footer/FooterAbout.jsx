import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const FooterAbout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        {t("footer.about.title")}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, mt: 2 }}>
        {t("footer.about.description")}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <IconButton aria-label="Facebook" color="inherit"><Facebook /></IconButton>
        <IconButton aria-label="Twitter" color="inherit"><Twitter /></IconButton>
        <IconButton aria-label="Instagram" color="inherit"><Instagram /></IconButton>
        <IconButton aria-label="LinkedIn" color="inherit"><LinkedIn /></IconButton>
      </Box>
    </>
  );
};

export default FooterAbout;
