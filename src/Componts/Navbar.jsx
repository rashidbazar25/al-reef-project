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
  Menu,
  MenuItem,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet";

// صفحات عادية
const pages = [
  { label: "الرئيسية", path: "/" },
];

// عن المؤسسة
const aboutMenu = [
  { label: "نبذة عن المؤسسة", path: "/about/overview" },
  { label: "الرؤية والرسالة", path: "/about/vision" },
  { label: "الأهداف", path: "/about/goals" },
];

// قطاعات العمل
const workMenu = [
  { label: "قطاع الرعاية المجتمعية", path: "/ourwork/community" },
  { label: "قطاع الحماية والتمكين", path: "/ourwork/protection" },
  { label: "قطاع الحقوق", path: "/ourwork/rights" },
  { label: "المعهد العربي", path: "/ourwork/institute" },
];

// المركز الإعلامي
const mediaCenter = [
  { label: "أخبار المؤسسة", path: "/media/news" },
  { label: "التقرير السنوي", path: "/media/reports" },
  { label: "معرض الصور", path: "/media/gallery" },
  { label: "معرض الفيديو", path: "/media/videos" },
];

// روابط إضافية
const extraLinks = [
  { label: "تواصل معنا", path: "/contact" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElWork, setAnchorElWork] = useState(null);
  const [anchorElMedia, setAnchorElMedia] = useState(null);

  const [openMobileAbout, setOpenMobileAbout] = useState(false);
  const [openMobileWork, setOpenMobileWork] = useState(false);
  const [openMobileMedia, setOpenMobileMedia] = useState(false);

  const location = useLocation();

  const toggleDrawer = (value) => () => setOpenDrawer(value);

  // handlers
  const handleAboutOpen = (e) => setAnchorElAbout(e.currentTarget);
  const handleAboutClose = () => setAnchorElAbout(null);

  const handleWorkOpen = (e) => setAnchorElWork(e.currentTarget);
  const handleWorkClose = () => setAnchorElWork(null);

  const handleMediaOpen = (e) => setAnchorElMedia(e.currentTarget);
  const handleMediaClose = () => setAnchorElMedia(null);

  // active
  const isAboutActive = location.pathname.includes("/about");
  const isWorkActive = location.pathname.includes("/ourwork");
  const isMediaActive = location.pathname.includes("/media");

  // style helpers
  const navStyle = (isActive) => ({
    color: isActive ? "#eeb60f" : "#000",
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "Almarai",
    borderRadius: 2,
    paddingX: 2,
    background: isActive ? "rgba(238,182,15,0.1)" : "transparent",
    "&:hover": {
      color: "#eeb60f",
      background: "rgba(238,182,15,0.1)",
    },
  });

  const donateStyle = (isActive) => ({
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "Almarai",
    borderRadius: 2,
    paddingX: 2,
    background: isActive ? "#eeb60f" : "#f0b429",
    "&:hover": {
      background: "#d49e0a",
    },
  });

  return (
    <>
      <Helmet>
        <title>مؤسسة بنت الريف</title>
      </Helmet>

      <AppBar
        position="sticky"
        sx={{
          background: "#fff",
          color: "#343a62",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", direction: "rtl" }}>

            {/* Desktop */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>

              {/* الرئيسية */}
              <Button component={Link} to="/" sx={navStyle(location.pathname === "/")}>
                الرئيسية
              </Button>

              {/* عن المؤسسة */}
              <Button onClick={handleAboutOpen} endIcon={<KeyboardArrowDownIcon />} sx={navStyle(isAboutActive)}>
                عن المؤسسة
              </Button>
              <Menu anchorEl={anchorElAbout} open={Boolean(anchorElAbout)} onClose={handleAboutClose}>
                {aboutMenu.map((item) => (
                  <MenuItem key={item.path} component={Link} to={item.path} onClick={handleAboutClose}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* قطاعات العمل */}
              <Button onClick={handleWorkOpen} endIcon={<KeyboardArrowDownIcon />} sx={navStyle(isWorkActive)}>
                قطاعات العمل
              </Button>
              <Menu anchorEl={anchorElWork} open={Boolean(anchorElWork)} onClose={handleWorkClose}>
                {workMenu.map((item) => (
                  <MenuItem key={item.path} component={Link} to={item.path} onClick={handleWorkClose}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* المركز الإعلامي */}
              <Button onClick={handleMediaOpen} endIcon={<KeyboardArrowDownIcon />} sx={navStyle(isMediaActive)}>
                المركز الإعلامي
              </Button>
              <Menu anchorEl={anchorElMedia} open={Boolean(anchorElMedia)} onClose={handleMediaClose}>
                {mediaCenter.map((item) => (
                  <MenuItem key={item.path} component={Link} to={item.path} onClick={handleMediaClose}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* تواصل معنا */}
              <Button component={Link} to="/contact" sx={navStyle(location.pathname === "/contact")}>
                تواصل معنا
              </Button>

              {/* التبرع */}
              <Button component={Link} to="/donate" sx={donateStyle(location.pathname === "/donate")}>
                التبرع
              </Button>
            </Box>

            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Box component="img" src={logo} sx={{ height: 50, mr: 1 }} />
              <Typography sx={{ fontFamily: "Almarai", color: "#343a62" , fontSize: 15 }}>
                مؤسسة <br /> بنت الريف
              </Typography>
            </Box>

            {/* Mobile Button */}
            <IconButton sx={{ display: { md: "none" } }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography sx={{ mb: 2 }}>القائمة</Typography>
          <List>
            {/* الرئيسية */}
            {pages.map((page) => (
              <ListItem key={page.path} disablePadding>
                <ListItemButton component={Link} to={page.path} onClick={toggleDrawer(false)}>
                  <ListItemText primary={page.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* عن المؤسسة */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenMobileAbout(!openMobileAbout)}>
                <ListItemText primary="عن المؤسسة" />
              </ListItemButton>
            </ListItem>
            <Collapse in={openMobileAbout}>
              <List>
                {aboutMenu.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)} sx={{ pl: 4 }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* قطاعات العمل */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenMobileWork(!openMobileWork)}>
                <ListItemText primary="قطاعات العمل" />
              </ListItemButton>
            </ListItem>
            <Collapse in={openMobileWork}>
              <List>
                {workMenu.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)} sx={{ pl: 4 }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* المركز الإعلامي */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenMobileMedia(!openMobileMedia)}>
                <ListItemText primary="المركز الإعلامي" />
              </ListItemButton>
            </ListItem>
            <Collapse in={openMobileMedia}>
              <List>
                {mediaCenter.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)} sx={{ pl: 4 }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* تواصل معنا */}
            <ListItem key="/contact" disablePadding>
              <ListItemButton component={Link} to="/contact" onClick={toggleDrawer(false)}>
                <ListItemText primary="تواصل معنا" />
              </ListItemButton>
            </ListItem>

            {/* التبرع */}
            <ListItem key="/donate" disablePadding>
              <ListItemButton
                component={Link}
                to="/donate"
                onClick={toggleDrawer(false)}
                sx={{ background: "#f0b429", "&:hover": { background: "#d49e0a" }, color: "#fff", fontWeight: 600 }}
              >
                <ListItemText primary="التبرع" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}