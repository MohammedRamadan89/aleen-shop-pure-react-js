// src/app/App.jsx
import React from "react";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Footer from "../components/footer/Footer";
import UseStepScrollToTop from "../common/hooks/ScrollToTop";
import AppRoutes from "../routes/AppRoutes";
import "../App.css";
import "../common/i18n";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UseStepScrollToTop />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default"
      }}>
        <Box sx={{ flex: 1 }}>
          <AppRoutes />
        </Box>

        <Footer />
      </Box>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
