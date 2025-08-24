import { Container, Typography, Grid,Box } from "@mui/material";
import React, { useEffect } from "react";
import { CheckCircle2, Eye, Rocket, BookOpen, Scale, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  useEffect(() => {
    document.title = "الرئيسية | مؤسسة بن الريف | معهد الوادي العربي";
    const meta =
      document.querySelector("meta[name='description']") ||
      document.createElement("meta");
    meta.name = "description";
    meta.content =
      "مرحبًا بكم في من نحن لتتعرف اكثر عن مؤسسة بن الريف";
    if (!document.head.contains(meta)) document.head.appendChild(meta);
  }, []);


  const MotionBox = motion(Box);


    const values = [
    {
      icon: <MessageCircle size={28} color="#fff" strokeWidth={2.5} />,
      title: "رسالتنا",
      text: "نسعى إلى توسيع عجلة التنمية وتفعيل دور المرأة ",
    },
    {
      icon: <Eye size={28} color="#fff" strokeWidth={2.5} />,
      title: "الشفافية",
      text: "نؤمن بالشفافية الكاملة في جميع أعمالنا",
    },
    {
      icon: <Rocket size={28} color="#fff" strokeWidth={2.5} />,
      title: "المبادرة والإبداع",
      text: "نبتكر حلولاً جديدة للتحديات المجتمعية",
    },
    {
      icon: <BookOpen size={28} color="#fff" strokeWidth={2.5} />,
      title: "التعليم المستمر",
      text: "نستثمر في التعليم وتطوير المهارات",
    },
    {
      icon: <Scale size={28} color="#fff" strokeWidth={2.5} />,
      title: "العدالة",
      text: "نسعى لتحقيق العدالة والمساواة للجميع",
    },
    {
      icon: <CheckCircle2 size={28} color="#fff" strokeWidth={2.5} />,
      title: "الالتزام",
      text: "نلتزم بتحقيق أهدافنا ووعودنا تجاه المجتمع",
    },
  ];
  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <h2 style={{textAlign:"start" , 
        color :"#343a62",
         marginBottom:"50px", 
         fontWeight:"bold"  ,
         paddingBottom: "4px",      
           borderBottom: "3px solid #343a62ff", 
          display: "inline-block",
          }}>عن المؤسسة</h2>

      <Box
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.08)",
          backgroundColor: "#f9f6f2",
        }}
      >
        {/* ===== عنوان من نحن ===== */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            sx={{
              width: "4px",
              height: "30px",
              backgroundColor: "#343a62",
              borderRadius: "2px",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              mr: 2,
              color: "#343a62",
              fontWeight: "400",
              textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            من نحـن
          </Typography>
        </Box>

        {/* نص من نحن */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            lineHeight: 2.1,
            textAlign: "justify",
            color: "#444",
            fontSize: { xs: "1rem", md: "1.1rem" },
            letterSpacing: "0.2px",
          }}
        >
          مؤسسة بنت الريف للتنمية والحقوق هي مؤسسة إنسانية تطوعية خيرية
          تأسست عام (2019م) بتصريح من وزارة الشؤون الاجتماعية والعمل. تهدف
          إلى تطوير المرأة اليمنية بشكل عام والمرأة الريفية بشكل خاص في مجال
          التعليم والصحة ونشر الوعي الحقوقي للمرأة والطفل، وستعمل على دمج
          ومشاركة المرأة الريفية في عملية التنمية من خلال برامج التمكين
          الاقتصادي.
        </Typography>

       
      </Box>



 
       <Box sx={{ p: { xs: 2, md: 4  },
        backgroundColor: "#f9f6f2", mt: 18,
        display:"flex"

        }}>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        
        {values.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
              sx={{
                width: 210,
                p: 2.5,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                backgroundColor: "#f9f6f2",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexGrow: 1,
                cursor: "pointer",
              }}
            >
              {/* أيقونة */}
              <Box
                sx={{
                  width: 65,
                  height: 65,
                  borderRadius: "50%",
                  backgroundColor: "#343a62",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                {item.icon}
              </Box>

              {/* العنوان */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#343a62", mb: 1 }}
              >
                {item.title}
              </Typography>

              {/* النص */}
              <Typography
                variant="body2"
                sx={{
                  color: "#777",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  wordWrap: "break-word",
                  flexGrow: 1,
                }}
              >
                {item.text}
              </Typography>
            </MotionBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  
    </Container>
  );
};

export default About;
