import React from "react";
import Slider from "react-slick";
import { Box, Typography, IconButton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/logo.jpg";
import imgbk from "../assets/imgbk.jpg"; // صورة الخلفية

const values = [
  { text: "رسالة المؤسسة: دعم التعليم والمجتمع", logo: logo },
  { text: "رؤية المؤسسة: تمكين الشباب والطفل", logo: logo },
  { text: "قيمنا: الشفافية، الالتزام، التعاون", logo: logo },
  { text: "أهدافنا: تنمية المجتمع محليًا وإقليميًا", logo: logo },
];

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 20,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.3)",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
    }}
  >
    &#10095;
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: 20,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.3)",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
    }}
  >
    &#10094;
  </IconButton>
);

const TextLogoCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `linear-gradient(rgba(247, 243, 243, 0.5), rgba(149, 148, 148, 0.3)), url(${imgbk})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Slider {...settings} style={{ width: "100%" }}>
        {values.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 3, md: 6 },
              height: "100vh",
              px: { xs: 2, md: 8 },
            }}
          >
            <Box
              component="img"
              src={item.logo}
              alt="شعار المؤسسة"
              sx={{
                width: { xs: 120, md: 180 },
                height: { xs: 120, md: 180 },
                objectFit: "cover",
                borderRadius: "50%",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.4rem", sm: "2rem", md: "2.5rem" },
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.4,
                textShadow: "2px 2px 12px rgba(0,0,0,0.7)",
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TextLogoCarousel;