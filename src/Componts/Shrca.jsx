import React, { useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import { Helmet } from "react-helmet";

import shreek1 from "../assets/shreek1.png";
import shreek2 from "../assets/shreek2.png";
import shreek4 from "../assets/shreek4.jpg";
import shreek5 from "../assets/shreek5.png";
import shreek7 from "../assets/shreek7.jpg";

const Shrca = () => {
  useEffect(() => {
    document.title = "مؤسسة بنت الريف";
  }, []);

  const images = [shreek1, shreek2, shreek4, shreek5, shreek7];

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>مؤسسة بنت الريف</title>
        <meta
          name="description"
          content="شركاؤنا وداعمونا في مؤسسة بنت الريف"
        />
      </Helmet>

      <Container   maxWidth="md"
      sx={{
        my: 6,
        px: "20px !important",}}>
        {/* العنوان */}
        <h2
          style={{
            color: "#000",
            textAlign: "start",
            margin: "8px",
            paddingBottom: "4px",
            borderBottom: "3px solid #eeb60f",
            display: "inline-block",
          }}
        >
          شركاؤنا
        </h2>

        {/* الخلفية */}
        <Box
          sx={{
            backgroundColor: "#f9f6f2",
            py: 5,
            px: 2,
            overflow: "hidden",
            direction: "rtl",
          }}
        >
          {/* شريط متحرك مثل الأخبار */}
          <Box
            sx={{
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "fit-content",
                animation: "ticker 40s linear infinite",
                "@keyframes ticker": {
                  "0%": { transform: "translateX(100%)" },
                  "100%": { transform: "translateX(-100%)" },
                },
              }}
            >
              {[...images, ...images  ].map((img, idx) => (
                <Card
                  key={idx}
                  sx={{
                    mx: 2,
                    minWidth: 220,
                    height: 140,
                    borderRadius: 4,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img}
                    alt={`partner-${idx}`}
                    sx={{
                      maxWidth: "80%",
                      maxHeight: "80%",
                      objectFit: "contain",
                      transition: "0.3s ease",
                    }}
                  />
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mt: 4, borderColor: "#d9d4c9" }} />
      </Container>
    </>
  );
};

export default Shrca;
