import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/logo.jpg";
import imgbk from "../assets/imgbk.jpg";

const values = [
  { text: "رسالة المؤسسة: دعم التعليم والمجتمع", logo: logo },
  { text: "رؤية المؤسسة: تمكين الشباب والطفل", logo: logo },
  { text: "قيمنا: الشفافية، الالتزام، التعاون", logo: logo },
  { text: "أهدافنا: تنمية المجتمع محليًا وإقليميًا", logo: logo },
];

const TextLogoCarousel = () => {
  const settings = {
    dots: false,          // بدون نقاط
    infinite: true,       // حركة مستمرة
    speed: 1000,          // سرعة التنقل بين السلايدات
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // تشغيل تلقائي
    autoplaySpeed: 4000,  // وقت العرض لكل سلايد
    arrows: true,        // بدون أسهم
    rtl: true,            // من اليمين لليسار
    pauseOnHover: false,  // لا تتوقف عند مرور الماوس
    swipe: false,         // منع السحب
    cssEase: "linear",    // حركة سلسة بدون توقف
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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${imgbk})`,
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
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.4,
                textShadow: "2px 2px 15px rgba(0,0,0,0.7)",
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