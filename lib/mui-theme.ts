import { createTheme } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";

const muiTheme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  typography: {
    fontFamily: `"Quicksand", sans-serif`,
  },
});

export default muiTheme;
