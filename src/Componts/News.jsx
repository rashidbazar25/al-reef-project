import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Divider,
} from "@mui/material";
import LoadingDots from "./LoadingDots";

const News = () => {
  // ==============================
  // SEO
  // ==============================
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

  // ==============================
  // State
  // ==============================
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // Contentful
  // ==============================
  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN =
    import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const ENVIRONMENT =
    import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

  // ==============================
  // التاريخ
  // ==============================
  const formatDate = (date) => {
    if (!date) {
      return "بدون تاريخ";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "تاريخ غير صالح";
    }

    return parsedDate.toLocaleDateString("ar-YE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ==============================
  // جلب الأخبار
  // ==============================
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        console.log(
          "========== CONTENTFUL CONFIG =========="
        );

        console.log("SPACE_ID:", SPACE_ID);
        console.log("ENVIRONMENT:", ENVIRONMENT);

        console.log(
          "ACCESS_TOKEN موجود:",
          ACCESS_TOKEN ? "YES" : "NO"
        );

        console.log(
          "======================================"
        );

        // ==========================================
        // اختبار بسيط جدًا
        // فقط ID + العنوان + التاريخ
        // ==========================================
        const query = `
          {
            newsCollection(limit: 5) {
              items {
                sys {
                  id
                }
                titel
                date
              }
            }
          }
        `;

        console.log(
          "========== CONTENTFUL QUERY =========="
        );

        console.log(query);

        console.log(
          "======================================"
        );

        // ==========================================
        // الطلب
        // ==========================================
        const response = await fetch(
          `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },

            body: JSON.stringify({
              query,
            }),
          }
        );

        // ==========================================
        // HTTP
        // ==========================================
        console.log(
          "CONTENTFUL HTTP STATUS:",
          response.status
        );

        console.log(
          "CONTENTFUL RESPONSE OK:",
          response.ok
        );

        // ==========================================
        // قراءة الرد
        // ==========================================
        const data = await response.json();

        // ==========================================
        // الرد الكامل
        // ==========================================
        console.log(
          "========== CONTENTFUL RESPONSE =========="
        );

        console.log(
          JSON.stringify(data, null, 2)
        );

        console.log(
          "========================================="
        );

        // ==========================================
        // الأخطاء
        // ==========================================
        if (data?.errors) {
          console.error(
            "========== CONTENTFUL ERRORS =========="
          );

          console.error(
            JSON.stringify(
              data.errors,
              null,
              2
            )
          );

          console.error(
            "======================================="
          );
        }

        // ==========================================
        // الأخبار
        // ==========================================
        const items =
          data?.data?.newsCollection?.items || [];

        console.log(
          "========== NEWS ITEMS =========="
        );

        console.log(items);

        console.log(
          "NEWS COUNT:",
          items.length
        );

        console.log(
          "================================"
        );

        // ==========================================
        // عرض الأخبار في Console
        // ==========================================
        items.forEach((item, index) => {
          console.log(
            `NEWS ${index + 1}:`,
            {
              id: item?.sys?.id,
              title: item?.titel,
              date: item?.date,
            }
          );
        });

        // ==========================================
        // حفظ الأخبار
        // ==========================================
        setNews(items);
      } catch (error) {
        console.error(
          "========== FETCH NEWS ERROR =========="
        );

        console.error(error);

        console.error(
          "======================================"
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

  // ==============================
  // Loading
  // ==============================
  if (loading) {
    return <LoadingDots />;
  }

  // ==============================
  // الصفحة
  // ==============================
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
              key={item?.sys?.id}
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
                      color: "#343a62",
                    }}
                  >
                    {formatDate(item?.date)}
                  </Typography>

                  {/* العنوان */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#343a62",
                      mt: 0.5,
                    }}
                  >
                    {item?.titel || "بدون عنوان"}
                  </Typography>
                </Box>

                {/* التفاصيل */}
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="text"
                    size="small"
                    component={Link}
                    to={`/news/${item?.sys?.id}?type=news`}
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
                        color: "#bda355",
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

        {news.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              color: "#777",
            }}
          >
            <Typography>
              لا توجد أخبار لعرضها
            </Typography>
          </Box>
        )}

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