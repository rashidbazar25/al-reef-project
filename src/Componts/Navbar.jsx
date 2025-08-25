import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

const pages = [
  { label: "الرئيسية", path: "/" },
  { label: "عن المؤسسة ", path: "/about" },
  { label: "قطاعات عملنا", path: "/ourwork" },
  { label: "برامجـنا", path: "/programs" },
  { label: "آخر الأخـبار", path: "/news" },
  { label: "معهد الوادي العربي", path: "/wadi" },
  { label: "روضة أنوس", path: "/anous" },
];

export default function Navbar() {

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


  
  const [open, setOpen] = useState(false);
  const toggleDrawer = (value) => () => setOpen(value);

  const location = useLocation(); // هنا نحصل على المسار الحالي

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "#fff",
          color: "#343a62",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* روابط التنقل على اليمين */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {pages.map((page) => {
                const isActive = location.pathname === page.path; // الرابط النشط
                return (
                  <Button
                    key={page.path}
                    component={Link}
                    to={page.path}
                    sx={{
                      color: isActive ? "#eeb60f" : "#000",
                      fontSize: 18,
                      fontWeight: 600,
                      fontFamily: "Almarai, sans-serif",
                      transition: "0.3s",
                      background: isActive ? "rgba(238,182,15,0.1)" : "transparent",
                      borderRadius: 2,
                      "&:hover": {
                        color: "#eeb60f",
                        background: "rgba(238, 182, 15, 0.1)",
                      },
                    }}
                  >
                    {page.label}
                  </Button>
                );
              })}
            </Box>

            {/* شعار + اسم المؤسسة */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="شعار الموقع"
                sx={{ height: 45, mr: 1 }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  fontFamily: "Almarai, sans-serif",
                  color: "#343a62",
                  lineHeight: 1.2,
                }}
              >
                مؤسسة <br /> بنت الريف
              </Typography>
            </Box>

            {/* زر القائمة للجوال */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton sx={{ color: "#343a62" }} onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer للجوال */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            القائمة
          </Typography>
          <List>
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <ListItem key={page.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={page.path}
                    onClick={toggleDrawer(false)}
                    sx={{
                      background: isActive ? "rgba(238,182,15,0.1)" : "transparent",
                    }}
                  >
                    <ListItemText
                      primary={page.label}
                      sx={{ color: isActive ? "#eeb60f" : "#343a62" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
