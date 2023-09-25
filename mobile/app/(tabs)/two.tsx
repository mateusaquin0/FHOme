import { StyleSheet } from "react-native";

import { DividerThemed, TextThemed, ViewThemed } from "../../components/Themed";
import { useThemeMode } from "@rneui/themed";

export default function TabTwoScreen() {
  const { mode } = useThemeMode();

  const currentStyle = styles(mode);

  return (
    <ViewThemed style={currentStyle.container}>
      <TextThemed style={currentStyle.title}>Tab Two</TextThemed>
      <DividerThemed />
    </ViewThemed>
  );
}

const styles = (mode: "dark" | "light") =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
