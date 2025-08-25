import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Anous = () => {
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
        {/* SEO */}
  </>
  )
}

export default Anous

