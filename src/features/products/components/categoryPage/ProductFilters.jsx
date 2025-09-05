import React from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const ProductFilters = ({ searchTerm, setSearchTerm, sortBy, setSortBy, filterBy, setFilterBy }) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* 🔎 Search */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder={t("products.filters.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  "&:hover": { boxShadow: 1 },
                },
              },
            }}
          />
        </Grid>

        {/* 🔽 Sort By */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                mt: -1.5,
                px: 0.5,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SortIcon fontSize="small" />
                {t("products.filters.sortBy")}
              </Box>
            </InputLabel>
            <Select
              value={sortBy}
              label={t("products.filters.sortBy")}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{
                borderRadius: 3,
                bgcolor: "background.paper",
                "&:hover": { boxShadow: 1 },
              }}
            >
              <MenuItem value="name">{t("products.filters.sort.name")}</MenuItem>
              <MenuItem value="priceLow">{t("products.filters.sort.priceLow")}</MenuItem>
              <MenuItem value="priceHigh">{t("products.filters.sort.priceHigh")}</MenuItem>
              <MenuItem value="rating">{t("products.filters.sort.rating")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* 🔽 Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                mt: -1.5,
                px: 0.5,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FilterListIcon fontSize="small" />
                {t("products.filters.filter")}
              </Box>
            </InputLabel>
            <Select
              value={filterBy}
              label={t("products.filters.filter")}
              onChange={(e) => setFilterBy(e.target.value)}
              sx={{
                borderRadius: 3,
                bgcolor: "background.paper",
                "&:hover": { boxShadow: 1 },
              }}
            >
              <MenuItem value="all">{t("products.filters.all")}</MenuItem>
              <MenuItem value="under50">{t("products.filters.under50")}</MenuItem>
              <MenuItem value="50to100">{t("products.filters.50to100")}</MenuItem>
              <MenuItem value="over100">{t("products.filters.over100")}</MenuItem>
              <MenuItem value="highRated">{t("products.filters.highRated")}</MenuItem>
              <MenuItem value="inStock">{t("products.filters.inStock")}</MenuItem>
              <MenuItem value="onSale">{t("products.filters.onSale")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductFilters;
