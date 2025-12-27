import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

const Wadi = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_WADI_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_WADI_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_WADI_ENVIRONMENT;

  const locales = ["en-US", "ar"]; // جميع الـ Locales

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        let allEntries = [];

        for (const locale of locales) {
          const res = await fetch(
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
                    wadiCollection(limit: 50, locale: "${locale}") {
                      items {
                        sys { id }
                        wadi {
                          url
                      
                        }
                      }
                    }
                  }
                `,
              }),
            }
          );

          const result = await res.json();
          console.log(`Contentful Response for locale ${locale}:`, result);

          const items = result?.data?.wadiCollection?.items || [];
          items.forEach((item) => {
            const hasImage = !!item.wadi?.url;
            console.log(`Entry ID: ${item.sys.id} - Image present: ${hasImage}`);
          });

          allEntries = [...allEntries, ...items];
        }

        setEntries(allEntries);
      } catch (err) {
        console.error("Error fetching Wadi entries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : entries.length === 0 ? (
        <Typography align="center" variant="h6">
          لا يوجد محتوى منشور
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {entries.map((item, i) => {
            const image = item.wadi;
            const url =
              image?.url && image.url.startsWith("//")
                ? `https:${image.url}`
                : image?.url;

            return (
              <Grid item xs={12} sm={6} md={4} key={item.sys.id || i}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: 6,
                    position: "relative",
                    height: 300,
                    width: 250, // عرض الكارد
                    mx: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      url
                        ? url
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={image?.title || "Wadi"}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {(image?.title || image?.description) && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        p: 1.5,
                        textAlign: "center",
                      }}
                    >
                      {image?.title && (
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          {image.title}
                        </Typography>
                      )}
                      {image?.description && (
                        <Typography variant="body2">{image.description}</Typography>
                      )}
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Wadi;
