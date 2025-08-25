import React, { useEffect } from "react";
import { Box, Grid, Typography, Container, Divider } from "@mui/material";
import { Gavel, ShieldCheck, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const cards = [
  {
    icon: <Handshake size={32} color="#000" />,
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
    icon: <ShieldCheck size={32} color="#000" />,
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
    icon: <Gavel size={32} color="#000" />,
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

export default function OurWorks() {

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


  return (
 <>
     <Helmet>
                <title> مؤسسة بنت الريف</title>
                <meta
                  name="description"
                  content="تعرف على رؤية ورسالة مؤسسة بنت الريف وبرامجها المختلفة."
                />
              </Helmet>
    <Container maxWidth="md" sx={{ my: 6 }}>
   <h2 style={{textAlign:"start" ,
     color :"#000",
      marginBottom:"50px",
       fontWeight:"bold" ,
        paddingBottom: "4px",      
              borderBottom: "3px solid #eeb60f", 
             display: "inline-block", 
        }}>قـطاعات عمــلنــا</h2>

      <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f9f6f2" }}>
        <Grid container spacing={2} justifyContent="space-between"> {/* مسافة صغيرة جدًا */}
          {cards.map((card, index) => (
            <Grid
              item
              xs={12}   // شاشة صغيرة → كارد واحد
              sm={6}    // شاشة متوسطة → كاردين
              md={4}    // شاشة كبيرة → ثلاثة كروت في الصف
              key={index}
              sx={{ display: "flex", justifyContent: "center" ,alignItems:"center" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    
                    width: 250,
                    height: 380,
                    borderRadius: 3,
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
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
                      {card.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>

                  {/* محتوى الكارد */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      backgroundColor: "#f9f6f2",
                      p: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "right",
                        mt: 2,
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        color: "#555",
                        mb: 2,
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
                            fontSize: "1rem",
                            mb: 2, // زيادة المسافة بين النقاط
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2, // إذا حبيت مسافة بين الرمز • والنص
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
      <Divider sx={{ mt: 4, borderColor: "#d9d4c9" }} />
    </Container>
 </>
  );
}
