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
import { Link } from "react-router-dom";

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
  const [open, setOpen] = useState(false);
  const toggleDrawer = (value) => () => setOpen(value);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "#f9f6f2",
          color: "#343a62ff",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
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
              {pages.map((page) => (
                <Button
                  key={page.path}
                  component={Link}
                  to={page.path}
                  sx={{
                    color: "#343a62ff",
                    fontSize:18,
                    fontWeight: 600,
                    fontFamily: "Almarai , sans-serif",
                    "&:hover": {
                      background: "rgba(160, 157, 157, 0.15)",
                      borderRadius: 2,
                    },
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

             <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" , textDecoration: "none", fontFamily:" Almarai , sans-serif" }}
              component={Link}
              to="/"
            >
              شعار
            </Typography>


            {/* زر القائمة للجوال */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
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
            {pages.map((page) => (
              <ListItem key={page.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={page.path}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={page.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}