import { createTheme } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";

const muiTheme = createTheme({
  root: {
    "& > *": {
      justifyContent: "center",
      display: "flex",
    },
  },
  palette: {
    primary: blue,
    secondary: pink,
  },
  typography: {
    fontFamily: `"Quicksand", sans-serif`,
  },
});

export default muiTheme;
