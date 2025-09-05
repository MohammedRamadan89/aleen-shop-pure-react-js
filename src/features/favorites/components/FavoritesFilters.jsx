import React from "react";
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Search, GridView, ViewList, Sort, Clear } from "@mui/icons-material";

const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
}));

const FavoritesFilters = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  filterAnchor,
  setFilterAnchor
}) => {
  return (
    <FilterPaper>
      <Grid container spacing={2}>
        {/* البحث */}
        <Grid size={{xs:12 ,md:4 }} >
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في المفضلة..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")} size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* عرض كشبكة/قائمة */}
        <Grid size={{xs:6 ,md:3 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, value) => value && setViewMode(value)}
            fullWidth
            size="small"
          >
            <ToggleButton value="grid"><GridView /></ToggleButton>
            <ToggleButton value="list"><ViewList /></ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* التصنيف */}
        <Grid size={{xs:6 ,md:3 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(e, value) => value && setSelectedCategory(value)}
            fullWidth
            size="small"
          >
            <ToggleButton value="all">الكل</ToggleButton>
            <ToggleButton value="electronics">إلكترونيات</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* الترتيب */}
        <Grid size={{xs:12 ,md:2 }} >
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Sort />}
            onClick={(e) => setFilterAnchor(e.currentTarget)}
          >
            ترتيب
          </Button>
          <Menu
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={() => setFilterAnchor(null)}
          >
            <MenuItem onClick={() => setSortBy("newest")}>الأحدث</MenuItem>
            <MenuItem onClick={() => setSortBy("price-high")}>الأعلى سعراً</MenuItem>
            <MenuItem onClick={() => setSortBy("price-low")}>الأقل سعراً</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </FilterPaper>
  );
};

export default FavoritesFilters;
