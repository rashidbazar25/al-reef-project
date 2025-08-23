import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Card, CardMedia, CardContent, Typography, Button, Box , Container} from "@mui/material";

const NewsHome = () => {
  const [news, setNews] = useState([]);

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

  useEffect(() => {
    const fetchNews = async () => {
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
                  newsCollection(limit: 3, order: date_DESC) {
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

 

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <h2 style={{color: "#343a62ff", textAlign:"start" , margin:"8px" }}>آخر الأخبار</h2>
      <Box
        display="grid"
  gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }}
  gap={1} // مسافة صغيرة جدًا بين الكروت
  sx={{ backgroundColor: "#f9f6f2", p: 1 }}
   
      >
        {news.map((item) => (
          <Card
  key={item.sys.id}
  sx={{
    display: "flex",
    flexDirection: "column",
    boxShadow: 1,
    borderRadius: 3,
    backgroundColor: "#ffffff",
    maxWidth: 300,          // تم تقليل العرض
    width: "100%",
    fontFamily: `"Almarai", sans-serif`,
  }}
>
  {item.imges?.url && (
    <CardMedia
      component="img"
      sx={{ height: 120, objectFit: "cover" }} // تم تقليل الارتفاع
      image={item.imges.url}
      alt={item.imges.title || item.titel}
    />
  )}

  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 1.5 }}>
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 500, color: "#343a62ff", fontSize: "0.85rem" }}
      >
        {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#343a62ff", mt: 0.5, fontSize: "1rem" }}
      >
        {item.titel}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 3, // قلل عدد الأسطر للنص
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#777",
          lineHeight: 1.4,
          mt: 0.8,
          fontSize: "0.85rem",
        }}
      >
        {getExcerpt(item.paragraf.json)}
      </Typography>
    </Box>

    <Box sx={{ mt: 1 }}>
      <Button
        variant="text"
        size="small"
        component={Link}
        to={`/news/${item.sys.id}`}
        sx={{
          fontSize:"16px",
          fontWeight: "bold",
          color: "#211353ff",
          textTransform: "none",
          borderRadius: 2,
          px: 1.5,
          py: 0.8,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#f0e6ff",
            color: "#211353ff",
          },
        }}
      >
        مـشــاهـدة التـفاصـيل
      </Button>
    </Box>
  </CardContent>
</Card>
        ))}
      </Box>
    </Container>
  );
};

export default NewsHome;
