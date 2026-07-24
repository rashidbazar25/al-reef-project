import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

import img1 from "../assets/cres11.jpg";
import img2 from "../assets/cres22.jpg";
import img3 from "../assets/cres33.jpg";
import logo from "../assets/logo.png";

const slides = [
  {
    id: 1,
    title: "الحمــاية والتمكـين",
    subtitle: "نحمي الإنسان ونمكّنه من النجاح",
    image: img1,
  },
  {
    id: 2,
    title: "الرعـاية المجتـمـعية",
    subtitle: "نرعى الإنسان ونعزز تماسك المجتمع",
    image: img2,
  },
  {
    id: 3,
    title: "الحـــقوق",
    subtitle:
      "تمكين المجتمع الريفي من الوصول إلى حقوقه الأساسية وفرص التنمية المستدامة، بما يعزز العدالة الاجتماعية",
    image: img3,
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: current === index ? 1 : 0,
            transform:
              current === index ? "scale(1)" : "scale(1.08)",
            transition: "all 1.4s ease-in-out",
            zIndex: current === index ? 1 : 0,
          }}
        >
          {/* Background */}
          <Box
            component="img"
            src={slide.image}
            alt={slide.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.35))",
            }}
          />

          {/* Content */}
          <Container
            maxWidth="lg"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              zIndex: 2,
              
            }}
          >
           <Box
  sx={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexDirection: {
      xs: "column",
      md: "row",
    },
  }}
>
  {/* Text */}
  <Box
  sx={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    textAlign: "right",
    color: "#fff",
  }}
>
  <Typography
    variant="h2"
    sx={{
      fontWeight: 900,
      fontSize: {
        xs: "2.5rem",
        md: "4.5rem",
      },
      lineHeight: 1.2,
      mb: 1,
      width: "100%",
    }}
  >
    {slide.title}
  </Typography>

  <Typography
    sx={{
      width: "100%",
      fontSize: {
        xs: "1.1rem",
        md: "1.35rem",
      },
      lineHeight: 1.8,
      color: "rgba(255,255,255,0.9)",
    }}
  >
    {slide.subtitle}
  </Typography>
</Box>

  {/* Logo */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      animation: current === index ? "fadeUp 1.2s ease" : "none",

      "@keyframes float": {
        "0%": {
          transform: "translateY(0px)",
        },
        "50%": {
          transform: "translateY(-10px)",
        },
        "100%": {
          transform: "translateY(0px)",
        },
      },
    }}
  >
    <Box
      component="img"
      src={logo}
      alt="شعار المؤسسة"
      sx={{
        width: {
          xs: 180,
          md: 350,
        },
        maxWidth: "100%",
        filter: "drop-shadow(0 15px 35px rgba(0,0,0,.45))",
        animation: "float 4s ease-in-out infinite",
      }}
    />
  </Box>
</Box>
          </Container>
        </Box>
      ))}

      {/* Previous */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: 30,
          transform: "translateY(-50%)",
          zIndex: 5,
          color: "#fff",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            background: "rgba(255,255,255,0.22)",
          },
        }}
      >
        <ArrowBackIosNew />
      </IconButton>

      {/* Next */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: 30,
          transform: "translateY(-50%)",
          zIndex: 5,
          color: "#fff",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            background: "rgba(255,255,255,0.22)",
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1.5,
          zIndex: 5,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: current === index ? 35 : 12,
              height: 12,
              borderRadius: "20px",
              cursor: "pointer",
              transition: "0.4s",
              background:
                current === index
                  ? "#fff"
                  : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}