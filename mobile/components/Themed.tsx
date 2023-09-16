/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import {
  Divider as DefaultDivider,
  DividerProps as DefaultDividerProps,
  Input as DefaultInput,
  InputProps as DefaultInputProps,
} from "@rneui/themed";
import React from "react";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type FlexProps = {
  gap?: number;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: any;
};

type MeasureProps = {
  width?: any;
  height?: any;
  padding?: number;
  margin?: number;
};

type TextProps = ThemeProps & DefaultText["props"];
type ViewProps = ThemeProps & DefaultView["props"];
type DividerProps = DefaultDividerProps & MeasureProps;
type FlexViewProps = ThemeProps &
  DefaultView["props"] &
  FlexProps &
  MeasureProps;
type InputProps = DefaultInputProps & MeasureProps;

export function TextThemed(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function ViewThemed(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function DividerThemed(props: DividerProps) {
  const { style, padding, margin, ...otherProps } = props;
  const color = useThemeColor({}, "divider");

  return (
    <DefaultDivider
      style={[{ alignSelf: "stretch", marginVertical: 16 }, style]}
      color={color}
      {...otherProps}
    />
  );
}

export function FlexView(props: FlexViewProps) {
  const {
    style,
    lightColor,
    darkColor,
    width,
    height,
    gap,
    flexDirection = "row",
    justifyContent,
    alignItems,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultView
      style={[
        {
          backgroundColor,
          flexDirection,
          gap,
          justifyContent,
          alignItems,
          width,
          height,
          flexWrap: "wrap",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function InputThemed(props: InputProps) {
  const { style, errorMessage, width = "100%", ...otherProps } = props;
  const placeholderTextColor = useThemeColor({}, "inputPlaceholderColor");
  const styleSheet = StyleSheet.create({
    inputStyle: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: useThemeColor({}, "inputBorderColor"),
      backgroundColor: useThemeColor({}, "inputBackgorundColor"),
      padding: 10,
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
    },
    containerStyle: {
      width,
      paddingHorizontal: 0,
    },
    errorStyle: {
      margin: 0,
      textAlign: "center",
      height: errorMessage ? "auto" : 0,
    },
  });

  return (
    <DefaultInput
      inputStyle={styleSheet.inputStyle}
      inputContainerStyle={styleSheet.inputContainerStyle}
      containerStyle={styleSheet.containerStyle}
      errorStyle={styleSheet.errorStyle}
      placeholderTextColor={placeholderTextColor}
      errorMessage={errorMessage}
      {...otherProps}
    />
  );
}
