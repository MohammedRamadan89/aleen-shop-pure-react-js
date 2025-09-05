// src/components/footer/FooterLinks.jsx
import React from "react";
import { Typography, List, ListItem, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

const FooterLinks = ({ titleKey, links }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        {t(titleKey)}
      </Typography>
      <List dense>
        {links.map((item) => (
          <ListItem key={item.href} disableGutters>
            <Link
              href={item.href}
              color="inherit"
              underline="hover"
              variant="body2"
            >
              {t(item.textKey)}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FooterLinks;
