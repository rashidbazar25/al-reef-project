import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openVideo, setOpenVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState({});

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_video_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_video_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_video_ENVIRONMENT;

  const getVideoUrl = (url) => {
    if (!url) return "";
    return url.startsWith("//") ? `https:${url}` : url;
  };

  const generateThumbnail = (videoUrl) => {
    return new Promise((resolve) => {
      if (!videoUrl) return resolve("");

      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.currentTime = 1;

      video.onloadeddata = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0);

          resolve(canvas.toDataURL("image/jpeg"));
        } catch {
          resolve("");
        }
      };

      video.onerror = () => resolve("");
    });
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
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
                videoCollection(order: sys_publishedAt_DESC) {
                  items {
                    sys { id }
                    titel { json }
                    video { url title }
                  }
                }
              }
              `,
            }),
          }
        );

        const data = await res.json();

        const items = data?.data?.videoCollection?.items || [];
        setVideos(items);

        const thumbs = {};

        for (const item of items) {
          const raw = item.video?.url;
          if (!raw) continue;

          const url = getVideoUrl(raw);
          thumbs[item.sys.id] = await generateThumbnail(url);
        }

        setThumbnails(thumbs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: "#eeb60f" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, background: "#fafafa" }}>
      <Container maxWidth="xl">

        {/* TITLE */}
        <Typography variant="h3" textAlign="center" fontWeight={800}>
          معرض الفيديوهات
        </Typography>

        <Box
          sx={{
            width: 110,
            height: 4,
            background: "#eeb60f",
            mx: "auto",
            mb: 8,
            borderRadius: 10,
          }}
        />

        {/* GRID */}
        <Grid container spacing={4} justifyContent="center">

          {videos.map((item) => {
            const videoUrl = getVideoUrl(item.video?.url);

            const title =
              item.titel?.json
                ? documentToReactComponents(item.titel.json)
                : "بدون عنوان";

            const thumb = thumbnails[item.sys.id];

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.sys.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card
                    onClick={() => setOpenVideo(videoUrl)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                      transition: "0.3s",

                      width: 320,   // 🔥 FIXED WIDTH (حل المشكلة نهائياً)
                      flexShrink: 0,

                      "&:hover": {
                        transform: "translateY(-6px)",
                      },
                    }}
                  >

                    {/* THUMBNAIL */}
                    <Box
                      sx={{
                        height: 220,
                        width: "100%",
                        position: "relative",
                        backgroundImage: thumb
                          ? `url(${thumb})`
                          : "linear-gradient(135deg,#111,#333)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* play */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0,0,0,0.3)",
                          color: "#fff",
                          fontSize: 42,
                        }}
                      >
                        ▶
                      </Box>
                    </Box>

                    {/* TITLE */}
                    <CardContent>
                      <Typography textAlign="center" fontWeight={700}>
                        {title}
                      </Typography>
                    </CardContent>

                  </Card>
                </motion.div>
              </Grid>
            );
          })}

        </Grid>

        {/* FULLSCREEN */}
        <Dialog
          fullScreen
          open={Boolean(openVideo)}
          onClose={() => setOpenVideo(null)}
        >
          <Box
            sx={{
              position: "relative",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* background */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg,#000,#222)",
                filter: "blur(18px)",
                transform: "scale(1.2)",
              }}
            />

            {/* overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
              }}
            />

            {/* close */}
            <IconButton
              onClick={() => setOpenVideo(null)}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                color: "#fff",
                zIndex: 10,
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* video */}
            {openVideo && (
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: "90%",
                  maxWidth: 900,
                }}
              >
                <video
                  src={openVideo}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    boxShadow: "0 25px 70px rgba(0,0,0,0.6)",
                  }}
                />
              </Box>
            )}
          </Box>
        </Dialog>

      </Container>
    </Box>
  );
};

export default Videos;