import React from "react";
import { Text } from "react-native";

import { WuiColorAlias } from "@wawawoom/design-token/enum";
import { getFontStyles } from "./WuiText.styles";
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
    color = WuiColorAlias.NEUTRAL_900,
    style,
    ...rest
  } = props;

  return (
    <Text style={[...getFontStyles(fontFamily, weight, size, color), style]} {...rest}>
      {children}
    </Text>
  );
};
