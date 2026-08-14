import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Helmet } from "react-helmet";

import LoadingDots from "./LoadingDots";

const WadiDetails = () => {
  const { id } = useParams();

  const [wadi, setWadi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
  // جلب الخبر
  // =========================

  useEffect(() => {
    const fetchWadiDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const query = `
          query {
            news(id: "${id}") {
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
          "========== WADI DETAILS =========="
        );

        console.log("ID:", id);
        console.log("Response:", data);
        console.log("Errors:", data?.errors);
        console.log("Wadi:", data?.data?.news);

        console.log(
          "=================================="
        );

        // =========================
        // GraphQL Error
        // =========================

        if (data?.errors) {
          console.error(
            "Contentful Error:",
            JSON.stringify(data.errors, null, 2)
          );

          setError(true);
          return;
        }

        // =========================
        // الخبر
        // =========================

        const item = data?.data?.news;

        if (!item) {
          setError(true);
          return;
        }

        setWadi(item);
      } catch (error) {
        console.error(
          "Wadi Details Error:",
          error
        );

        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    if (id) {
      fetchWadiDetails();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [
    id,
    SPACE_ID,
    ACCESS_TOKEN,
    ENVIRONMENT,
  ]);

  // =========================
  // استخراج النص من Rich Text
  // =========================

  const getTitle = (json) => {
    if (!json) {
      return "بدون عنوان";
    }

    try {
      const components =
        documentToReactComponents(json);

      const extractText = (node) => {
        if (!node) {
          return "";
        }

        if (typeof node === "string") {
          return node;
        }

        if (Array.isArray(node)) {
          return node
            .map((item) => extractText(item))
            .join(" ");
        }

        if (node.props?.children) {
          return extractText(
            node.props.children
          );
        }

        return "";
      };

      return extractText(components).trim();
    } catch (error) {
      console.error(
        "Title Error:",
        error
      );

      return "بدون عنوان";
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return <LoadingDots />;
  }

  // =========================
  // خطأ
  // =========================

  if (error || !wadi) {
    return (
      <Container
        sx={{
          py: 8,
          textAlign: "center",
          direction: "rtl",
          fontFamily:
            `"Almarai", sans-serif`,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#343a62",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          عذرًا، لم يتم العثور على الخبر
        </Typography>

        <Button
          component={Link}
          to="/wadi"
          variant="contained"
          sx={{
            backgroundColor: "#343a62",

            "&:hover": {
              backgroundColor: "#292e52",
            },
          }}
        >
          العودة إلى معهد الوادي العربي
        </Button>
      </Container>
    );
  }

  // =========================
  // البيانات
  // =========================

  const title = getTitle(
    wadi.titel?.json
  );

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
          {title} | معهد الوادي العربي
        </title>

        <meta
          name="description"
          content={
            wadi.paragraf ||
            "معهد الوادي العربي - مؤسسة بنت الريف"
          }
        />
      </Helmet>

      <Container
        maxWidth="md"
        sx={{
          direction: "rtl",
          py: 5,
          fontFamily:
            `"Almarai", sans-serif`,
        }}
      >
        {/* =========================
            العودة
        ========================= */}

        <Button
          component={Link}
          to="/wadi"
          sx={{
            mb: 3,
            color: "#343a62",
            fontWeight: "bold",
          }}
        >
          ← العودة إلى الأخبار
        </Button>

        {/* =========================
            الصورة
        ========================= */}

        {wadi.imges?.url && (
          <CardMedia
            component="img"
            image={wadi.imges.url}
            alt={
              wadi.imges.title ||
              title
            }
            sx={{
              width: "100%",
              maxHeight: 500,
              objectFit: "cover",
              borderRadius: 3,
              mb: 3,
            }}
          />
        )}

        {/* =========================
            التاريخ
        ========================= */}

        {wadi.dateAndTime && (
          <Typography
            variant="subtitle1"
            sx={{
              color: "#343a62",
              fontWeight: 500,
              mb: 1,
            }}
          >
            {new Date(
              wadi.dateAndTime
            ).toLocaleDateString(
              "ar-YE",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </Typography>
        )}

        {/* =========================
            العنوان
        ========================= */}

        <Typography
          variant="h3"
          sx={{
            color: "#343a62",
            fontWeight: "bold",
            lineHeight: 1.5,
            mb: 3,

            "@media (max-width:600px)": {
              fontSize: "28px",
            },
          }}
        >
          {title}
        </Typography>

        <Divider
          sx={{
            mb: 3,
            borderColor: "#d9d4c9",
          }}
        />

        {/* =========================
            الوصف
        ========================= */}

        {wadi.paragraf && (
          <Typography
            sx={{
              color: "#555",
              fontSize: "18px",
              lineHeight: 2,
              mb: 3,
            }}
          >
            {wadi.paragraf}
          </Typography>
        )}

        {/* =========================
            نهاية الصفحة
        ========================= */}

        <Divider
          sx={{
            mt: 4,
            mb: 3,
            borderColor: "#d9d4c9",
          }}
        />

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button
            component={Link}
            to="/wadi"
            variant="contained"
            sx={{
              backgroundColor: "#343a62",
              borderRadius: 2,
              px: 4,
              py: 1.2,
              fontWeight: "bold",

              "&:hover": {
                backgroundColor: "#292e52",
              },
            }}
          >
            جميع أخبار معهد الوادي العربي
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default WadiDetails;