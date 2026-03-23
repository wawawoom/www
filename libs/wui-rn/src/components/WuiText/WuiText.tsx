import React from "react";
import { Text } from "react-native";

import { styles } from "./WuiText.styles";
import {
  WuiFontFamily,
  WuiTextProps,
  WuiTextSize,
  WuiTextWeight,
} from "./WuiTextProps";

export const WuiText = (props: WuiTextProps) => {
  const {
    children,
    size = WuiTextSize.M,
    fontFamily = WuiFontFamily.SERIF,
    weight = WuiTextWeight.REGULAR,
    ...rest
  } = props;

  return (
    <Text style={[styles[size], styles[fontFamily], styles[weight]]} {...rest}>
      {children}
    </Text>
  );
};
