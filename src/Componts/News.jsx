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

const News = () => {
  useEffect(() => {
    document.title = "مؤسسة بنت الريف";

    const meta =
      document.querySelector("meta[name='description']") ||
      document.createElement("meta");

    meta.name = "description";
    meta.content =
      "مرحبًا بكم في موقعنا لتتعرف اكثر عن مؤسسة بنت الريف";

    if (!document.head.contains(meta)) {
      document.head.appendChild(meta);
    }
  }, []);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

  // ==========================================
  // تنسيق التاريخ بشكل آمن
  // ==========================================
  const formatDate = (date) => {
    if (!date) return "بدون تاريخ";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "تاريخ غير صالح";
    }

    return parsedDate.toLocaleDateString("ar-YE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ==========================================
  // جلب الأخبار
  // ==========================================
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
                      sys {
                        id
                      }
                      titel
                      paragraf {
                        json
                      }
                      date
                      imges {
                        url
                        title
                        description
                      }
                    }
                  }
                }
              `,
            }),
          }
        );

        const data = await response.json();

        // إظهار أخطاء Contentful في Console
        if (data.errors) {
          console.error("Contentful GraphQL Errors:", data.errors);
          throw new Error(
            data.errors[0]?.message || "Contentful GraphQL Error"
          );
        }

        const items = data?.data?.newsCollection?.items || [];

        // عرض الأخبار التي وصلت من Contentful للتأكد من التواريخ
        console.log(
          "News:",
          items.map((item) => ({
            id: item.sys.id,
            title: item.titel,
            date: item.date,
          }))
        );

        setNews(items);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchNews();
  }, [SPACE_ID, ACCESS_TOKEN, ENVIRONMENT]);

  // ==========================================
  // استخراج ملخص الخبر
  // ==========================================
  const getExcerpt = (json) => {
    if (!json) return "";

    try {
      const text = documentToReactComponents(json)
        .map((el) => {
          if (typeof el === "string") {
            return el;
          }

          return el?.props?.children || "";
        })
        .join(" ");

      return text.length > 200 ? text.slice(0, 200) + "..." : text;
    } catch (error) {
      console.error("Error reading news content:", error);
      return "";
    }
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return <LoadingDots />;
  }

  return (
    <>
      <Container>
        <h2
          style={{
            textAlign: "start",
            color: "#343a62",
            marginBottom: "50px",
            fontWeight: "bold",
            paddingBottom: "4px",
            borderBottom: "3px solid #343a62ff",
            display: "inline-block",
          }}
        >
          آخر الأخـبـار
        </h2>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
          gap={2}
          sx={{
            backgroundColor: "#f9f6f2",
          }}
        >
          {news.map((item) => (
            <Card
              key={item.sys.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: 1,
                borderRadius: 3,
                backgroundColor: "#f9f6f2",
                maxWidth: 350,
                width: "100%",
                fontFamily: `"Almarai", sans-serif`,
              }}
            >
              {item.imges?.url && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 140,
                    objectFit: "cover",
                  }}
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
                  {/* التاريخ */}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      color: "#343a62ff",
                    }}
                  >
                    {formatDate(item.date)}
                  </Typography>

                  {/* عنوان الخبر */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#343a62ff",
                      mt: 0.5,
                    }}
                  >
                    {item.titel}
                  </Typography>

                  {/* ملخص الخبر */}
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
                    {getExcerpt(item.paragraf?.json)}
                  </Typography>
                </Box>

                {/* زر التفاصيل */}
                <Box sx={{ mt: 1 }}>
                  <Button
                    variant="text"
                    size="small"
                    component={Link}
                    to={`/news/${item.sys.id}?type=news`}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#eeb60f",
                      textTransform: "none",
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      transition: "all 0.3s ease",

                      "&:hover": {
                        backgroundColor: "#f0e6ff",
                        color: "#bda355ff",
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

        <Divider
          sx={{
            mt: 4,
            borderColor: "#d9d4c9",
          }}
        />
      </Container>
    </>
  );
};

export default News;