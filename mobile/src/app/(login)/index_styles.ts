import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewFlex: {
    gap: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  mainView: {
    gap: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
    height: "100%",
  },

  headerText: {
    fontSize: 40,
  },

  input: {
    width: "100%",
    maxWidth: 300,
    padding: 10,
  },

  buttonsBox: {
    maxWidth: 300,
    width: "100%",
    gap: 16,
  },
});
