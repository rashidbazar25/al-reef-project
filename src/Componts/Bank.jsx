import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Container,
  Divider,
} from "@mui/material";
import { ContentCopy, CheckCircle } from "@mui/icons-material";
import { Helmet } from "react-helmet";

const Bank = () => {

  useEffect(() => {
    document.title = "  مؤسسة بنت الريف  ";
    const meta =
      document.querySelector("meta[name='description']") ||
      document.createElement("meta");
    meta.name = "description";
    meta.content =
      "مرحبًا بكم في موقعنا لتتعرف اكثر عن مؤسسة بنت الريف";
    if (!document.head.contains(meta)) document.head.appendChild(meta);
  }, []);


  const banksData = [
    { name: "بنك الكريمي", account: "123456789" },
    { name: "بنك بن دول", account: "98765432111" },
    { name: "بنك البسيري", account: "456123789" },
  ];

  const [copiedIndex, setCopiedIndex] = useState(null);

  const copy = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text.replace(/\s+/g, ""));
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  return (
  <>
  {/* SEO */}
       <Helmet>
        <title> مؤسسة بنت الريف</title>
        <meta
          name="description"
          content="تعرف على رؤية ورسالة مؤسسة بنت الريف وبرامجها المختلفة."
        />
      </Helmet>
    <Container
      maxWidth="md"
      sx={{
        my: 6,
        px: "20px !important", // ✅ مسافة جانبية يمين ويسار 20px
      }}
    >
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
        البنوك
      </h2>

      <Box
        sx={{
          backgroundColor: "#f9f6f2",
          py: 6,
          px: { xs: 2, md: 6 },
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {banksData.map((bank, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  width: "230px",
                  backgroundColor: "#f9f6f2",
                  borderRadius: 4,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#000",
                      letterSpacing: 0.5,
                    }}
                  >
                    {bank.name}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#555",
                      fontSize: "1.05rem",
                      mb: 2,
                      direction: "ltr",
                      fontWeight: 500,
                      fontFamily: "Almarai , sans-serif",
                    }}
                  >
                    {bank.account}
                  </Typography>

                  <Tooltip title="نسخ الرقم">
                    <IconButton
                      onClick={() => copy(bank.account, idx)}
                      sx={{
                        backgroundColor: "#e0e0e0",
                        "&:hover": { backgroundColor: "#d5d5d5" },
                      }}
                    >
                      {copiedIndex === idx ? (
                        <CheckCircle
                          sx={{ color: "#eeb60f", fontSize: "1.5rem" }}
                        />
                      ) : (
                        <ContentCopy />
                      )}
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mt: 4, borderColor: "#d9d4c9" }} />
    </Container>
  </>
  );
};

export default Bank;
