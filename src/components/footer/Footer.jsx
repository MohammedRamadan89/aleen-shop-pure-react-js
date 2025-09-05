// src/components/footer/Footer.jsx
import React from "react";
import { Box, Container, Grid, Divider, useTheme } from "@mui/material";
import FooterAbout from "./FooterAbout";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterNewsletter from "./FooterNewsletter";
import FooterBottom from "./FooterBottom";
import { useFooterData } from "./footerData";

const Footer = () => {
  const theme = useTheme();
  const { quickLinks, customerService } = useFooterData();
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        color: "#ffffff",
        py: 6,
        mt: 8,
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:4}} >
            <FooterAbout />
          </Grid>

          <Grid size={{xs:6, md:2 }} >
            <FooterLinks title="Quick Links" links={quickLinks} />
          </Grid>

          <Grid size={{xs:6, md:2 }}>
            <FooterLinks title="Customer Service" links={customerService} />
          </Grid>

          <Grid size={{xs:12, md:4 }}>
            <FooterContact />
            <FooterNewsletter />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <FooterBottom />
      </Container>
    </Box>
  );
};

export default Footer;
