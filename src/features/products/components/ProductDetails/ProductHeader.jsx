import React from 'react';
import { Stack, IconButton, Typography, Paper, alpha } from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorder, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ProductHeader = ({ product, isFavorite, setIsFavorite }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 4, 
        background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        borderRadius: 3
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
            borderRadius: 2
          }}
        >
          <ArrowBack />
        </IconButton>
        
        <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
          <Typography variant="body2" color="text.secondary">{t("products.productDetails.breadcrumbs.home")}</Typography>
          <Typography variant="body2" color="text.secondary">/</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {product.mainCategory}
          </Typography>
          <Typography variant="body2" color="text.secondary">/</Typography>
          <Typography variant="body2" color="primary.main" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
            {product.category}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => setIsFavorite(!isFavorite)}
            sx={{ 
              color: isFavorite ? 'error.main' : 'text.secondary',
              '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) }
            }}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
            <Share />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProductHeader;
