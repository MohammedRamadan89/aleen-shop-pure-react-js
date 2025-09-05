import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Avatar, Typography, Chip, Fade, Grow, alpha, IconButton, useTheme } from '@mui/material';
import { Celebration, ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SuccessHeader = ({ order, handleGoBack }) => {
  const theme = useTheme();
  const { t } = useTranslation(); // Hook لاستخدام الترجمة

  // Add safety check for order
  if (!order || !order.id) {
    return null;
  }

  return (
    <Fade in timeout={800}>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleGoBack}
          sx={{
            position: 'absolute',
            top: { xs: 10, md: 20 },
            left: { xs: 5, md: 20 },
            color: 'text.primary',
            zIndex: 1,
          }}
          aria-label={t('orders.orderConfirmation.back')}
        >
          <ArrowBack sx={{ color: '#fff' }} />
          <Typography sx={{ color: '#fff', ml: 2 }}>{t('orders.orderConfirmation.backToHome')}</Typography>
        </IconButton>

        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 6,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
            color: 'white',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              left: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: alpha('#fff', 0.1),
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -80,
              right: -80,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: alpha('#fff', 0.05),
              zIndex: 0,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Grow in timeout={1000}>
              <Avatar
                sx={{
                  bgcolor: alpha('#fff', 0.2),
                  width: 120,
                  height: 120,
                  margin: '0 auto 24px',
                  border: `4px solid ${alpha('#fff', 0.3)}`,
                }}
              >
                <Celebration sx={{ fontSize: 64 }} />
              </Avatar>
            </Grow>

            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              {t('orders.orderConfirmation.successMessage')}
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.95, mb: 4 }}>
              {t('orders.orderConfirmation.orderConfirmed')}
            </Typography>

            <Chip
              label={`${t('orders.orderConfirmation.orderNumber')}: #${order.id}`}
              sx={{
                bgcolor: alpha('#fff', 0.2),
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 700,
                px: 3,
                py: 2,
                height: 'auto',
                border: `2px solid ${alpha('#fff', 0.3)}`,
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

SuccessHeader.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SuccessHeader;
