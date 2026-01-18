import React, { useEffect } from "react";
import { Box, Grid, Typography, Link, Divider } from "@mui/material";
import { MapPin, Phone, Mail } from "lucide-react"; // استيراد الأيقونات
import { Helmet } from "react-helmet";

const Footer = () => {
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
    {/* SEO */}
       <Helmet>
        <title> مؤسسة بنت الريف</title>
        <meta
          name="description"
          content="تعرف على رؤية ورسالة مؤسسة بنت الريف وبرامجها المختلفة."
        />
      </Helmet>
        {/* SEO */}
    <Box
      component="footer"
      dir="rtl"
      sx={{
        backgroundColor: "#555555",
        color: "#fff",
        py: 6,
        px: { xs: 3, md: 10 },
        direction: "rtl",
      }}
    >
      <Grid container spacing={6} justifyContent="space-between">
        {/* نبذة عن المؤسسة */}
        <Grid item xs={12} md={3} sx={{ textAlign: "right" }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#fff", fontSize:"18" }}
          >
            بنـت الريـف
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#fff", mb: 1  , fontSize:"18"}}
          >
            مؤسسة بنت الريف للتنمية والحقوق
          </Typography>

          <Typography variant="body2" sx={{ color: "#fff", lineHeight: 2.3 ,fontWeight: "bold", fontSize:"18"}}>
            نسعى إلى توسيع عجلة التنمية وتفعيل دور المرأة اليمنية وتمكينها
            في مختلف المجالات.
          </Typography>
        </Grid>

        {/* خدماتنا */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" , fontSize:"22" }}>
            خــدمـاتـنا
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            الـرعــاية المـجتمـعيـة
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            الحمـاية والتمـكـين
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            الحقــوق
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            التـدريب والتـأهيل
          </Typography>
          <Typography variant="body2">المشاريع الصغيرة</Typography>
        </Grid>

        

        {/* تواصل معنا */}
        <Grid item xs={12} md={3} sx={{ textAlign: "right" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" ,  fontSize:"22"}}>
            تواصل معنا
          </Typography>

          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <MapPin size={18} /> حضرموت ـ القطن ـ خلف جامع القطن
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Phone size={18} /> 05/456845 - 770444670 - 777127708
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Mail size={18} />
            <Link
              href="mailto:info@bentreef.org"
              color="inherit"
              underline="hover"
            >
              info@bentreef.org
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, borderColor: "#fff" }} />

      <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
         مؤسـسة بنت الريف للتنمية والحقوق
         © {new Date().getFullYear()}
      </Typography>


     
    </Box>
   </>
  );
};

export default Footer;
