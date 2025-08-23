import { Container } from "@mui/material";
import { useEffect } from "react";
import OurWorks from "./OurWorks";
import About from "./About";
import Statistics from "./Statistics";
import NewsHome from "./NewsHome";

export default function Home() {
  useEffect(() => {
    document.title = "الرئيسية | معهد الوادي العربي";
    const meta = document.querySelector("meta[name='description']") || document.createElement("meta");
    meta.name = "description";
    meta.content = "مرحبًا بكم في الصفحة الرئيسية لمعهد الوادي العربي";
    if (!document.head.contains(meta)) document.head.appendChild(meta);
  }, []);

  return(
      <>
        <Container>
            <About/>
            <OurWorks/>
            <NewsHome/>
            <Statistics/>
        </Container>
      </>
  )
  
   
}
