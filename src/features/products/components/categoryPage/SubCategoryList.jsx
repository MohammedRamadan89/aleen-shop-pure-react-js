import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { Category } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import products from '../../components/data';
import { useTranslation } from 'react-i18next';

const SubCategoryList = ({ mainCategory }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // الحصول على الفئات الفرعية الفريدة للفئة الرئيسية
  const subCategories = React.useMemo(() => {
    const uniqueSubCategories = [...new Set(
      products
        .filter(product => product.mainCategory === mainCategory)
        .map(product => product.category)
    )];
    
    return uniqueSubCategories.sort();
  }, [mainCategory]);

  const handleSubCategoryClick = (subCategory) => {
    navigate(`/category/${mainCategory}/${subCategory}`);
  };

  if (!subCategories.length) return null;

  return (
    <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Category color="primary" />
        {t("products.subcategory.subcategoryTitle")}
      </Typography>
      
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {subCategories.map((subCategory) => (
          <Chip
            key={subCategory}
            label={subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
            onClick={() => handleSubCategoryClick(subCategory)}
            variant="outlined"
            color="primary"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SubCategoryList;
