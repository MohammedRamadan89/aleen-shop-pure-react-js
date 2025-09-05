import React from 'react';
import { Container, Paper, Typography, Button, IconButton, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

/**
 * Generic NotFound component
 * 
 * Props:
 * - title, subtitle, description, buttonText, buttonIcon, redirectTo, handleArrow
 */
const OrderNotFound = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonIcon,
  redirectTo = "/",
  handleArrow
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <IconButton
        onClick={handleArrow}
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 32 },
          left: { xs: 16, md: 32 },
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
          borderRadius: 2
        }}
      >
        <ArrowBack />
      </IconButton>

      <Paper
        elevation={0}
        sx={{
          p: 8,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.1)} 100%)`,
          borderRadius: 4
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          {title || t('orders.orderNotFound.errorTitle')}
        </Typography>
        <Typography variant="h5" color="error.main" gutterBottom fontWeight={600}>
          {subtitle || t('orders.orderNotFound.errorSubtitle')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          {description || t('orders.orderNotFound.errorDescription')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={buttonIcon}
          onClick={() => navigate(redirectTo)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          {buttonText || t('orders.orderNotFound.backToHome')}
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderNotFound;
