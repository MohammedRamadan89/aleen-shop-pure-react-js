import React, { useState } from "react";
import { Button, Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";

/**
 * Available languages for the language switcher.
 * Each object contains a language code and its display label.
 * @type {{ code: string, label: string }[]}
 */
const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

/**
 * A dropdown menu component for selecting the application's language.
 *
 * This component displays the currently selected language and allows users
 * to switch between available languages (English/Arabic by default).
 * It uses Material UI's `Menu` and `MenuItem` components for the dropdown UI.
 *
 * ⚡ Optimization: Wrapped with `React.memo` to prevent unnecessary re-renders
 * when props (`currentLang`, `onChangeLang`) have not changed.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.currentLang="en"] - The currently selected language code.
 * @param {function(string): void} props.onChangeLang - Callback triggered when a new language is selected.
 *
 * @example
 * // Usage inside a Navbar
 * <LanguageMenu currentLang={lang} onChangeLang={setLang} />
 */
const LanguageMenu = React.memo(function LanguageMenu({ currentLang = "en", onChangeLang }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /**
   * Opens the language menu by setting the anchor element.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The button click event.
   */
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the language menu by resetting the anchor element.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles language selection and notifies the parent component.
   * @param {string} lang - The selected language code.
   */
  const handleSelectLang = (lang) => {
    onChangeLang(lang);
    handleClose();
  };

  // Find the display label for the current language
  const currentLangLabel = languages.find(
    (lang) => lang.code === currentLang
  )?.label;

  return (
    <>
      <Button
        id="language-menu-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
        color="inherit"
        size="small"
        sx={{
          textTransform: "none",
          minWidth: 90,
          display: "flex",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <Typography variant="body2" sx={{ flexGrow: 1, textAlign: "left" }}>
          {currentLangLabel}
        </Typography>
        <ArrowDropDownIcon sx={{ ml: 1, color: "text.secondary" }} />
      </Button>

      <Menu
        disableScrollLock
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "language-menu-button",
          },
          paper: {
            sx: {
              backgroundColor: "background.paper",
              borderRadius: "8px",
              boxShadow: 3,
              minWidth: 120,
            },
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={currentLang === lang.code}
            onClick={() => handleSelectLang(lang.code)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              },
            }}
          >
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {lang.label}
            </Typography>
            {currentLang === lang.code && (
              <ListItemIcon sx={{ minWidth: 0, ml: "auto" }}>
                <CheckIcon fontSize="small" color="primary" />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

export default LanguageMenu;
