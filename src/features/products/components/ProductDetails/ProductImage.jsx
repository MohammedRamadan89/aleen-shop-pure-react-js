import React from 'react';
import { Card, Box, Chip, Fade, Zoom ,Grid} from '@mui/material';
import { NewReleases, LocalOffer } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ProductImage = ({ product, theme }) => {
  const { t } = useTranslation();
  return (
        <Grid size={{ xs: 12, md: 6 }}>
          <Fade in timeout={800}>
            <Card 
              elevation={3}
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {product.isNew && (
                <Zoom in timeout={1000}>
                  <Chip
                    icon={<NewReleases />}
                    label={t("products.productCard.newProduct")}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      zIndex: 2,
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  />
                </Zoom>
              )}
              
              {product.discount > 0 && (
                <Chip
                  icon={<LocalOffer />}
                  label={`${t("products.productCard.discount")} ${product.discount}%`}
                  color="success"
                  sx={{
                    position: 'absolute',
                    top: product.isNew ? 70 : 20,
                    left: 20,
                    zIndex: 2,
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                />
              )}

              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 400, md: 600 },
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Card>
          </Fade>
        </Grid>
  );
};

export default ProductImage;
