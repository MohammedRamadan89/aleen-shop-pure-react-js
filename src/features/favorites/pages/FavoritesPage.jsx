import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { toggleFavorite } from "../favoritesSlice";

import FavoritesHeader from "../components/FavoritesHeader";
import FavoritesFilters from "../components/FavoritesFilters";
import FavoritesList from "../components/FavoritesList";
import FavoritesNotification from "../components/FavoritesNotification";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.05)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.05)} 50%, 
    ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const FavoritesPage = () => {
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const favoriteProducts = useSelector(state => Array.isArray(state.favorites) ? state.favorites : []);

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };

  const handleCloseNotification = () => setNotification(prev => ({ ...prev, open: false }));

  const filteredProducts = favoriteProducts
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-high": return b.price - a.price;
        case "price-low": return a.price - b.price;
        case "newest":
        default: return new Date(b.addedDate) - new Date(a.addedDate);
      }
    });

  return (
    <StyledContainer maxWidth="lg">
      <FavoritesHeader count={favoriteProducts.length} />

      <FavoritesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterAnchor={filterAnchor}
        setFilterAnchor={setFilterAnchor}
      />

      <FavoritesList
        products={filteredProducts}
        viewMode={viewMode}
        onToggleFavorite={handleToggleFavorite}
      />

      <FavoritesNotification
        notification={notification}
        onClose={handleCloseNotification}
      />
    </StyledContainer>
  );
};

export default FavoritesPage;
