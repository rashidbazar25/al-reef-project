import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import eduImg from "../assets/ed1.png";

const Qta = () => {
  useEffect(() => {
    document.title = "التعليم";
  }, []);

  return (
    <>
      <Helmet>
        <title>التعليم</title>
        <meta name="description" content="قطاع التعليم" />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "50vh", md: "60vh" },

          // ✅ خلفية بدون صورة (احترافية)
          background: `
            linear-gradient(135deg, #0f172a, #1e293b),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "cover, 40px 40px, 40px 40px",
          backgroundPosition: "center",

          position: "relative",
          marginTop: "-16px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            bottom: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontWeight: "bold",
            zIndex: 2,
            textAlign: "center",
            px: 2,
          }}
        >
          مؤسسة بنت الريف
        </Typography>
      </Box>

      {/* Card */}
      <Container
        sx={{
          position: "relative",
          mt: { xs: "-80px", md: "-120px" },
          zIndex: 5,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            backgroundColor: "#fff",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            minHeight: 300,
          }}
        >
          {/* النصوص */}
          <Box
            sx={{
              flex: 1,
              maxHeight: 300,
              overflowY: "auto",
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: "right",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              التعليم
            </Typography>
            <Typography
              sx={{ color: "#555", lineHeight: 2, fontSize: "1.05rem" }}
            >
              نعمل في قطاع التعليم على تحسين فرص الوصول إلى التعليم الجيد،
              ودعم الطلاب والمعلمين، والمساهمة في بناء جيل واعٍ ومتعلم.
            </Typography>
          </Box>

          {/* الصورة */}
          <Box
            component="img"
            src={eduImg}
            alt="Education"
            sx={{
              flex: "0 0 250px",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: { xs: 0, md: "0 8px 8px 0" },
              ml: { md: 3 },
              mt: { xs: 3, md: 0 },
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Qta;