import { Container } from "@mui/material";
import { useEffect } from "react";
import OurWorks from "./OurWorks";
import About from "./About";
import Statistics from "./Statistics";
import NewsHome from "./NewsHome";
import Section from "./Section";

export default function Home() {
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

  
  return(
      <>
        <Container>
          <Section/>
            <About/>
            <OurWorks/>
            <NewsHome/>
            <Statistics/>
        </Container>
      </>
  )
  
   
}
