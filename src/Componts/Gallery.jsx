import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_ANOS_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ANOS_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ANOS_ENVIRONMENT;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              query: `
              {
                galleryCollection(order: sys_publishedAt_DESC) {
                  items {
                    sys {
                      id
                    }
                    paragraf {
                      json
                    }
                    imges {
                      url
                      title
                    }
                  }
                }
              }
            `,
            }),
          }
        );

        const data = await response.json();

        setGallery(
          data?.data?.galleryCollection?.items || []
        );
      } catch (error) {
        console.error("Gallery Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#eeb60f" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 10,
        background:
          "linear-gradient(to bottom, #fafafa, #ffffff)",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          align="center"
          fontWeight={800}
          gutterBottom
          sx={{
            color: "#222",
          }}
        >
          معرض الصور
        </Typography>

        <Box
          sx={{
            width: 90,
            height: 4,
            background: "#eeb60f",
            mx: "auto",
            mb: 8,
            borderRadius: 20,
          }}
        />

        <Grid container spacing={4}>


          {gallery.map((item, index) => {
            const image = item.imges?.url || "";

            const title =
              item.paragraf?.json?.content?.[0]?.content?.[0]
                ?.value || "معرض الصور";

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.sys.id}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: "24px",
                      overflow: "hidden",
                      border:
                        "1px solid rgba(238,182,15,.15)",
                      backgroundColor: "#fff",
                      transition: "all .35s ease",
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,.08)",

                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow:
                          "0 20px 50px rgba(0,0,0,.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={image}
                        alt={title}
                        sx={{
                          height: 280,
                          objectFit: "cover",
                          transition: ".6s",

                          "&:hover": {
                            transform: "scale(1.08)",
                          },
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        textAlign: "center",
                        py: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          color: "#333",
                          lineHeight: 1.8,
                        }}
                      >
                        {title}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}




        </Grid>
      </Container>
    </Box>
  );
};

export default Gallery;