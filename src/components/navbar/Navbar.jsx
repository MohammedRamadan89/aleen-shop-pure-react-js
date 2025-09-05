import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme, useMediaQuery, Slide, AppBar, Toolbar, Box, Stack, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountMenu from '../AccountMenu/AccountMenu';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

import useScrollDirection from "../../common/hooks/useScrollDirection";

import NavbarMobileView from "./NavbarMobileView";
import NavbarDesktopView from "./NavbarDesktopView";
import NavbarLinks from "./NavbarLinks";
import SearchBar from './searchBar'

import SiteConstants from "../../common/constants/site.constants";

const SITE_NAME = SiteConstants.SITE_NAME;

/**
 * Responsive navigation bar component that adapts its layout for desktop and mobile views.
 * Includes search functionality for mobile screens, dynamic visibility on scroll,
 * and separate views for different breakpoints.
 *
 * @component
 * @param {Object} props
 * @param {Function} [props.onSideBarToggle] - Callback triggered when the sidebar toggle button is clicked (desktop view).
 * @param {Function} [props.onNavMenuToggle] - Callback triggered when the navigation menu button is clicked (mobile view).
 *
 * @example
 * <Navbar
 *   onSideBarToggle={() => console.log("Sidebar toggled")}
 *   onNavMenuToggle={() => console.log("Mobile menu toggled")}
 * />
 */
function Navbar({ onSideBarToggle, onNavMenuToggle }) {
  /**
 * Navigation items used in the desktop navigation bar.
 * @type {Array<{ label: string, path: string }>}
 */

  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");


  const navItems = [
    { label: t("navBar.Home"), path: "/" },
    { label: t("navBar.Orders"), path: "/orders" },
    { label: t("navBar.About"), path: "/about" },
    { label: t("navBar.Contact"), path: "/contact" },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  /** @type {[boolean, Function]} Controls whether the navbar is visible on scroll. */
  const [visible, setVisible] = useState(true);
  /** @type {React.MutableRefObject<number>} Stores the previous scroll position. */
  const prevScrollPosRef = useRef(0);

  /** @type {[boolean, Function]} Controls whether the mobile search bar is visible. */
  const [showSearch, setShowSearch] = useState(false);
  /** @type {React.RefObject<HTMLInputElement>} Ref for the search input element. */
  const searchInputRef = useRef(null);
  /** @type {React.RefObject<HTMLDivElement>} Ref for the search bar container. */
  const searchBarContainerRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} Ref for the search icon button. */
  const searchButtonRef = useRef(null);

  /** @type {[string, Function]} Current language setting. */


  /**
   * Handles menu button click depending on screen size.
   * For small screens, it triggers mobile menu toggle; otherwise, sidebar toggle.
   */
  const handleMenuClick = () => {
    if (isSmallScreen) {
      onNavMenuToggle?.();
    } else {
      onSideBarToggle?.();
    }
  };

  const handleChangeLang = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };
  /**
   * Effect: Controls navbar visibility based on scroll direction.
   * Hides the navbar when scrolling down, shows it when scrolling up or near top.
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const prev = prevScrollPosRef.current;
      setVisible(prev > currentScrollPos || currentScrollPos < 10);
      prevScrollPosRef.current = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Effect: Handles clicks outside of the search bar to close it (mobile only).
   * Ignores clicks on the search icon button itself.
   */
  useEffect(() => {
    if (!isSmallScreen || !showSearch) return;
    const handleClickOutside = (event) => {
      if (
        searchBarContainerRef.current &&
        !searchBarContainerRef.current.contains(event.target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSmallScreen, showSearch]);

  /**
   * Effect: Automatically focuses the search input when the search bar is shown.
   */
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <>
      <Slide appear={false} direction="down" in={visible}>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {isSmallScreen ? (
              <NavbarMobileView SITE_NAME={t(SITE_NAME)} lang={lang} onChangeLang={handleChangeLang} onMenuClick={handleMenuClick} />
            ) : (
              <NavbarDesktopView SITE_NAME={t(SITE_NAME)} lang={lang} onChangeLang={handleChangeLang} onMenuClick={handleMenuClick} cartCount={cartCount} />
            )}
          </Toolbar>

          {/* Desktop view: menu button + navigation links */}
          {!isSmallScreen && (
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1 }}>
              <IconButton
                color="inherit"
                onClick={handleMenuClick}
                aria-label="Toggle sidebar"
                aria-expanded={false}
              >
                <MenuIcon />
              </IconButton>

              <NavbarLinks navItems={navItems} />
            </Stack>
          )}
        </AppBar>
      </Slide>

      {/* Mobile bottom navigation bar */}
      {isSmallScreen && (
        <AppBar
          position="fixed"
          sx={{
            top: "auto",
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-around" }}>
            <IconButton color="inherit" component={Link} to="/">
              <HomeIcon />
            </IconButton>
            <IconButton ref={searchButtonRef} color="inherit" onClick={() => setShowSearch(!showSearch)}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="error" >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <AccountMenu />
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile search bar overlay */}
      {isSmallScreen && showSearch && (
        <Box
          ref={searchBarContainerRef}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            p: 2,
            zIndex: theme.zIndex.drawer + 2,
          }}
        >
          <SearchBar ref={searchInputRef} />
        </Box>
      )}

      {/* Spacer to prevent content overlap with header */}
      <Box sx={{ height: isSmallScreen ? 56 : 112 }} />
    </>
  );
}

Navbar.propTypes = {
  onSideBarToggle: PropTypes.func,
  onNavMenuToggle: PropTypes.func,
};

export default Navbar;
