import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { amber, grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode

          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: { main: amber[100] },
          secondary: { main: amber[100] },
          background: {
            default: "#1c2228",
            paper: "#2c3440",
          },
          text: {
            primary: "#99aabb",
          },
        }),
  },
});
const outerTheme = createTheme(getDesignTokens("dark"));

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={outerTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
