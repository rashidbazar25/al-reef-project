import React, { useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Section = () => {
    useEffect(() => {
    document.title = "  مؤسسة بنت الريف  ";
    const meta =
      document.querySelector("meta[name='description']") ||
      document.createElement("meta");
    meta.name = "description";
    meta.content =
      "مرحبًا بكم في موقعنا لتتعرف اكثر عن مؤسسة بنت الريف";
    if (!document.head.contains(meta)) document.head.appendChild(meta);
  }, []);


  return (
    <>
     <Helmet>
                <title> مؤسسة بنت الريف</title>
                <meta
                  name="description"
                  content="تعرف على رؤية ورسالة مؤسسة بنت الريف وبرامجها المختلفة."
                />
              </Helmet>
    <Box
      sx={{
        height: { xs: "80vh", md: "90vh" },
        backgroundColor: "#f9f6f2",
        position: "relative",
        display: "flex",
        alignItems: "center",      // ✅ محاذاة عمودية للوسط
        justifyContent: "center",  // ✅ محاذاة أفقية للوسط
        overflow: "hidden",
        textAlign: "center",       // ✅ النصوص في الوسط
      }}
    >
      {/* الخلفية */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.65)",
          zIndex: 1,
        }}
      />

      {/* المحتوى */}
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#000",
              mb: 2,
              fontSize: { xs: "2rem", md: "3.5rem" },
            }}
          >
            معًا لنزرع الأمل في الريف
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#000",
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: { md: "600px" },
              mx: "auto",
            }}
          >
            مؤسسة بنت الريف تدعم الأسر المحتاجة والمشاريع التعليمية والزراعية في القرى النائية، ونطمح لبناء مجتمع أكثر ازدهارًا.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#eeb60f",
                color: "#000",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#f3c10f" },
              }}
            >
              تبرع الآن
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#000",
                borderColor: "#000",
                "&:hover": { borderColor: "#eeb60f", color: "#eeb60f" },
              }}
            >
              تطوع معنا
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
    </>
  );
};

export default Section;
