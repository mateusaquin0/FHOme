import { useThemeMode } from "@rneui/themed";
import ColorScheme from "../constants/ColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof ColorScheme.light & keyof typeof ColorScheme.dark
) {
  const { mode: theme } = useThemeMode();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return ColorScheme[theme][colorName];
  }
}
