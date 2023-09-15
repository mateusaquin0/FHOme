import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useThemeMode } from "@rneui/themed";

export default function TabTwoScreen() {
  const { mode } = useThemeMode();

  const currentStyle = styles(mode);

  return (
    <View style={currentStyle.container}>
      <Text style={currentStyle.title}>Tab Two</Text>
      <View
        style={currentStyle.separator}
        darkColor="#eee"
        lightColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = (mode: "dark" | "light") =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[mode ?? "light"].background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors[mode ?? "light"].text,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });
