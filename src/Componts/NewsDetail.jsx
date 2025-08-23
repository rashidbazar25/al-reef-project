import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Box, Typography } from "@mui/material";
import LoadingDots from "./LoadingDots";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/.netlify/functions/fetchNews?id=${id}`);
        const data = await response.json();
        setNews(data?.data?.newsCollection?.items[0] || null);
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setNews(null);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchNewsDetail();
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

      <Box>{documentToReactComponents(news.paragraf.json)}</Box>
    </Box>
  );
};

export default NewsDetail;
