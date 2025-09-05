/**
 * NavbarMobileView Component
 * --------------------------
 * A compact version of the main navigation bar optimized for small screens.
 *
 * Layout:
 * - Left: A menu button (MenuIcon) to trigger a sidebar or navigation drawer.
 * - Center: Store logo or brand name.
 * - Right: A language selection menu (LanguageMenu).
 *
 * Performance:
 * - Wrapped with React.memo to prevent unnecessary re-renders.
 *   Re-renders only occur when any of the props: lang, setLang, or onMenuClick change.
 *
 * Props:
 * @param {string} lang - Current active language (e.g., "en", "ar").
 * @param {function} setLang - Callback function to update the current language.
 * @param {function} onMenuClick - Callback triggered when the menu button is clicked.
 */

import React from "react";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageMenu from "./LanguageMenu";

const NavbarMobileView = React.memo(function NavbarMobileView({ SITE_NAME, lang, onChangeLang, onMenuClick }) {
  return (
    <>
      {/* Left: Menu Button */}
      <IconButton color="inherit" onClick={onMenuClick}>
        <MenuIcon />
      </IconButton>

      {/* Center: Store Logo / Brand Name */}
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
        {SITE_NAME}
      </Typography>

      {/* Right: Language Selector */}
      <LanguageMenu currentLang={lang} onChangeLang={onChangeLang} />
    </>
  );
});

NavbarMobileView.propTypes = {
  lang: PropTypes.string.isRequired,        // Current language
  onChangeLang: PropTypes.func.isRequired,        // Function to change language
  onMenuClick: PropTypes.func.isRequired,    // Menu button click handler
};

export default NavbarMobileView;
