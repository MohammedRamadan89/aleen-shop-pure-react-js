import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const FooterContact = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        {t("footer.contact.title")}
      </Typography>
      <List dense>
        <ListItem disableGutters>
          <LocationOn sx={{ mr: 1 }} />
          <ListItemText
            primary={<Typography variant="body2">{t("footer.contact.address")}</Typography>}
          />
        </ListItem>
        <ListItem disableGutters>
          <Phone sx={{ mr: 1 }} />
          <ListItemText
            primary={<Typography variant="body2">{t("footer.contact.phone")}</Typography>}
          />
        </ListItem>
        <ListItem disableGutters>
          <Email sx={{ mr: 1 }} />
          <ListItemText
            primary={<Typography variant="body2">{t("footer.contact.email")}</Typography>}
          />
        </ListItem>
      </List>
    </>
  );
};

export default FooterContact;
