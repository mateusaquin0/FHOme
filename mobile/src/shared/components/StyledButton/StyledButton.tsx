import { AddIcon, Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import { ButtonProps } from "react-native/Libraries/Components/Button";
import React from "react";

interface StyledButtonProps {
  title: string;
  bgColor?: string;
  color?: string;
  fontSize?: number;
  icon?: any;
  onPress: () => void;
  w?: any;
}

export const StyledButton = (props: StyledButtonProps) => {
  const {
    title,
    bgColor = "#a61103",
    color = "#f2f2f2",
    fontSize,
    icon,
    w = "100%",
    onPress,
  } = props;
  return (
    <Button onPress={onPress} bgColor={bgColor} w={w}>
      <ButtonText color={color} fontSize={fontSize}>
        {title}
      </ButtonText>
      {icon && <ButtonIcon size="md" as={icon}></ButtonIcon>}
    </Button>
  );
};
