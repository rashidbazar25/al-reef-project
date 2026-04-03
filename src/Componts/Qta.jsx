import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Container, Divider } from "@mui/material";
import { Gavel, ShieldCheck, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Qta = () => {
  const { section } = useParams();

  const data = {
    care: {
      title: "قطاع الرعاية المجتمعية",
      desc: "يركز هذا القطاع على توفير الرعاية الشاملة للمجتمع المحلي، مع التركيز على الفئات الأكثر احتياجاً.",
      points: [
        "برامج الدعم الغذائي",
        "الرعاية الصحية الأولية",
        "دعم الأسر المتعففة",
        "برامج كفالة الأيتام",
      ],
      icon: <Handshake size={32} color="#000" />,
    },
    empowerment: {
      title: "قطاع الحماية والتمكين",
      desc: "يهدف إلى حماية المرأة والطفل وتمكينهما من خلال برامج التدريب والتأهيل المهني.",
      points: [
        "برامج التدريب المهني",
        "المشاريع الصغيرة والمتوسطة",
        "برامج محو الأمية",
        "التوعية الصحية والاجتماعية",
      ],
      icon: <ShieldCheck size={32} color="#000" />,
    },
    rights: {
      title: "قطاع الحقوق",
      desc: "يعمل على نشر الوعي الحقوقي وحماية حقوق المرأة والطفل في المجتمع.",
      points: [
        "التوعية الحقوقية",
        "الاستشارات القانونية",
        "حملات المناصرة",
        "التدريب على الحقوق",
      ],
      icon: <Gavel size={32} color="#000" />,
    },
    institute: {
      title: "المعهد العربي",
      desc: "يقدم برامج تدريبية وتأهيلية متقدمة.",
      points: [
        "الدورات التدريبية المتخصصة",
        "ورش العمل العملية",
        "التأهيل المهني للشباب",
        "التعليم المستمر والتطوير",
      ],
      icon: <Handshake size={32} color="#000" />,
    },
  };

  const current = data[section];

  useEffect(() => {
    if (current) {
      document.title = current.title;
    } else {
      document.title = "مؤسسة بنت الريف";
    }
  }, [current]);

  if (!current) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4">القسم غير موجود</Typography>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{current.title}</title>
        <meta name="description" content={current.desc} />
      </Helmet>

      <Container maxWidth="md" sx={{ my: 6 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "start",
            color: "#000",
            marginBottom: "50px",
            fontWeight: "bold",
            paddingBottom: "4px",
            borderBottom: "3px solid #eeb60f",
            display: "inline-block",
          }}
        >
          {current.title}
        </Typography>

        <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f9f6f2" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    width: 300,
                    minHeight: 380,
                    borderRadius: 3,
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "default",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {/* رأس الكارد */}
                  <Box sx={{ backgroundColor: "#eeb60f", color: "#000", p: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 1,
                      }}
                    >
                      {current.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}
                    >
                      {current.title}
                    </Typography>
                  </Box>

                  {/* محتوى الكارد */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      backgroundColor: "#f9f6f2",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "right", mt: 2, fontSize: "0.85rem", fontWeight: 600, color: "#555", mb: 2 }}
                    >
                      {current.desc}
                    </Typography>

                    {current.points.map((point, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          color: "#555",
                          fontSize: "1rem",
                          mb: 2,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        • {point}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mt: 4, borderColor: "#d9d4c9" }} />
      </Container>
    </>
  );
};

export default Qta;