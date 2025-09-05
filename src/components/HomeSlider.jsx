import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Box, Typography,useTheme, useMediaQuery } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

// Sample images (replace with your actual image paths)
const slides = [
  {
    image: "/images/banner1.jpg",
    alt: "Summer Collection",
    title: "New Season Arrivals",
    subtitle: "Discover our latest collection",
    cta: "Shop Now"
  },
  {
    image: "/images/banner2.jpg",
    alt: "Special Offers",
    title: "Limited Time Offers",
    subtitle: "Up to 50% off selected items",
    cta: "View Deals"
  },
  {
    image: "/images/banner3.jpg",
    alt: "Premium Quality",
    title: "Luxury Redefined",
    subtitle: "Experience unmatched quality",
    cta: "Explore"
  }
];

const HomeSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box sx={{ 
      position: "relative",
      mt: { xs: 1, md: 10 },
      mb: 4,
      borderRadius: { xs: 0, sm: 2 },
      overflow: "hidden",
      boxShadow: 3,
      "& .swiper-pagination-bullet": {
        backgroundColor: "white",
        opacity: 0.6,
        width: 10,
        height: 10,
        "&.swiper-pagination-bullet-active": {
          backgroundColor: theme.palette.primary.main,
          opacity: 1
        }
      },
      "& .swiper-button-next, & .swiper-button-prev": {
        color: "white",
        padding: "20px",
        "&::after": {
          fontSize: "1.8rem",
          fontWeight: "bold"
        },
        "&:hover": {
          color: theme.palette.primary.main
        }
      }
    }}>
      <Swiper className="custom-swiper"
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        speed={800}
        style={{
          "--swiper-navigation-size": "24px",
          "--swiper-navigation-color": theme.palette.primary.main,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box sx={{
              position: "relative",
              width: "100%",
              height: isMobile ? "300px" : isTablet ? "400px" : "500px",
              overflow: "hidden"
            }}>
              {/* Background Image */}
              <Box
                component="img"
                src={slide.image}
                alt={slide.alt}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.8)"
                }}
              />
              
              {/* Overlay Content */}
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                color: "white",
                px: { xs: 4, sm: 6, md: 8, lg: 10 },
                textAlign: "left",
                background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)"
              }}>
                <Typography variant="h3" component="h2" sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  mb: 1,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                }}>
                  {slide.title}
                </Typography>
                <Typography variant="h5" component="h3" sx={{
                  fontWeight: 400,
                  fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                  mb: 3,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  maxWidth: "60%"
                }}>
                  {slide.subtitle}
                </Typography>
                <Box 
                  component="button"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    border: "none",
                    padding: { xs: "8px 16px", sm: "10px 24px" },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      transform: "translateY(-2px)",
                      boxShadow: 3
                    }
                  }}
                >
                  {slide.cta}
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeSlider;