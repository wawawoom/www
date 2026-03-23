import React from "react";
import { Pressable, Text } from "react-native";

import { getBackgroundColor, getTextColor, styles } from "./WuiButton.styles";
import {
  WuiButtonColor,
  WuiButtonProps,
  WuiButtonSize,
} from "./WuiButtonProps";

export const WuiButton = (props: WuiButtonProps) => {
  const {
    label,
    color = WuiButtonColor.PRIMARY,
    size = WuiButtonSize.M,
    block = false,
    disabled = false,
    ...rest
  } = props;

  return (
    <Pressable
      style={(state) => {
        return [
          styles.base,
          styles[`${size}Size`],
          disabled ? styles.disabled : getBackgroundColor(color, state.pressed),
          block && styles.block,
        ];
      }}
      {...rest}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.label,
          styles[`${size}Label`],
          disabled ? styles.gray : getTextColor(color),
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};
