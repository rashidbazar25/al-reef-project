import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, IconButton, Tooltip, Box , Container} from "@mui/material";
import { ContentCopy, CheckCircle } from "@mui/icons-material";

const Bank = () => {
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
    <Container maxWidth="md" sx={{ my: 6 }}>
          <h2 style={{color: "#343a62ff", 
             textAlign:"start" ,
              margin:"8px",
              paddingBottom: "4px",      
              borderBottom: "3px solid #343a62ff", 
             display: "inline-block",   
             }}>البنوك</h2>
        <Box sx={{ backgroundColor: "#f9f6f2", py: 6, px: { xs: 2, md: 6 } }}>
      <Grid container spacing={4} sx={{ direction: "rtl" , display:"flex",justifyContent:"center", alignItems:"center"}}>
        {banksData.map((bank, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                width:"230px",
                backgroundColor:"#f9f6f2",
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
                    color: "#343a62",
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
                    fontFamily: "Almarai , sans-serif"

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
                      <CheckCircle sx={{ color: "green", fontSize: "1.5rem" }} />
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
    </Container>
    
  );
};

export default Bank;
