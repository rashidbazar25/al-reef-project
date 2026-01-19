import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Helmet } from "react-helmet";

import shreek1 from "../assets/shreek1.png";
import shreek2 from "../assets/shreek2.png";
import shreek4 from "../assets/shreek4.jpg";
import shreek5 from "../assets/shreek5.png";
import shreek7 from "../assets/shreek7.jpg";

const Shrca = () => {
  const images = [shreek1, shreek2, shreek4, shreek5, shreek7];
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Helmet>
        <title>مؤسسة بنت الريف</title>
        <meta
          name="description"
          content="شركاؤنا وداعمونا في مؤسسة بنت الريف"
        />
      </Helmet>

      <Container       maxWidth="md"
      sx={{
        my: 6,
        px: "20px !important", // ✅ مسافة جانبية يمين ويسار 20px
      }}
    >



        <h2
          style={{
            color: "#000",
            margin: "8px",
            paddingBottom: "4px",
            borderBottom: "3px solid #eeb60f",
            display: "inline-block",
            textAlign:"start"
          }}
        >
          شركاؤنا
        </h2>

        <Box
          sx={{
            backgroundColor: "#f9f6f2",
            py: 4,
            px: 2,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* سهم يسار */}
          <IconButton
            onClick={prev}
            sx={{
              position: "absolute",
              left: 8,
              backgroundColor: "#fff",
              boxShadow: 2,
            }}
          >
            <ArrowBackIos />
          </IconButton>

          {/* الكرت */}
          <Card
            sx={{
              width: 260,
              height: 160,
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={images[index]}
              alt={`partner-${index}`}
              sx={{
                maxWidth: "80%",
                maxHeight: "80%",
                objectFit: "contain",
              }}
            />
          </Card>

          {/* سهم يمين */}
          <IconButton
            onClick={next}
            sx={{
              position: "absolute",
              right: 8,
              backgroundColor: "#fff",
              boxShadow: 2,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

        <Divider sx={{ mt: 4 }} />
      </Container>
    </>
  );
};

export default Shrca;
