import React, { useEffect } from "react";
import { Box } from "@mui/material";

const LoadingDots = () => {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        gap: 2,
      }}
    >
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#1976d2",
            animation: `bounce 0.6s ${i * 0.1}s infinite ease-in-out alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default LoadingDots;
