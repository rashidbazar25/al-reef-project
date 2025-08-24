import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Box, Typography } from "@mui/material";
import LoadingDots from "./LoadingDots";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

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
                  newsCollection(where: { sys: { id: "${id}" } }, limit: 1) {
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
        setNews(data?.data?.newsCollection?.items[0] || null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews(null);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <LoadingDots />;

  if (!news)
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        لا يوجد خبر لعرضه
      </Typography>
    );

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        p: 2,
        backgroundColor: "#f9f6f2",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        {news.titel}
      </Typography>

      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ mb: 2, display: "block" }}
      >
        {new Date(news.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Typography>

      {news.imges?.url && (
        <Box
          component="img"
          src={news.imges.url}
          alt={news.imges.title || news.titel}
          sx={{ width: "100%", mb: 2, borderRadius: 2 }}
        />
      )}

<Box sx={{ mt: 2, "& p": { mb: 2, lineHeight: 1.8, fontSize: "1rem", color: "#333" } }}>
  {documentToReactComponents(news.paragraf.json)}
</Box>    </Box>
  );
};

export default NewsDetail;
