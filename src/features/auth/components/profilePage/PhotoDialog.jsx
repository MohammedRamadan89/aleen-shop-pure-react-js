import React from 'react';
import { Dialog, DialogActions, DialogContent, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PhotoDialog = ({ open, setOpen, isSmall }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant={isSmall ? "h6" : "h5"}>
          {t("auth.profile.photo_dialog.title")}
        </Typography>

        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          {t("auth.profile.photo_dialog.upload_button")}
          <input type="file" hidden />
        </Button>

        <Button variant="outlined" color="error" sx={{ mt: 2 }}>
          {t("auth.profile.photo_dialog.delete_button")}
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>
          {t("auth.profile.photo_dialog.close_button")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoDialog;
