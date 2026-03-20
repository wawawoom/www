import React from "react";
import { Pressable, Text } from "react-native";

import { getBackgroundColor, getTextColor, styles } from "./WuiButton.styles";
import { WuiButtonColor, WuiButtonProps } from "./WuiButtonProps";

export const WuiButton = (props: WuiButtonProps) => {
  const {
    label,
    color = WuiButtonColor.PRIMARY,
    block = false,
    disabled = false,
    ...rest
  } = props;

  return (
    <Pressable
      style={(state) => {
        return [
          styles.base,
          disabled ? styles.disabled : getBackgroundColor(color, state.pressed),
          block && styles.block,
        ];
      }}
      {...rest}
    >
      <Text
        style={[styles.label, disabled ? styles.gray : getTextColor(color)]}
      >
        {label}
      </Text>
    </Pressable>
  );
};
