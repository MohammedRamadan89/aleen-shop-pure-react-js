import React from "react";
import { Box, Typography, Paper, Badge } from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Favorite } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const HeaderCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(3),
  position: "relative",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
}));

const FavoritesHeader = ({ count }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <HeaderCard sx={{ mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight={800}>
            {t("favorites.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("favorites.count", { count })}
          </Typography>
        </Box>
        <Badge badgeContent={count} color="primary" max={99}>
          <Favorite sx={{ fontSize: "2.5rem", color: theme.palette.primary.main }} />
        </Badge>
      </Box>
    </HeaderCard>
  );
};

export default FavoritesHeader;
