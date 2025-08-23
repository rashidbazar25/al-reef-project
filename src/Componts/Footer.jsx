import React from "react";
import { Box, Grid, Typography, Link, Divider } from "@mui/material";
import { MapPin, Phone, Mail } from "lucide-react"; // استيراد الأيقونات

const Footer = () => {
  return (
    <Box
      component="footer"
      dir="rtl"
      sx={{
        backgroundColor: "#343a62",
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
            sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}
          >
            بنت الريف
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#f1f1f1", mb: 1 }}
          >
            مؤسسة بنت الريف للتنمية والحقوق
          </Typography>

          <Typography variant="body2" sx={{ color: "#ccc", lineHeight: 1.8 }}>
            نسعى إلى توسيع عجلة التنمية وتفعيل دور المرأة اليمنية وتمكينها
            في مختلف المجالات.
          </Typography>
        </Grid>

        {/* خدماتنا */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            خدماتنا
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            الرعاية المجتمعية
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            الحماية والتمكين
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            الحقوق
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            التدريب والتأهيل
          </Typography>
          <Typography variant="body2">المشاريع الصغيرة</Typography>
        </Grid>

        {/* روابط سريعة */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            روابط سريعة
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            عن المؤسسة
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            قطاعات العمل
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            المركز الإعلامي
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            شركاؤنا
          </Typography>
          <Typography variant="body2">التطوع</Typography>
        </Grid>

        {/* تواصل معنا */}
        <Grid item xs={12} md={3} sx={{ textAlign: "right" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
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

      <Divider sx={{ mt: 4, borderColor: "#555" }} />

      <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
        © {new Date().getFullYear()} مؤسسة بنت الريف للتنمية والحقوق
      </Typography>
    </Box>
  );
};

export default Footer;
