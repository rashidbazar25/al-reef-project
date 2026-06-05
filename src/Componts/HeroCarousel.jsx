import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
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

const slides = [
  {
    id: 1,
    title: "الحمــاية والتمكـين",
    subtitle:
      "نحمي الإنسان ونمكّنه من النجاح",
    image:
     img1,
  },
  {
    id: 2,
    title: "الرعـاية المجتـمـعية",
    subtitle:
      "نرعى الإنسان ونعزز تماسك المجتمع",
    image:
      img2,
  },
  {
    id: 3,
    title: "الحـــقوق",
    subtitle:
      "تمكين المجتمع الريفي من الوصول إلى حقوقه الأساسية وفرص التنمية المستدامة، بما يعزز العدالة الاجتماعية",
    image:
      img3,
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
              current === index
                ? "scale(1)"
                : "scale(1.08)",
            transition:
              "all 1.4s ease-in-out",
            zIndex: current === index ? 1 : 0,
          }}
        >
          {/* Background Image */}
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
                maxWidth: "700px",
                color: "#fff",
                animation:
                  current === index
                    ? "fadeUp 1.2s ease"
                    : "none",

                "@keyframes fadeUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(40px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  lineHeight: 1.2,
                  fontSize: {
                    xs: "2.2rem",
                    md: "4.5rem",
                  },
                }}
              >
                {slide.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    md: "1.3rem",
                  },
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 2,
                  mb: 4,
                }}
              >
                {slide.subtitle}
              </Typography>

             
            </Box>
          </Container>
        </Box>
      ))}

      {/* Arrows */}
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