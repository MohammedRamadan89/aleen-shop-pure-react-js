// src/pages/components/ProductPagination.jsx
import { Box, Stack, Pagination, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
const ProductPagination = ({
  totalPages, currentPage, setCurrentPage,
  indexOfFirstProduct, indexOfLastProduct, totalProducts, productsRef, isSmallScreen
}) => {
  const { t } = useTranslation();
  return (
  totalPages > 1 && (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Stack spacing={3} alignItems="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value);
            productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          color="primary"
          size={isSmallScreen ? "medium" : "large"}
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: 2,
              fontWeight: 600,
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #1976d2)'
                }
              }
            }
          }}
        />
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ fontWeight: 500 }}
          >
            {t("products.showingProducts", {
              start: indexOfFirstProduct + 1,
              end: Math.min(indexOfLastProduct, totalProducts),
              total: totalProducts,
            })}
          </Typography>

        </Paper>
      </Stack>
    </Box>
  )
)};

export default ProductPagination;
