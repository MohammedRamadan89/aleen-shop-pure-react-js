import React from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const PersonalInfoForm = ({ userData, setUserData, editMode, setEditMode, personalInfoRef }) => {
  const { t } = useTranslation();

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <Box ref={personalInfoRef}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {t("auth.profile.personal_info.title")}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs:12, md:6 }} >
          <TextField
            label={t("auth.profile.personal_info.fields.name")}
            fullWidth
            value={userData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={!editMode}
          />
        </Grid>
        <Grid size={{ xs:12, md:6 }} >
          <TextField
            label={t("auth.profile.personal_info.fields.email")}
            fullWidth
            value={userData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={!editMode}
          />
        </Grid>
        <Grid size={{ xs:12, md:6 }} >
          <TextField
            label={t("auth.profile.personal_info.fields.phone")}
            fullWidth
            value={userData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            disabled={!editMode}
          />
        </Grid>
        <Grid size={{ xs:12, md:6 }} >
          <TextField
            label={t("auth.profile.personal_info.fields.address")}
            fullWidth
            value={userData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            disabled={!editMode}
          />
        </Grid>
      </Grid>

      {editMode && (
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {t("auth.profile.personal_info.buttons.save")}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
            {t("auth.profile.personal_info.buttons.cancel")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PersonalInfoForm;
