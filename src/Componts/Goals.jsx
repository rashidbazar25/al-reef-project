import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Flag,
  Visibility,
  Lightbulb,
  School,
  Balance,
  Verified,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const goals = [
  {
    title: "رسالتنا",
    description: "نسعى إلى توسيع عجلة التنمية وتفعيل دور المرأة.",
    icon: <Flag fontSize="large" />,
  },
  {
    title: "الشفافية",
    description: "نؤمن بالشفافية الكاملة في جميع أعمالنا.",
    icon: <Visibility fontSize="large" />,
  },
  {
    title: "المبادرة والإبداع",
    description: "نبتكر حلولاً جديدة للتحديات المجتمعية.",
    icon: <Lightbulb fontSize="large" />,
  },
  {
    title: "التعليم المستمر",
    description: "نستثمر في التعليم وتطوير المهارات.",
    icon: <School fontSize="large" />,
  },
  {
    title: "العدالة",
    description: "نسعى لتحقيق العدالة والمساواة للجميع.",
    icon: <Balance fontSize="large" />,
  },
  {
    title: "الالتزام",
    description: "نلتزم بتحقيق أهدافنا ووعودنا تجاه المجتمع.",
    icon: <Verified fontSize="large" />,
  },
];

const Goals = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: "100vh",
        background:
          "#f9f6f2",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            align="center"
            fontWeight={800}
            gutterBottom
            sx={{
              color: "#1a1a1a",
              mb: 2,
            }}
          >
            أهداف وقيم المؤسسة
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 4,
              backgroundColor: "#eeb60f",
              mx: "auto",
              borderRadius: 5,
              mb: 3,
            }}
          />

          <Typography
            align="center"
            sx={{
              maxWidth: 750,
              mx: "auto",
              color: "#555",
              fontSize: "1.1rem",
              mb: 8,
              lineHeight: 2,
            }}
          >
            نؤمن بأن التنمية المستدامة تبدأ من الإنسان، ونعمل على تعزيز
            المشاركة المجتمعية وتمكين الفئات الأكثر احتياجاً عبر برامج ومبادرات
            تنموية قائمة على قيم الشفافية والعدالة والإبداع.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {goals.map((goal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -12,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "24px",
                    overflow: "hidden",
                    position: "relative",
                    border: "1px solid rgba(238,182,15,0.15)",
                    background: "#f9f6f2",
                    transition: "all .35s ease",
                    "&:hover": {
                      boxShadow: "0 25px 50px rgba(238,182,15,0.15)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 5,
                      background: "#eeb60f",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 85,
                        height: 85,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #eeb60f, #d49d00)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        mx: "auto",
                        mb: 3,
                        boxShadow: "0 12px 30px rgba(238,182,15,.35)",
                      }}
                    >
                      {goal.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      gutterBottom
                      sx={{
                        color: "#eeb60f",
                        mb: 2,
                      }}
                    >
                      {goal.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#555",
                        lineHeight: 2,
                        fontSize: "1rem",
                      }}
                    >
                      {goal.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Goals;