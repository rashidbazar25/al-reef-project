import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';

const Programs = () => {

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
    <Helmet>
                <title> مؤسسة بنت الريف</title>
                <meta
                  name="description"
                  content="تعرف على رؤية ورسالة مؤسسة بنت الريف وبرامجها المختلفة."
                />
              </Helmet>
</> 
 )
}

export default Programs