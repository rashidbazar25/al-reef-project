import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import LoadingDots from "./LoadingDots";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // استخدم import.meta.env لـ Vite
  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
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
                  newsCollection(limit: 5, order: date_DESC) {
                    items {
                      sys { id }
                      titel
                      paragraf { json }
                      date
                      imges { url title description }
                    }
                  }
                }
              `,
            }),
          }
        );
        const data = await response.json();
        setNews(data?.data?.newsCollection?.items || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchNews();
  }, []);

  const getExcerpt = (json) => {
    const text = documentToReactComponents(json)
      .map((el) => (typeof el === "string" ? el : el.props.children))
      .join(" ");
    return text.length > 200 ? text.slice(0, 200) + "..." : text;
  };

  if (loading) return <LoadingDots />;

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      gap={3}
      sx={{ backgroundColor: "#f9f6f2", p: 3 }}
    >
      {news.map((item) => (
        <Card
          key={item.sys.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.03)" },
            height: "100%",
            fontFamily: `"Almarai", sans-serif`,
          }}
        >
          {item.imges?.url && (
            <CardMedia
              component="img"
              sx={{ height: 140, objectFit: "cover" }}
              image={item.imges.url}
              alt={item.imges.title || item.titel}
            />
          )}

          <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 500, color: "#343a62ff" }}
              >
                {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </Typography>

              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#343a62ff", mt: 0.5 }}
              >
                {item.titel}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#777",
                  lineHeight: 1.5,
                  mt: 1,
                }}
              >
                {getExcerpt(item.paragraf.json)}
              </Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Button
                variant="text"
                size="small"
                sx={{ fontWeight: "bold", color: "#343a62ff", textTransform: "none" }}
                component={Link}
                to={`/news/${item.sys.id}`}
              >
                مشاهدة التفاصيل
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default News;
