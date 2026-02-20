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
import logo from "../assets/logo.jpg";
import { Helmet } from "react-helmet";

const pages = [
  { label: "الرئيسية", path: "/" },
  { label: "عن المؤسسة", path: "/about" },
  { label: "قطاعات عملنا", path: "/ourwork" },
  { label: "آخر الأخبار", path: "/news" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMobileCenter, setOpenMobileCenter] = useState(false);

  const location = useLocation();

  const toggleDrawer = (value) => () => setOpenDrawer(value);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isCenterActive =
    location.pathname === "/anous" ||
    location.pathname === "/wadi";

  return (
    <>
      <Helmet>
        <title>مؤسسة بنت الريف</title>
        <meta
          name="description"
          content="تعرف على رؤية ورسالة مؤسسة بنت الريف وبرامجها المختلفة."
        />
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
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

            {/* روابط الديسكتوب */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {pages.map((page) => {
                const isActive = location.pathname === page.path;
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
                      borderRadius: 2,
                      background: isActive
                        ? "rgba(238,182,15,0.1)"
                        : "transparent",
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

              {/* المركز الإعلامي */}
              <Button
                onClick={handleMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: "Almarai, sans-serif",
                  color: isCenterActive ? "#eeb60f" : "#000",
                  borderRadius: 2,
                  background: isCenterActive
                    ? "rgba(238,182,15,0.1)"
                    : "transparent",
                  "&:hover": {
                    color: "#eeb60f",
                    background: "rgba(238, 182, 15, 0.1)",
                  },
                }}
              >
                المركز الإعلامي
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  component={Link}
                  to="/anous"
                  onClick={handleMenuClose}
                >
                  روضة أنوس
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/wadi"
                  onClick={handleMenuClose}
                >
                  معهد الوادي العربي
                </MenuItem>
              </Menu>
            </Box>

            {/* الشعار */}
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

            {/* زر الجوال */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                sx={{ color: "#343a62" }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer للجوال */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
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
                      background: isActive
                        ? "rgba(238,182,15,0.1)"
                        : "transparent",
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

            {/* المركز الإعلامي في الجوال */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  setOpenMobileCenter(!openMobileCenter)
                }
              >
                <ListItemText
                  primary="المركز الإعلامي"
                  sx={{
                    color: isCenterActive ? "#eeb60f" : "#343a62",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Collapse in={openMobileCenter}>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/anous"
                    onClick={toggleDrawer(false)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="روضة أنوس" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/wadi"
                    onClick={toggleDrawer(false)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="معهد الوادي العربي" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  );
}