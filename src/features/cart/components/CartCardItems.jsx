import {
  Box, Typography, IconButton, Card, CardContent, CardMedia, Chip, useTheme, Stack
} from '@mui/material';
import { Delete, Remove, Add } from '@mui/icons-material';
import { useTranslation } from "react-i18next";

const CartCardItems = ({ item, handleRemoveItem, handleQuantityChange }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      key={item.itemKey || item.id}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
        '&:hover': {
          boxShadow: theme.shadows[4]
        },
        transition: 'all 0.3s ease'
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{
          width: { xs: '100%', sm: 120 },
          height: { xs: 180, sm: 120 },
          objectFit: 'cover'
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <CardContent sx={{ p: 0, flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${item.price.toFixed(2)}
            </Typography>
            {(item.selectedSize || item.selectedColor) && (
              <Stack direction="row" spacing={1} mt={1}>
                {item.selectedSize && (
                  <Chip
                    label={`${t("cart.cartItems.size")}: ${item.selectedSize}`}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                )}
                {item.selectedColor && (
                  <Chip
                    label={`${t("cart.cartItems.color")}: ${t(`products.colors.${item.selectedColor}`)}`}
                    size="small"
                    variant="outlined"
                    color="info"
                  />
                )}
              </Stack>
            )}
          </CardContent>
          <IconButton
            color="error"
            onClick={() => handleRemoveItem(item)}
            aria-label={t("cart.cartItems.removeItem", { name: item.name })}
          >
            <Delete />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1
            }}
          >
            <IconButton
              size="small"
              onClick={handleQuantityChange}
              disabled={item.quantity <= 1}
              aria-label={t("cart.cartItems.decrease")}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography variant="body1" sx={{ px: 1.5 }}>
              {item.quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={handleQuantityChange}
              aria-label={t("cart.cartItems.increase")}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="subtitle1" fontWeight={600}>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default CartCardItems;
