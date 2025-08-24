// ThemeWrapper.jsx
import React from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme"

const ThemeWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#f9f6f2",
            margin: 0,
            padding: 0,
            minHeight: "100vh",
          },
          "#root": {
            backgroundColor: "#f9f6f2",
            minHeight: "100vh",
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
