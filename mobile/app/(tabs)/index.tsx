import { StyleSheet, View } from "react-native";

import {
  DividerThemed,
  FlexView,
  InputThemed,
  TextThemed,
  ViewThemed,
} from "../../components/Themed";
import { Button, useThemeMode } from "@rneui/themed";
import Colors from "../../constants/Colors";

export default function TabOneScreen() {
  const { mode, setMode } = useThemeMode();

  return (
    <ViewThemed style={styles(mode).container}>
      <TextThemed style={styles(mode).title}>Examples</TextThemed>
      <DividerThemed />
      <FlexView gap={4}>
        <Button> Primary Button</Button>
        <Button type="outline">Outline Button</Button>
        <Button type="clear">Clear Button</Button>
      </FlexView>
      <DividerThemed />
      <FlexView gap={4}>
        <Button color="success" titleStyle={{ color: Colors.GREEN }}>
          Success Button
        </Button>
        <Button color="warning" titleStyle={{ color: Colors.YELLOW }}>
          Warning Button
        </Button>
        <Button color="error" titleStyle={{ color: Colors.RED }}>
          Secondary Button
        </Button>
      </FlexView>
      <DividerThemed />
      <FlexView width="100%" justifyContent="space-around">
        <InputThemed placeholder="Basic Input" width="40%" />
        <InputThemed
          placeholder="Password Input"
          secureTextEntry
          width="40%"
        />
      </FlexView>
      <DividerThemed />
      <Button onPress={() => setMode(mode === "light" ? "dark" : "light")}>
        Change Theme
      </Button>
    </ViewThemed>
  );
}

const styles = (mode: "dark" | "light") =>
  StyleSheet.create({
    container: {
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });
