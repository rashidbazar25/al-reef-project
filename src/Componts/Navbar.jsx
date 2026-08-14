import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logobg.png";
import { Helmet } from "react-helmet";

// عن المؤسسة
const aboutMenu = [
  { label: "نبذة عن المؤسسة", path: "/about" },
  { label: "الرؤية والرسالة والأهداف", path: "/goals" },
];

// قطاعات العمل
const workMenu = [
  { label: "قطاع الرعاية المجتمعية", path: "care" },
  { label: "قطاع الحماية والتمكين", path: "empowerment" },
  { label: "قطاع الحقوق", path: "rights" },
  {/*{ label: "المعهد العربي", path: "institute" }, */}
];

// المركز الإعلامي
const mediaCenter = [
  { label: "أخبار المؤسسة", path: "/media/news" },
  { label: "التقرير السنوي", path: "/media/reports" },
  { label: "معرض الصور", path: "/media/gallery" },
  { label: "معرض الفيديو", path: "/media/videos" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElWork, setAnchorElWork] = useState(null);
  const [anchorElMedia, setAnchorElMedia] = useState(null);

  const [openMobileAbout, setOpenMobileAbout] = useState(false);
  const [openMobileWork, setOpenMobileWork] = useState(false);
  const [openMobileMedia, setOpenMobileMedia] = useState(false);

  // Modals
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openDonateModal, setOpenDonateModal] = useState(false);

  const location = useLocation();

  const toggleDrawer = (value) => () => setOpenDrawer(value);

  const handleAboutOpen = (e) => setAnchorElAbout(e.currentTarget);
  const handleAboutClose = () => setAnchorElAbout(null);

  const handleWorkOpen = (e) => setAnchorElWork(e.currentTarget);
  const handleWorkClose = () => setAnchorElWork(null);

  const handleMediaOpen = (e) => setAnchorElMedia(e.currentTarget);
  const handleMediaClose = () => setAnchorElMedia(null);

  const isAboutActive = location.pathname.includes("/about");
  const isWorkActive = location.pathname.includes("/qta");
  const isMediaActive = location.pathname.includes("/media");

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

  const donateStyle = () => ({
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "Almarai",
    borderRadius: 2,
    paddingX: 2,
    background: "#f0b429",
    "&:hover": {
      background: "#d49e0a",
    },
  });

  return (
    <>
      <Helmet>
        <title>مؤسسة بنت الريف</title>
      </Helmet>

      <AppBar position="sticky" sx={{ background: "#fff", color: "#343a62" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", direction: "rtl" }}>

            {/* Desktop */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>

              <Button component={Link} to="/" sx={navStyle(location.pathname === "/")}>
                الرئيسية
              </Button>

              {/* عن المؤسسة */}
              <Button
  onClick={handleAboutOpen}
  endIcon={<KeyboardArrowDownIcon />}
  sx={{
    ...navStyle(isAboutActive),
    gap: 1,
  }}
>
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
              <Button onClick={handleWorkOpen} endIcon={<KeyboardArrowDownIcon />} sx={{...navStyle(isWorkActive),gap : 1 ,}}>
                قطاعات العمل
              </Button>
              <Menu anchorEl={anchorElWork} open={Boolean(anchorElWork)} onClose={handleWorkClose}>
                {workMenu.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={Link}
                    to={`/qta/${item.path}`}
                    onClick={handleWorkClose}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* المركز الإعلامي */}
              <Button onClick={handleMediaOpen} endIcon={<KeyboardArrowDownIcon />} sx={{...navStyle(isMediaActive),gap:1}}>
                المركز الإعلامي
              </Button>
              <Menu anchorEl={anchorElMedia} open={Boolean(anchorElMedia)} onClose={handleMediaClose}>
                {mediaCenter.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={handleMediaClose}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* تواصل معنا */}
              <Button sx={navStyle(false)} onClick={() => setOpenContactModal(true)}>
                تواصل معنا
              </Button>

              {/* التبرع */}
              <Button sx={donateStyle()} onClick={() => setOpenDonateModal(true)}>
                التبرع
              </Button>
            </Box>

            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: "flex", textDecoration: "none" }}>
              <Box component="img" src={logo} sx={{ height: 50 }} />
            </Box>

            {/* Mobile */}
            <IconButton sx={{ display: { md: "none" } }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
     {/* Drawer */}
<Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
  <Box sx={{ width: 280 }}>

    <List>

      {/* الرئيسية */}
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="الرئيسية" />
        </ListItemButton>
      </ListItem>

      {/* عن المؤسسة */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setOpenMobileAbout(!openMobileAbout)}
          
        >
          <ListItemText primary="عن المؤسسة" />
        </ListItemButton>
      </ListItem>

      <Collapse in={openMobileAbout}>
        <List disablePadding>
          {aboutMenu.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ pr: 3 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* قطاعات العمل */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setOpenMobileWork(!openMobileWork)}
        >
          <ListItemText primary="قطاعات العمل" />
        </ListItemButton>
      </ListItem>

      <Collapse in={openMobileWork}>
        <List disablePadding>
          {workMenu.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ pr: 3 }}>
              <ListItemButton
                component={Link}
                to={`/qta/${item.path}`}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* المركز الإعلامي */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setOpenMobileMedia(!openMobileMedia)}
        >
          <ListItemText primary="المركز الإعلامي" />
        </ListItemButton>
      </ListItem>

      <Collapse in={openMobileMedia}>
        <List disablePadding>
          {mediaCenter.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ pr: 3 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* تواصل معنا */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            setOpenContactModal(true);
            setOpenDrawer(false);
          }}
        >
          <ListItemText primary="تواصل معنا" />
        </ListItemButton>
      </ListItem>

      {/* التبرع */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            setOpenDonateModal(true);
            setOpenDrawer(false);
          }}
        >
          <ListItemText primary="التبرع" />
        </ListItemButton>
      </ListItem>

    </List>

  </Box>
</Drawer>

      {/* 🔥 Contact Modal */}
      <Dialog
        open={openContactModal}
        onClose={() => setOpenContactModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          تواصل معنا
        </DialogTitle>

        <DialogContent>
          <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>📍 حضرموت ـ القطن ـ خلف جامع القطن</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#f0b429" }}>
              📞 05/456845 - 770444670 - 777127708
            </Typography>
            <Typography>✉️ bintalriayf2019@gmail.com

</Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setOpenContactModal(false)} variant="contained">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔥 Donate Modal */}
      <Dialog
        open={openDonateModal}
        onClose={() => setOpenDonateModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          التبرع
        </DialogTitle>

        <DialogContent>
          <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 3 }}>

            <Box>
              <Typography sx={{ fontWeight: "bold", color: "#f0b429" }}>
                مصرف اليمن البحرين الشامل
              </Typography>
              <Typography>1700355</Typography>
            </Box>

          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setOpenDonateModal(false)} variant="contained">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}