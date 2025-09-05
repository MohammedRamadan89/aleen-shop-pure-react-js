import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, Box, Typography, CardMedia, Chip,
  CardContent, CardActions, Button, IconButton, Rating
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useTranslation } from 'react-i18next';
/**
 * ProductCard component displays a product's image, details, and actions
 * such as adding/removing from cart, favoriting, and previewing.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.product - The product data to display
 * @param {string} props.product.id - Unique identifier for the product
 * @param {string} props.product.name - Name of the product
 * @param {string} props.product.description - Short description of the product
 * @param {string} [props.product.category] - Category name for the product
 * @param {string} props.product.image - URL of the product image
 * @param {boolean} [props.product.isNew] - Whether the product is new
 * @param {boolean} [props.product.inStock] - Whether the product is available in stock
 * @param {number} [props.product.discount] - Discount percentage on the product
 * @param {number} props.product.price - Current price of the product
 * @param {number} [props.product.originalPrice] - Original price before discount
 * @param {number} [props.product.rating] - Average product rating (0-5)
 * @param {number} [props.product.reviewCount] - Number of product reviews
 *
 * @param {boolean} [props.isFavorite=false] - Whether the product is marked as favorite
 * @param {boolean} props.isInCart - Whether the product is currently in the cart
 * @param {Function} props.onAddToCart - Callback when the product is added to the cart
 * @param {Function} props.onRemoveFromCart - Callback when the product is removed from the cart
 * @param {Function} props.onToggleFavorite - Callback when toggling product favorite status
 * @param {Function} props.onPreview - Callback when requesting a preview of the product
 *
 * @returns {JSX.Element} The rendered product card component
 */
const ProductCard = ({
  product,
  isFavorite = false,
  isInCart,
  onAddToCart,
  onRemoveFromCart,
  onToggleFavorite,
  onPreview
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  /**
   * State for tracking whether the "Add to Cart" button is hovered.
   * @type {[boolean, Function]}
   */
  const [hovered, setHovered] = useState(false);

  /**
   * State for tracking image load errors.
   * @type {[boolean, Function]}
   */
  const [imageLoadError, setImageLoadError] = useState(new Set());

  /**
   * Handles image loading errors by marking the product image as failed to load.
   * @param {string} id - The product ID whose image failed to load
   * @returns {void}
   */
  const handleImageError = (id) => {
    setImageLoadError((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });

  };

  /**
   * Handles adding or removing the product from the cart based on its current state.
   * @returns {void}
   */
  const handleCartAction = () => {
    if (isInCart) {
      onRemoveFromCart?.(product);
    } else {
      onAddToCart?.(product);
    }
  };

  /**
   * Handles clicking on the category chip to navigate to the subcategory page
   * @returns {void}
   */
  const handleCategoryClick = () => {
    navigate(`/category/${product.mainCategory}/${product.category}`);
  };

  return (
    <Card
      sx={{
        height: 520,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
        boxShadow: 1,
        transition: 'transform 0.3s, box-shadow 0.3s',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          borderColor: 'primary.main',
        },
        bgcolor: 'background.paper',
      }}
    >
      {/* Product labels (badges) */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {product.isNew && (
          <Chip label={t("products.productCard.newProduct")} size="small" sx={{ background: 'linear-gradient(135deg, #4caf50, #45a049)', color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />
        )}
        {product.discount > 0 && (
          <Chip label={`-${product.discount}%`} size="small" sx={{ background: 'linear-gradient(135deg, #f44336, #d32f2f)', color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />
        )}
        {!product.inStock && (
          <Chip label={t("products.productCard.outOfStock").toUpperCase()} size="small" sx={{ bgcolor: 'grey.600', color: 'white', fontWeight: 700, fontSize: '0.6rem' }} />
        )}
      </Box>

      {/* Action buttons (favorite, preview) */}
      <Box sx={{
        position: 'absolute', top: 12, right: 12, zIndex: 20,
        display: 'flex', flexDirection: 'column', gap: 1,
        opacity: 0, transition: 'opacity 0.3s',
        '.MuiCard-root:hover &': { opacity: 1 }
      }}>
        <IconButton size="small" onClick={() => onToggleFavorite?.(product)} sx={{
          bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
          color: isFavorite ? 'error.main' : 'text.secondary',
          '&:hover': {
            bgcolor: isFavorite ? 'error.main' : 'primary.main',
            color: 'white', transform: 'scale(1.1)'
          }, transition: 'all 0.2s'
        }}>
          {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
        <IconButton size="small" onClick={() => onPreview?.(product)} sx={{
          bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
          color: 'text.secondary', '&:hover': {
            bgcolor: 'info.main', color: 'white', transform: 'scale(1.1)'
          }, transition: 'all 0.2s'
        }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Product image */}
      <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', bgcolor: 'grey.50' }}>
        {imageLoadError.has(product.id) ? (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', color: 'grey.500', flexDirection: 'column' }}>
            <LocalOfferIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="caption">No Image</Typography>
          </Box>
        ) : (
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name.replace(/"/g, '')}
            onError={() => handleImageError(product.id)}
            sx={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              '.MuiCard-root:hover &': { transform: 'scale(1.08)' }
            }}
          />
        )}
      </Box>

      {/* Product details */}
      <CardContent sx={{
        flexGrow: 1, px: 3, py: 2.5,
        display: 'flex', flexDirection: 'column',
        height: 'calc(100% - 200px - 70px)', justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="h6" component="h3" sx={{
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden', textOverflow: 'ellipsis',
            lineHeight: '1.3em', height: '2.6em', fontWeight: 700, mb: 1.5, color: 'text.primary'
          }}>
            {product.name}
          </Typography>

          {product.category && (
            <Chip 
              label={product.category} 
              size="small" 
              onClick={handleCategoryClick}
              sx={{
                mb: 1.5, 
                alignSelf: 'flex-start', 
                fontSize: '0.65rem', 
                height: '22px',
                bgcolor: 'primary.light', 
                color: 'primary.contrastText',
                cursor: 'pointer',
                '& .MuiChip-label': { px: 1 },
                '&:hover': {
                  bgcolor: 'primary.main',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out'
                }
              }} 
            />
          )}

          <Typography variant="body2" color="text.secondary" sx={{
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden', textOverflow: 'ellipsis',
            height: '2.4em', mb: 1.5, lineHeight: 1.2
          }}>
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, height: '24px' }}>
            <Rating name={`rating-${product.id}`} value={product.rating || 0} precision={0.1} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }} />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1, fontWeight: 500 }}>
              ({product.reviewCount || 0})
            </Typography>
          </Box>
        </Box>

        {/* Product price */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 0.5 }}>
              <Typography variant="h5" sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                ${product.price.toFixed(2)}
              </Typography>

              {product.originalPrice && product.originalPrice > product.price && (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: '-0.9em',
                    left: 0,
                    fontSize: '0.7rem',
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                    fontWeight: 500
                  }}
                >
                  ${product.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Box>

            {product.discount > 0 && (
              <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                {t("products.productCard.save")} ${(product.originalPrice - product.price).toFixed(2)}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>

      {/* Add to cart button */}
      <CardActions sx={{ px: 3, pb: 3, pt: 0, height: 70 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          fullWidth
          disabled={!product.inStock}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleCartAction}
          sx={{
            borderRadius: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(product.inStock
              ? isInCart
                ? hovered
                  ? {
                    background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                    color: 'white'
                  }
                  : {
                    background: 'linear-gradient(135deg, #66bb6a 0%, #81c784 100%)',
                    color: 'white'
                  }
                : {
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
                }
              : {
                bgcolor: 'grey.300',
                color: 'grey.600'
              })
          }}
        >
          {!product.inStock
            ? t("products.productCard.outOfStock")
            : isInCart
              ? hovered
                ? t("products.productCard.remove")
                : t("products.productCard.added")
              : t("products.productCard.addToCart")}
        </Button>
      </CardActions>
    </Card>
  );
};

// ✅ تغليف React.memo
export default React.memo(ProductCard);
