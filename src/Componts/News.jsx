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
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // SEO
  // =========================
  useEffect(() => {
    document.title = "أخبار مؤسسة بنت الريف";

    let meta = document.querySelector(
      "meta[name='description']"
    );

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      "آخر أخبار وأنشطة وفعاليات مؤسسة بنت الريف.";

    return () => {
      // لا نحذف الـ meta حتى لا يحدث تغيير غير ضروري
    };
  }, []);

  // =========================
  // Contentful
  // =========================
  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN =
    import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const ENVIRONMENT =
    import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master";

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
                  newsCollection(
                    limit: 5
                    order: date_DESC
                  ) {
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

        const result = await response.json();

        if (!response.ok) {
          console.error(
            "Contentful Error:",
            result
          );
          setNews([]);
          return;
        }

        if (result.errors) {
          console.error(
            "Contentful GraphQL Errors:",
            result.errors
          );
          setNews([]);
          return;
        }

        const items =
          result?.data?.newsCollection?.items || [];

        setNews(items);
      } catch (error) {
        console.error(
          "Error fetching news:",
          error
        );

        setNews([]);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchNews();
  }, [SPACE_ID, ACCESS_TOKEN, ENVIRONMENT]);

  // =========================
  // استخراج النص من Rich Text
  // =========================
  const getExcerpt = (json) => {
    if (!json) return "";

    try {
      const extractText = (node) => {
        if (!node) return "";

        if (node.nodeType === "text") {
          return node.value || "";
        }

        if (Array.isArray(node.content)) {
          return node.content
            .map(extractText)
            .join(" ");
        }

        return "";
      };

      const text = extractText(json).replace(
        /\s+/g,
        " "
      ).trim();

      return text.length > 200
        ? `${text.slice(0, 200)}...`
        : text;
    } catch (error) {
      console.error(
        "Error extracting news text:",
        error
      );

      return "";
    }
  };

  // =========================
  // التاريخ
  // =========================
  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Aden",
    });
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f6f2",
        }}
      >
        <LoadingDots />
      </Box>
    );
  }

  return (
    <>
      {/* =========================
          SEO
      ========================= */}
      <Helmet>
        <title>أخبار مؤسسة بنت الريف</title>

        <meta
          name="description"
          content="آخر أخبار وأنشطة وفعاليات مؤسسة بنت الريف."
        />

        <meta
          property="og:title"
          content="أخبار مؤسسة بنت الريف"
        />

        <meta
          property="og:description"
          content="آخر أخبار وأنشطة وفعاليات مؤسسة بنت الريف."
        />
      </Helmet>

      {/* =========================
          News Section
      ========================= */}
      <Container
        sx={{
          backgroundColor: "#f9f6f2",
          py: 4,
        }}
      >
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
                fontFamily:
                  `"Almarai", sans-serif`,
                overflow: "hidden",
              }}
            >
              {/* الصورة */}
              {item.imges?.url && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 140,
                    objectFit: "cover",
                  }}
                  image={item.imges.url}
                  alt={
                    item.imges.title ||
                    item.titel ||
                    "خبر مؤسسة بنت الريف"
                  }
                />
              )}

              {/* محتوى الخبر */}
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent:
                    "space-between",
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

                  {/* العنوان */}
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

                  {/* الملخص */}
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
                    {getExcerpt(
                      item.paragraf?.json
                    )}
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
                      transition:
                        "all 0.3s ease",

                      "&:hover": {
                        backgroundColor:
                          "#f0e6ff",
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