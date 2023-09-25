import { createTheme } from "@rneui/themed";
import Colors from "./Colors";

export default createTheme({
  lightColors: {
    primary: Colors.PRIMARY,
    background: Colors.BACKGROUND,
    success: Colors.LIGHT_GREEN,
    warning: Colors.LIGHT_YELLOW,
    error: Colors.LIGHT_RED,
  },
  darkColors: {
    primary: Colors.PRIMARY,
    background: Colors.DARK_BACKGROUND,
    success: Colors.LIGHT_GREEN,
    warning: Colors.LIGHT_YELLOW,
    error: Colors.LIGHT_RED,
  },
  mode: "light",
});

// PALETA DE CORES
// #F2921D
// #F28322
// #F26938
// #F25050
// #0D0D0D
