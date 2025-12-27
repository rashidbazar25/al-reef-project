
import { Outlet } from "react-router-dom";
import { Box  } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bank from "./Bank";
import NewsBar from "./NewsBar ";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Shrca from "./Shrca";

export default function Layout() {
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
        <Navbar />
        <NewsBar navbarHeight={64} />
        <Box sx={{ padding: 2, minHeight: "80vh" }}>
        <Outlet />
      </Box>
      <Shrca/>
      <Bank/>
      <Footer/>
    </>
  );
}
