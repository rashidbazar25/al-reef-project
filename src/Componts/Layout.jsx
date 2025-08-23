
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Box sx={{ padding: 2, minHeight: "80vh" }}>
        <Outlet />
      </Box>
      <Footer/>
    </>
  );
}
