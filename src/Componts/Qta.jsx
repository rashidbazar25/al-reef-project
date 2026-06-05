import React from "react";
import { Box, Container, Typography, Paper, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Qta = ({ sector }) => {
  if (!sector) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5">القطاع غير موجود</Typography>
      </Container>
    );
  }

  const Icon = sector.icon;

  return (
    <>
      <Helmet>
        <title>{sector.title}</title>
        <meta name="description" content={sector.description} />
      </Helmet>

      {/* HERO (بدون تغيير) */}
      <Box
        sx={{
          height: { xs: "55vh", md: "70vh" },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          backgroundImage: `url(${sector.image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#0b0b0b",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.10))",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2, color: "#fff" }} />
      </Box>

      {/* CONTENT CARD (احترافي) */}
      <Container sx={{ mt: -6, position: "relative", zIndex: 3 }}>
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* HEADER */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            {Icon && (
              <Box sx={{ color: "#eeb60f", mb: 1 }}>
                <Icon size={42} />
              </Box>
            )}

            <Typography
              sx={{
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontWeight: 800,
                color: "#111",
              }}
            >
              {sector.title}
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 3,
                background: "#eeb60f",
                mx: "auto",
                mt: 1.5,
                borderRadius: 2,
              }}
            />

            <Chip
              label="قطاع المؤسسة"
              sx={{
                mt: 2,
                backgroundColor: "rgba(238,182,15,0.12)",
                color: "#8a6a00",
                fontWeight: 600,
              }}
            />
          </Box>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              textAlign: "center",
              color: "#444",
              lineHeight: 2,
              fontSize: "1rem",
              maxWidth: 750,
              mx: "auto",
              mb: 5,
            }}
          >
            {sector.description}
          </Typography>

          {/* POINTS */}
          <Box
            sx={{
              maxWidth: 750,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {sector.points?.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2.2,
                  borderRadius: 2,
                  background: "#fafafa",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "0.25s",

                  "&:hover": {
                    background: "#f5f5f5",
                    transform: "translateX(-3px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#eeb60f",
                    mt: 0.8,
                    flexShrink: 0,
                  }}
                />

                <Typography sx={{ color: "#333", lineHeight: 1.9 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Qta;