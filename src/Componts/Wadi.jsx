import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Divider,
} from "@mui/material";
import LoadingDots from "./LoadingDots";
import { Helmet } from "react-helmet";

const Wadi = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_WADI_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_WADI_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_WADI_ENVIRONMENT;

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
                  wadiCollection(limit: 5, order: date_DESC) {
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
        console.log(data); // تأكد من البيانات
        setNews(data?.data?.wadiCollection?.items || []);
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
    <>
      <Helmet>
        <title>معهد الوادي العربي | مؤسسة بنت الريف</title>
        <meta
          name="description"
          content="تعرف على آخر الأخبار والمستجدات الخاصة بمعهد الوادي العربي ضمن مؤسسة بنت الريف."
        />
      </Helmet>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "start",
            color: "#343a62",
            marginBottom: "50px",
            fontWeight: "bold",
            paddingBottom: "4px",
            borderBottom: "3px solid #343a62",
            display: "inline-block",
          }}
        >
          آخر الأخبار
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
          gap={2}
          sx={{ backgroundColor: "#f9f6f2", p: 2, borderRadius: 3 }}
        >
          {news.map((item) => (
            <Card
              key={item.sys.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: 1,
                borderRadius: 3,
                backgroundColor: "#fff",
                maxWidth: 350,
                width: "100%",
                fontFamily: `"Almarai", sans-serif`,
                m: "auto",
              }}
            >
              {item.imges?.url && (
                <CardMedia
                  component="img"
                  sx={{ height: 180, objectFit: "cover" }}
                  image={item.imges.url}
                  alt={item.imges.title || item.titel}
                />
              )}

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 500, color: "#343a62" }}
                  >
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#343a62", mt: 0.5 }}
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
                    component={Link}
                    to={`/news/${item.sys.id}?type=wadi`}
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#eeb60f",
                      textTransform: "none",
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#f0e6ff",
                        color: "#55bd6c",
                      },
                    }}
                  >
                    مشاهدة التفاصيل
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Divider sx={{ mt: 4, borderColor: "#d9d4c9" }} />
      </Container>
    </>
  );
};

export default Wadi;