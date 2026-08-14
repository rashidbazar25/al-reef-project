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
  const [wadi, setWadi] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // SEO
  // =========================
  useEffect(() => {
    document.title =
      "معهد الوادي العربي | مؤسسة بنت الريف";

    const meta =
      document.querySelector(
        "meta[name='description']"
      ) || document.createElement("meta");

    meta.name = "description";

    meta.content =
      "معهد الوادي العربي - آخر الأخبار والأنشطة والبرامج التعليمية.";

    if (!document.head.contains(meta)) {
      document.head.appendChild(meta);
    }
  }, []);

  // =========================
  // Contentful
  // =========================

  const SPACE_ID =
    import.meta.env.VITE_CONTENTFUL_wadi_SPACE_ID;

  const ACCESS_TOKEN =
    import.meta.env.VITE_CONTENTFUL_wadi_ACCESS_TOKEN;

  const ENVIRONMENT =
    import.meta.env.VITE_CONTENTFUL_wadi_ENVIRONMENT;

  // =========================
  // جلب الأخبار من Contentful
  // =========================

  useEffect(() => {
    const fetchWadi = async () => {
      try {
        setLoading(true);

        const query = `
          query {
            newsCollection(
              limit: 5
              order: dateAndTime_DESC
            ) {
              items {

                sys {
                  id
                }

                titel {
                  json
                }

                paragraf

                dateAndTime

                imges {
                  url
                  title
                  description
                }
              }
            }
          }
        `;

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

        const data = await response.json();

        // =========================
        // Console
        // =========================

        console.log(
          "========== CONTENTFUL WADI =========="
        );

        console.log("Response:", data);

        console.log("Errors:", data?.errors);

        console.log(
          "News:",
          data?.data?.newsCollection?.items
        );

        console.log(
          "عدد الأخبار:",
          data?.data?.newsCollection?.items
            ?.length || 0
        );

        console.log(
          "===================================="
        );

        // =========================
        // GraphQL Error
        // =========================

        if (data?.errors) {
          console.error(
            "Contentful GraphQL Error:",
            JSON.stringify(
              data.errors,
              null,
              2
            )
          );

          setWadi([]);

          return;
        }

        // =========================
        // الأخبار
        // =========================

        const items =
          data?.data?.newsCollection?.items || [];

        setWadi(items);
      } catch (error) {
        console.error(
          "Wadi Fetch Error:",
          error
        );

        setWadi([]);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchWadi();
  }, [
    SPACE_ID,
    ACCESS_TOKEN,
    ENVIRONMENT,
  ]);

  // =========================
  // استخراج النص من Rich Text
  // =========================

  const getExcerpt = (json) => {
    if (!json) return "";

    try {
      const components =
        documentToReactComponents(json);

      const text = components
        .map((el) => {
          if (typeof el === "string") {
            return el;
          }

          if (el?.props?.children) {
            if (
              Array.isArray(
                el.props.children
              )
            ) {
              return el.props.children
                .filter(
                  (child) =>
                    typeof child ===
                    "string"
                )
                .join(" ");
            }

            if (
              typeof el.props.children ===
              "string"
            ) {
              return el.props.children;
            }
          }

          return "";
        })
        .join(" ");

      return text.length > 200
        ? text.slice(0, 200) + "..."
        : text;
    } catch (error) {
      console.error(
        "Error extracting text:",
        error
      );

      return "";
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return <LoadingDots />;
  }

  // =========================
  // الصفحة
  // =========================

  return (
    <>
      {/* =========================
          SEO
      ========================= */}

      <Helmet>
        <title>
          معهد الوادي العربي | مؤسسة بنت الريف
        </title>

        <meta
          name="description"
          content="معهد الوادي العربي - آخر الأخبار والأنشطة والبرامج التعليمية."
        />
      </Helmet>

      <Container>
        {/* =========================
            عنوان الصفحة
        ========================= */}

        <h2
          style={{
            textAlign: "start",
            color: "#343a62",
            marginBottom: "50px",
            fontWeight: "bold",
            paddingBottom: "4px",
            borderBottom:
              "3px solid #343a62ff",
            display: "inline-block",
          }}
        >
          معهد الوادي العربي
        </h2>

        {/* =========================
            الأخبار
        ========================= */}

        {wadi.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 5,
              color: "#777",
              fontFamily:
                `"Almarai", sans-serif`,
            }}
          >
            <Typography variant="h6">
              لا توجد أخبار حاليًا
            </Typography>
          </Box>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
            gap={2}
            sx={{
              backgroundColor: "#f9f6f2",
            }}
          >
            {wadi.map((item) => (
              <Card
                key={item.sys.id}
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  boxShadow: 1,
                  borderRadius: 3,
                  backgroundColor:
                    "#f9f6f2",
                  maxWidth: 350,
                  width: "100%",
                  fontFamily:
                    `"Almarai", sans-serif`,
                }}
              >
                {/* =========================
                    الصورة
                ========================= */}

                {item.imges?.url && (
                  <CardMedia
                    component="img"
                    sx={{
                      height: 140,
                      objectFit:
                        "cover",
                    }}
                    image={
                      item.imges.url
                    }
                    alt={
                      item.imges.title ||
                      "معهد الوادي العربي"
                    }
                  />
                )}

                {/* =========================
                    المحتوى
                ========================= */}

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection:
                      "column",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <Box>
                    {/* =========================
                        التاريخ
                    ========================= */}

                    {item.dateAndTime && (
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 500,
                          color:
                            "#343a62ff",
                          mb: 0.5,
                        }}
                      >
                        {new Date(
                          item.dateAndTime
                        ).toLocaleDateString(
                          "ar-YE",
                          {
                            year: "numeric",
                            month:
                              "long",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    )}

                    {/* =========================
                        العنوان
                    ========================= */}

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight:
                          "bold",
                        color:
                          "#343a62ff",
                        mt: 0.5,
                      }}
                    >
                      {item.titel?.json
                        ? getExcerpt(
                            item.titel
                              .json
                          )
                        : "بدون عنوان"}
                    </Typography>

                    {/* =========================
                        الوصف
                    ========================= */}

                    {item.paragraf && (
                      <Typography
                        variant="body2"
                        sx={{
                          display:
                            "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient:
                            "vertical",
                          overflow:
                            "hidden",
                          textOverflow:
                            "ellipsis",
                          color: "#777",
                          lineHeight: 1.5,
                          mt: 1,
                        }}
                      >
                        {item.paragraf}
                      </Typography>
                    )}
                  </Box>

                  {/* =========================
                      التفاصيل
                  ========================= */}

                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="text"
                      size="small"
                      component={Link}
                      to={`/wadi/${item.sys.id}?type=wadi`}
                      sx={{
                        fontSize:
                          "18px",
                        fontWeight:
                          "bold",
                        color:
                          "#eeb60f",
                        textTransform:
                          "none",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        transition:
                          "all 0.3s ease",

                        "&:hover": {
                          backgroundColor:
                            "#f0e6ff",
                          color:
                            "#bda355ff",
                        },
                      }}
                    >
                      مـشــاهـدة
                      التـفاصـيل
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* =========================
            Divider
        ========================= */}

        <Divider
          sx={{
            mt: 4,
            borderColor:
              "#d9d4c9",
          }}
        />
      </Container>
    </>
  );
};

export default Wadi;