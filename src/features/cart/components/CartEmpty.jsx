import { Box, Typography, IconButton, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CartEmpty = ({ handleGoBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        p: 3
      }}
    >
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: 'absolute',
          top: { xs: 10, md: 20 },
          left: { xs: 5, md: 20 },
          color: 'text.primary',
          zIndex: 1,
        }}
        aria-label={t("cart.cartEmpty.goBack")}
      >
        <ArrowBack />
      </IconButton>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        {t("cart.cartEmpty.emptyTitle")}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t("cart.cartEmpty.emptyMessage")}
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          fontWeight: 600
        }}
      >
        {t("cart.cartEmpty.browse")}
      </Button>
    </Box>
  );
};

export default CartEmpty;
