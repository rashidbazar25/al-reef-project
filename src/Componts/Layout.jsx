
import { Outlet } from "react-router-dom";
import { Box  } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bank from "./Bank";
import NewsBar from "./NewsBar ";

export default function Layout() {
  return (
    <>
        <Navbar />
        <NewsBar navbarHeight={64} />
        <Box sx={{ padding: 2, minHeight: "80vh" }}>
        <Outlet />
      </Box>
      <Bank/>
      <Footer/>
    </>
  );
}
