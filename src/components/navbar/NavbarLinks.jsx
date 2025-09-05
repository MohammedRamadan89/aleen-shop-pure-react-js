import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * NavbarLinks component
 *
 * A reusable navigation links component for the navbar.
 * It renders a horizontal list of navigation buttons inside a Material UI Toolbar,
 * typically used for desktop navigation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<{ label: string, path: string }>} props.navItems - Array of navigation items,
 * each containing a `label` (button text) and a `path` (URL path for the link).
 *
 * @example
 * const navItems = [
 *   { label: "Home", path: "/" },
 *   { label: "Shop", path: "/shop" },
 *   { label: "Contact", path: "/contact" }
 * ];
 *
 * <NavbarLinks navItems={navItems} />
 */
function NavbarLinks({ navItems }) {
  return (
    <Toolbar
      sx={{
        minHeight: (theme) => theme.spacing(4),
        justifyContent: "center",
        flex: 1,
        px: 0,
      }}
    >
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          sx={{
            color: "#f7fafc",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Toolbar>
  );
}

NavbarLinks.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// ✅ Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(NavbarLinks);
