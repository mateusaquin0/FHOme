import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { Button, useThemeMode } from "@rneui/themed";

export default function TabOneScreen() {
  const { mode, setMode } = useThemeMode();

  return (
    <View style={styles(mode).container}>
      <Text style={styles(mode).title}>Tab One</Text>
      <View
        style={styles(mode).separator}
        darkColor="#eee"
        lightColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={() => setMode(mode === "light" ? "dark" : "light")}>
        Change Theme
      </Button>
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
