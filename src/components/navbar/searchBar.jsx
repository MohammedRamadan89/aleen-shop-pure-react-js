/**
 * SearchBar Component
 * 
 * A reusable search bar component that allows users to select a category
 * and enter a search term, with a responsive design for both small and large screens.
 * 
 * @component
 * @example
 * // Example usage:
 * <SearchBar ref={inputRef} />
 * 
 * @param {object} props - Component props.
 * @param {React.Ref} ref - A forwarded ref to access the search input element.
 * 
 * @returns {JSX.Element} The rendered search bar UI.
 * 
 * @description
 * This component provides:
 * - A category dropdown (Select) for filtering searches by department.
 * - A text input field for entering the search query.
 * - A search button (icon) to trigger search logic.
 * 
 * Responsive behavior:
 * - On small screens (≤ md breakpoint), the search bar takes full width.
 * - On larger screens, it occupies 80% width.
 * 
 * State:
 * - `category` {string} - Stores the selected search category.
 * - `searchTerm` {string} - Stores the search query input value.
 * 
 * Functions:
 * - `handleSearch` - Logs the search term and category to the console.
 *   Replace with real search logic (e.g., API call) in production.
 * 
 * Dependencies:
 * - Material UI components: Box, TextField, MenuItem, Select, IconButton, InputAdornment
 * - Material UI hook: useMediaQuery
 * - Icons: SearchIcon (Material Icons)
 * - forwardRef to allow parent components to control/focus the search input
 */

import React, { useState, forwardRef } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SearchBar = forwardRef((props, ref) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
 const { t } = useTranslation();

  const categories = [
    { value: "all", label: t("navBar.search.categories.all") },
    { value: "electronics", label: t("navBar.search.categories.electronics") },
    { value: "fashion", label: t("navBar.search.categories.fashion") },
    { value: "books", label: t("navBar.search.categories.books") },
    { value: "home", label: t("navBar.search.categories.home") },
  ];

  /**
   * Handles the search action.
   * Logs the current search term and selected category.
   * Replace with actual search implementation.
   */
  const handleSearch = () => {
    console.log("Search for:", searchTerm, "in category:", category);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: isSmallScreen ? "100%" : "80%",
        backgroundColor: "#fff",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      {/* Category Select */}
      <Select
        menuprops={{ disableScrollLock: true }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        variant="outlined"
        sx={{
          minWidth: isSmallScreen ? "35%" : "150px",
          borderRadius: 0,
          "& fieldset": { border: "none" },
        }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat.value} value={cat.value}>
            {cat.label}
          </MenuItem>
        ))}
      </Select>

      {/* Search Input */}
      <TextField
        inputRef={ref}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("navBar.search.placeholder")}
        variant="outlined"
        fullWidth
        sx={{ "& fieldset": { border: "none" } }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSearch}
                  sx={{
                    backgroundColor: "#febd69",
                    "&:hover": { backgroundColor: "#f3a847" },
                    borderRadius: 0,
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
});

export default SearchBar;
