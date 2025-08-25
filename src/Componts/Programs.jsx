import React from 'react'

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
    <div>Programs</div>
  )
}

export default Programs