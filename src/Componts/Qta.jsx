import React, { useEffect } from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Qta = ({ sector }) => {
  useEffect(() => {
    if (sector?.title) {
      document.title = sector.title;
    }
  }, [sector]);

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

      {/* Hero */}
      <Box
        sx={{
          height: { xs: "45vh", md: "60vh" },
          background: `
            linear-gradient(135deg, #0f172a, #1e293b),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "cover, 40px 40px, 40px 40px",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", md: "2.8rem" },
          }}
        >
          مؤسسة بنت الريف
        </Typography>
      </Box>

      {/* Content */}
      <Container sx={{ mt: { xs: "-40px", md: "-90px" } }}>
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          elevation={6}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Grid container>

            {/* النص */}
            <Grid item xs={12} md={7}>
              <Box sx={{ p: { xs: 3, md: 5 }, textAlign: "right" }}>

                {/* أيقونة */}
                {Icon && (
                  <Box sx={{ mb: 2, color: "#eeb60f" }}>
                    <Icon size={34} />
                  </Box>
                )}

                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  {sector.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#666",
                    lineHeight: 2,
                    mb: 3,
                  }}
                >
                  {sector.description}
                </Typography>

                <Box>
                  {sector.points?.map((item, i) => (
                    <Typography
                      key={i}
                      sx={{
                        mb: 1,
                        color: "#444",
                        fontSize: "0.95rem",
                      }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* الصورة */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={sector.image}
                alt={sector.title}
                sx={{
                  width: "100%",
                  height: { xs: 220, md: "100%" },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Qta;