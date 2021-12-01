import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./muiTheme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={muiTheme}>{element}</ThemeProvider>;
};
