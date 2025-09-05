import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FooterBottom = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid>
        <Typography variant="body2">
          {t("footer.bottom.rights", { year: currentYear })}
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="body2">
          {t("footer.bottom.payments")}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FooterBottom;
