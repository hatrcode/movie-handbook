import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff3d5a",
    },
    secondary: {
      main: "#8b5cf6",
    },
    background: {
      default: "#050608",
      paper: "#0b0d12",
    },
    text: {
      primary: "#f7f7fb",
      secondary: "#a6adbd",
    },
  },
  typography: {
    fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
});

export default muiTheme;
