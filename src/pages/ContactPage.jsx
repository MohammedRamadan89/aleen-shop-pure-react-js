import React from "react";
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ py: 5, mt:5 }}>
      <Typography variant="h4" gutterBottom align="center">
        {t("common.contact.title")}
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        {t("common.contact.description")}
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid size={{ xs:12, sm:6 }}>
            <TextField fullWidth label={t("common.contact.name")} variant="outlined" />
          </Grid>
          <Grid size={{ xs:12, sm:6 }}>
            <TextField fullWidth label={t("common.contact.email")} variant="outlined" />
          </Grid>
          <Grid size={{ xs:12}}>
            <TextField fullWidth label={t("common.contact.subject")} variant="outlined" />
          </Grid>
          <Grid size={{ xs:12}}>
            <TextField
              fullWidth
              label={t("common.contact.message")}
              variant="outlined"
              multiline
              rows={5}
            />
          </Grid>
          <Grid size={{ xs:12}}>
            <Button variant="contained" color="primary">
              {t("common.contact.sendButton")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
