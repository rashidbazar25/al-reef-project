import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const NewsBar = ({ navbarHeight = 64 }) => {
  const [opacity, setOpacity] = useState(1);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // الطول الفعلي للشاشة ناقص ارتفاع النافبار
      const screenHeight = window.innerHeight - navbarHeight;
      const halfScreen = screenHeight / 2;

      if (scrollY <= halfScreen) {
        setOpacity(1);
      } else if (scrollY > halfScreen && scrollY <= screenHeight) {
        const ratio = 1 - (scrollY - halfScreen) / halfScreen;
        setOpacity(ratio);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarHeight]);

  // جلب الأخبار
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
                  newsCollection(limit: 5, order: date_DESC) {
                    items {
                      sys { id }
                      titel
                    }
                  }
                }
              `,
            }),
          }
        );

        const data = await response.json();
        setTitles(data?.data?.newsCollection?.items || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    titles.length > 0 && (
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 0.4 }}
      >
        <Box
          sx={{
            backgroundColor: "#eeb60f",
            color: "#000",
            py: 1,
            fontWeight: 500,
            fontSize: "0.95rem",
            position: "sticky",
            top: navbarHeight, // 👈 يتأثر بالـ Navbar
            zIndex: 1000,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            {titles.map((news) => (
              <Typography
                key={news.sys.id}
                variant="body2"
                component="span"
                sx={{ mx: 4 }}
              >
                📰 {news.titel}
              </Typography>
            ))}
          </motion.div>
        </Box>
      </motion.div>
    )
  );
};

export default NewsBar;
