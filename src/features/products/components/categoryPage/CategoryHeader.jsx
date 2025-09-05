import { Box, Typography, Chip, Breadcrumbs, Link } from "@mui/material";
import { NavigateNext, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CategoryHeader = ({ title, description, productCount, isSmallScreen, breadcrumb }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ mb: 6 }}>
      {/* Breadcrumb Navigation */}
      {breadcrumb && breadcrumb.length > 1 && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Breadcrumbs 
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              '& .MuiBreadcrumbs-separator': { color: 'text.secondary' }
            }}
          >
            {breadcrumb.map((item, index) => (
              <Link
                key={index}
                color={index === breadcrumb.length - 1 ? "text.primary" : "text.secondary"}
                underline="hover"
                onClick={() => handleBreadcrumbClick(item.path)}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                {index === 0 && <Home fontSize="small" />}
                {item.label}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>
      )}

      {/* Title and Description */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant={isSmallScreen ? "h4" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
          {description}
        </Typography>
        <Chip
          label={`${t("products.available")} : ${productCount}`}
          color="primary"
          variant="outlined"
          size="large"
          sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 0.5 }}
        />
      </Box>
    </Box>
  );
};

export default CategoryHeader;
