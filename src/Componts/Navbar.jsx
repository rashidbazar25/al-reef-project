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
  { label: "المعهد العربي", path: "institute" }, 
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
                    to={item.path === "institute" ? "/institute" : `/qta/${item.path}`}
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
            <Box
  component={Link}
  to="/"
  sx={{
    display: "flex",
    textDecoration: "none",
    outline: "none",
    border: "none",

    "&:focus": {
      outline: "none",
      border: "none",
    },

    "&:focus-visible": {
      outline: "none",
      border: "none",
    },

    "& img": {
      border: "none",
      outline: "none",
    },
  }}
>
  <Box
    component="img"
    src={logo}
    alt="مؤسسة بنت الريف"
    sx={{
      height: 50,
      display: "block",
      border: "none",
      outline: "none",
    }}
  />
</Box>





            {/* Mobile */}
            <IconButton sx={{ display: { md: "none" } }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

     








     {/* =========================
    Mobile Drawer
========================= */}
<Drawer
  anchor="right"
  open={openDrawer}
  onClose={toggleDrawer(false)}
  PaperProps={{
    sx: {
      width: { xs: "85%", sm: 360 },
      maxWidth: 360,
      backgroundColor: "#fff",
      direction: "rtl",
      boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
    },
  }}
>
  <Box
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Almarai",
    }}
  >

    {/* =========================
        Header
    ========================= */}
    <Box
      sx={{
        px: 2.5,
        py: 2.2,
        background: "linear-gradient(135deg, #343a62 0%, #454d7d 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="مؤسسة بنت الريف"
        sx={{
          height: 52,
          width: "auto",
          objectFit: "contain",
          backgroundColor: "#fff",
          borderRadius: 1.5,
          p: 0.5,
        }}
      />

      <IconButton
        onClick={toggleDrawer(false)}
        sx={{
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.12)",
          },
        }}
      >
        <span style={{ fontSize: "25px", lineHeight: 1 }}>×</span>
      </IconButton>
    </Box>

    {/* =========================
        Navigation
    ========================= */}
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        py: 1.5,
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ddd",
          borderRadius: "10px",
        },
      }}
    >
      <List sx={{ px: 1.2 }}>

        {/* =========================
            الرئيسية
        ========================= */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={Link}
            to="/"
            onClick={toggleDrawer(false)}
            sx={{
              minHeight: 52,
              borderRadius: 2,
              px: 2,
              direction: "rtl",
              transition: "all .2s ease",

              "&:hover": {
                backgroundColor: "rgba(52,58,98,0.07)",
                transform: "translateX(-3px)",
              },

              ...(location.pathname === "/" && {
                backgroundColor: "rgba(240,180,41,0.12)",
                color: "#343a62",
              }),
            }}
          >
            <ListItemText
              primary="الرئيسية"
              sx={{
                textAlign: "right",
                "& .MuiListItemText-primary": {
                  fontFamily: "Almarai",
                  fontSize: "16px",
                  fontWeight: 700,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* =========================
            عن المؤسسة
        ========================= */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => setOpenMobileAbout(!openMobileAbout)}
            sx={{
              minHeight: 52,
              borderRadius: 2,
              px: 2,
              direction: "rtl",

              "&:hover": {
                backgroundColor: "rgba(52,58,98,0.07)",
              },
            }}
          >
            <ListItemText
              primary="عن المؤسسة"
              sx={{
                textAlign: "right",
                "& .MuiListItemText-primary": {
                  fontFamily: "Almarai",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#343a62",
                },
              }}
            />

            <Box
              component="span"
              sx={{
                color: "#f0b429",
                fontSize: 22,
                fontWeight: 700,
                transition: "transform .25s ease",
                transform: openMobileAbout
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            >
              ⌄
            </Box>
          </ListItemButton>
        </ListItem>

        {/* العناصر الفرعية - عن المؤسسة */}
        <Collapse
          in={openMobileAbout}
          timeout="auto"
          unmountOnExit
        >
          <List
            disablePadding
            sx={{
              mr: 1.5,
              mb: 1,
              borderRight: "3px solid #f0b429",
            }}
          >
            {aboutMenu.map((item) => (
              <ListItem
                key={item.path}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    minHeight: 44,
                    px: 2,
                    borderRadius: "0 8px 8px 0",
                    direction: "rtl",

                    "&:hover": {
                      backgroundColor: "rgba(240,180,41,0.08)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#f0b429",
                      ml: 1.5,
                      flexShrink: 0,
                    }}
                  />

                  <ListItemText
                    primary={item.label}
                    sx={{
                      textAlign: "right",
                      "& .MuiListItemText-primary": {
                        fontFamily: "Almarai",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#555",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* =========================
            قطاعات العمل
        ========================= */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => setOpenMobileWork(!openMobileWork)}
            sx={{
              minHeight: 52,
              borderRadius: 2,
              px: 2,
              direction: "rtl",

              "&:hover": {
                backgroundColor: "rgba(52,58,98,0.07)",
              },
            }}
          >
            <ListItemText
              primary="قطاعات العمل"
              sx={{
                textAlign: "right",
                "& .MuiListItemText-primary": {
                  fontFamily: "Almarai",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#343a62",
                },
              }}
            />

            <Box
              component="span"
              sx={{
                color: "#f0b429",
                fontSize: 22,
                fontWeight: 700,
                transition: "transform .25s ease",
                transform: openMobileWork
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            >
              ⌄
            </Box>
          </ListItemButton>
        </ListItem>

        {/* العناصر الفرعية - قطاعات العمل */}
        <Collapse
          in={openMobileWork}
          timeout="auto"
          unmountOnExit
        >
          <List
            disablePadding
            sx={{
              mr: 1.5,
              mb: 1,
              borderRight: "3px solid #f0b429",
            }}
          >
            {workMenu.map((item) => (
              <ListItem
                key={item.path}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={
                    item.path === "institute"
                      ? "/institute"
                      : `/qta/${item.path}`
                  }
                  onClick={toggleDrawer(false)}
                  sx={{
                    minHeight: 44,
                    px: 2,
                    borderRadius: "0 8px 8px 0",
                    direction: "rtl",

                    "&:hover": {
                      backgroundColor: "rgba(240,180,41,0.08)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#f0b429",
                      ml: 1.5,
                      flexShrink: 0,
                    }}
                  />

                  <ListItemText
                    primary={item.label}
                    sx={{
                      textAlign: "right",
                      "& .MuiListItemText-primary": {
                        fontFamily: "Almarai",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#555",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* =========================
            المركز الإعلامي
        ========================= */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => setOpenMobileMedia(!openMobileMedia)}
            sx={{
              minHeight: 52,
              borderRadius: 2,
              px: 2,
              direction: "rtl",

              "&:hover": {
                backgroundColor: "rgba(52,58,98,0.07)",
              },
            }}
          >
            <ListItemText
              primary="المركز الإعلامي"
              sx={{
                textAlign: "right",
                "& .MuiListItemText-primary": {
                  fontFamily: "Almarai",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#343a62",
                },
              }}
            />

            <Box
              component="span"
              sx={{
                color: "#f0b429",
                fontSize: 22,
                fontWeight: 700,
                transition: "transform .25s ease",
                transform: openMobileMedia
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            >
              ⌄
            </Box>
          </ListItemButton>
        </ListItem>

        {/* العناصر الفرعية - المركز الإعلامي */}
        <Collapse
          in={openMobileMedia}
          timeout="auto"
          unmountOnExit
        >
          <List
            disablePadding
            sx={{
              mr: 1.5,
              mb: 1,
              borderRight: "3px solid #f0b429",
            }}
          >
            {mediaCenter.map((item) => (
              <ListItem
                key={item.path}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    minHeight: 44,
                    px: 2,
                    borderRadius: "0 8px 8px 0",
                    direction: "rtl",

                    "&:hover": {
                      backgroundColor: "rgba(240,180,41,0.08)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#f0b429",
                      ml: 1.5,
                      flexShrink: 0,
                    }}
                  />

                  <ListItemText
                    primary={item.label}
                    sx={{
                      textAlign: "right",
                      "& .MuiListItemText-primary": {
                        fontFamily: "Almarai",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#555",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* =========================
            تواصل معنا
        ========================= */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => {
              setOpenContactModal(true);
              setOpenDrawer(false);
            }}
            sx={{
              minHeight: 52,
              borderRadius: 2,
              px: 2,
              direction: "rtl",

              "&:hover": {
                backgroundColor: "rgba(52,58,98,0.07)",
              },
            }}
          >
            <ListItemText
              primary="تواصل معنا"
              sx={{
                textAlign: "right",
                "& .MuiListItemText-primary": {
                  fontFamily: "Almarai",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#343a62",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* =========================
            التبرع
        ========================= */}
        <ListItem disablePadding sx={{ mt: 1 }}>
          <ListItemButton
            onClick={() => {
              setOpenDonateModal(true);
              setOpenDrawer(false);
            }}
            sx={{
              minHeight: 52,
              borderRadius: 2,
              px: 2,
              direction: "rtl",
              backgroundColor: "#f0b429",
              color: "#fff",

              "&:hover": {
                backgroundColor: "#d9a20e",
              },
            }}
          >
            <ListItemText
              primary="التبرع"
              sx={{
                textAlign: "right",
                "& .MuiListItemText-primary": {
                  fontFamily: "Almarai",
                  fontSize: "16px",
                  fontWeight: 700,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

      </List>
    </Box>

    {/* =========================
        Footer
    ========================= */}
    <Box
      sx={{
        px: 2,
        py: 1.5,
        textAlign: "center",
        borderTop: "1px solid #eee",
        backgroundColor: "#fafafa",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Almarai",
          fontSize: 11,
          color: "#888",
        }}
      >
        مؤسسة بنت الريف
      </Typography>
    </Box>

  </Box>
</Drawer>


{/* =========================
    Contact Modal
========================= */}
<Dialog
  open={openContactModal}
  onClose={() => setOpenContactModal(false)}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: 3,
      direction: "rtl",
    },
  }}
>
  <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: 800,
      fontFamily: "Almarai",
      color: "#343a62",
      pb: 1,
    }}
  >
    تواصل معنا
  </DialogTitle>

  <DialogContent>
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 1,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Almarai",
          color: "#555",
        }}
      >
        📍 حضرموت ـ القطن ـ خلف جامع القطن
      </Typography>

      <Typography
        sx={{
          fontFamily: "Almarai",
          fontWeight: 700,
          color: "#f0b429",
        }}
      >
        📞 05/456845 - 770444670 - 777127708
      </Typography>

      <Typography
        sx={{
          fontFamily: "Almarai",
          color: "#555",
          wordBreak: "break-word",
        }}
      >
        ✉️ bintalriayf2019@gmail.com
      </Typography>
    </Box>
  </DialogContent>

  <DialogActions
    sx={{
      justifyContent: "center",
      pb: 2,
    }}
  >
    <Button
      onClick={() => setOpenContactModal(false)}
      variant="contained"
      sx={{
        backgroundColor: "#343a62",
        fontFamily: "Almarai",
        borderRadius: 2,
        px: 4,

        "&:hover": {
          backgroundColor: "#282d4d",
        },
      }}
    >
      إغلاق
    </Button>
  </DialogActions>
</Dialog>


{/* =========================
    Donate Modal
========================= */}
<Dialog
  open={openDonateModal}
  onClose={() => setOpenDonateModal(false)}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: 3,
      direction: "rtl",
    },
  }}
>
  <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: 800,
      fontFamily: "Almarai",
      color: "#343a62",
      pb: 1,
    }}
  >
    التبرع
  </DialogTitle>

  <DialogContent>
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        py: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(240,180,41,0.08)",
          border: "1px solid rgba(240,180,41,0.25)",
          borderRadius: 3,
          p: 2.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Almarai",
            fontWeight: 800,
            color: "#343a62",
            mb: 1,
          }}
        >
          مصرف اليمن البحرين الشامل
        </Typography>

        <Typography
          sx={{
            fontFamily: "Almarai",
            fontSize: 22,
            fontWeight: 800,
            color: "#f0b429",
            letterSpacing: 1,
          }}
        >
          1700355
        </Typography>
      </Box>
    </Box>
  </DialogContent>

  <DialogActions
    sx={{
      justifyContent: "center",
      pb: 2,
    }}
  >
    <Button
      onClick={() => setOpenDonateModal(false)}
      variant="contained"
      sx={{
        backgroundColor: "#343a62",
        fontFamily: "Almarai",
        borderRadius: 2,
        px: 4,

        "&:hover": {
          backgroundColor: "#282d4d",
        },
      }}
    >
      إغلاق
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}