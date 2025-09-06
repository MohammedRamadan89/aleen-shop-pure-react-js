// src/layouts/MainLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Toolbar, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar/Navbar";

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  
  const [setsideBarOpen, setSetsideBarOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  
  // مرجع لتتبع آخر موضع تمرير
  const lastScrollY = useRef(0);
  const scrollThreshold = 0; // المسافة المطلوبة للتمرير قبل الإغلاق

  // إدارة class للـ body لمنع البادينغ
  useEffect(() => {
    if (isSmallScreen && navMenuOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }

    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isSmallScreen, navMenuOpen]);

  // إضافة event listener للتمرير لإغلاق الـ Sidebar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // إذا كان الـ Sidebar مفتوح وتم التمرير أكثر من العتبة المحددة
      if (setsideBarOpen && Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
        setSetsideBarOpen(false);
      }
      
      // إذا كان NavMenu مفتوح وتم التمرير أكثر من العتبة المحددة
      if (navMenuOpen && Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
        setNavMenuOpen(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    // إضافة المستمع عندما يكون أي من القوائم مفتوحة
    if (setsideBarOpen || navMenuOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // تحديث آخر موضع تمرير
      lastScrollY.current = window.scrollY;
    }

    // إزالة المستمع عند التنظيف
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setsideBarOpen, navMenuOpen]);

  // كما يمكنك استخدام هذا البديل إذا كنت تفضل إغلاق الـ Sidebar عند أي حركة تمرير
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (setsideBarOpen) setSetsideBarOpen(false);
  //     if (navMenuOpen) setNavMenuOpen(false);
  //   };

  //   if (setsideBarOpen || navMenuOpen) {
  //     window.addEventListener('scroll', handleScroll, { passive: true });
  //   }

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [setsideBarOpen, navMenuOpen]);

  const handleDrawerToggle = () => {
    setSetsideBarOpen((prev) => !prev);
    setNavMenuOpen(false);
    // تحديث آخر موضع تمرير عند فتح/إغلاق الـ Sidebar
    lastScrollY.current = window.scrollY;
  };

  const handleNavMenuToggle = () => {
    setNavMenuOpen((prev) => !prev);
    setSetsideBarOpen(false);
    // تحديث آخر موضع تمرير عند فتح/إغلاق NavMenu
    lastScrollY.current = window.scrollY;
  };

  const navItems = ["Home", "About", "Contact", "Orders"];

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar 
        onSideBarToggle={handleDrawerToggle}
        onNavMenuToggle={handleNavMenuToggle}
        customTheme={{
          primary: "#4f46e5",
          secondary: "#7c3aed",
          text: "#f8fafc",
          hover: "#c7d2fe",
          background: "#4338ca",
          searchBg: "#f1f5f9",
          searchText: "#64748b",
        }}
      />
      
      {/* Sidebar للشاشات الكبيرة والمتوسطة */}
      {!isSmallScreen && (
        <Sidebar
          sideBarOpen={setsideBarOpen}
          handleDrawerClose={handleDrawerToggle}
        />
      )}
      
      {/* Drawer لعناصر الـ Navbar في الشاشات الصغيرة فقط */}
      {isSmallScreen && (
        <Drawer
          anchor="left"
          open={navMenuOpen}
          onClose={handleNavMenuToggle}
          closeAfterTransition={false}
          ModalProps={{ 
            keepMounted: true,
            disableEnforceFocus: false,
            disableAutoFocus: false,
            // تحسين إعدادات الـ Modal
            disableScrollLock: true,
            disableRestoreFocus: false,

          }}
          sx={{ 
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              mt: '64px',
            },
          }}
        >
          <Toolbar />
          <List sx={{ width: 200 }}>
            {navItems.map((item, idx) => (
              <ListItem key={item + idx} disablePadding>
                <ListItemButton onClick={handleNavMenuToggle}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;