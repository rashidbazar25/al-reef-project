import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Gavel, ShieldCheck, Handshake } from "lucide-react";
import { motion } from "framer-motion"; // استيراد framer-motion

const cards = [
  {
    icon: <Handshake size={32} color="#343a62" />,
    title: "قطاع الرعاية المجتمعية",
    desc: "يركز هذا القطاع على توفير الرعاية الشاملة للمجتمع المحلي، مع التركيز على الفئات الأكثر احتياجاً.",
    points: [
      "برامج الدعم الغذائي",
      "الرعاية الصحية الأولية",
      "دعم الأسر المتعففة",
      "برامج كفالة الأيتام",
    ],
  },
  {
    icon: <ShieldCheck size={32} color="#343a62" />,
    title: "قطاع الحماية والتمكين",
    desc: "يهدف إلى حماية المرأة والطفل وتمكينهما من خلال برامج التدريب والتأهيل المهني.",
    points: [
      "برامج التدريب المهني",
      "المشاريع الصغيرة والمتوسطة",
      "برامج محو الأمية",
      "التوعية الصحية والاجتماعية",
    ],
  },
  {
    icon: <Gavel size={32} color="#343a62" />,
    title: "قطاع الحقوق",
    desc: "يعمل على نشر الوعي الحقوقي وحماية حقوق المرأة والطفل في المجتمع.",
    points: [
      "التوعية الحقوقية",
      "الاستشارات القانونية",
      "حملات المناصرة",
      "التدريب على الحقوق",
    ],
  },
];

export default function ThreeCardsSection() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f9f6f2" }}>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {/* إضافة motion.div */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <Box
                sx={{
                  width: 280,
                  height: 400,
                  borderRadius: 3,
                  boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ backgroundColor: "#343a62", color: "#fff", p: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 1,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {card.title}
                  </Typography>
                </Box>

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
                    sx={{
                      textAlign: "right",
                      mt: 1,
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#555",
                      marginBottom: "25px",
                    }}
                  >
                    {card.desc}
                  </Typography>

                  {card.points.map((point, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        color: "#555",
                        fontSize: "14px",
                        mb: idx !== card.points.length - 1 ? 1 : 0,
                      }}
                    >
                      • {point}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
