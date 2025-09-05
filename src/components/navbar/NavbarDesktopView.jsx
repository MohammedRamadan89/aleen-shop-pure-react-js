import React from "react";
import PropTypes from "prop-types";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import LanguageMenu from "./LanguageMenu";
import SearchBar from "./searchBar";
import AccountMenu from "../AccountMenu/AccountMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";

/**
 * NavbarDesktopView component
 *
 * A desktop version of the application's navigation bar.
 * It includes:
 * - A logo aligned to the left
 * - A centered search bar
 * - Right-aligned actions: language switcher, shopping cart, and user account menu
 *
 * This component is typically used in larger screen layouts (`md` and above).
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.lang - Current selected language code
 * @param {function(string): void} props.setLang - Callback to update the selected language
 * @param {function} [props.onMenuClick] - Optional callback for handling menu button clicks
 *
 * @example
 * <NavbarDesktopView
 *   lang={lang}
 *   setLang={setLang}
 *   onMenuClick={() => console.log("Menu clicked")}
 * />
 */
function NavbarDesktopView({ SITE_NAME, lang, onChangeLang, onMenuClick, cartCount = 0 }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
      {/* Left: Logo */}
      <Typography variant="h6" sx={{ mr: 2 }}>
        {SITE_NAME}
      </Typography>

      {/* Center: Search bar takes maximum available space */}
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <SearchBar />
      </Box>

      {/* Right: Language menu, shopping cart, and account menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LanguageMenu currentLang={lang} onChangeLang={onChangeLang} />
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <AccountMenu />
      </Box>
    </Stack>
  );
}

NavbarDesktopView.propTypes = {
  lang: PropTypes.string.isRequired,
  onChangeLang: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func,
  cartCount: PropTypes.number,
};

export default NavbarDesktopView;
