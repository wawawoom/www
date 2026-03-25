import React from "react";
import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { WuiText } from "../WuiText/WuiText";
import {
  WuiFontFamily,
  WuiTextSize,
  WuiTextWeight,
} from "../WuiText/WuiTextProps";
import {
  getBackgroundColor,
  getButtonLabelColorAlias,
  styles,
} from "./WuiButton.styles";
import {
  WuiButtonColor,
  WuiButtonProps,
  WuiButtonSize,
} from "./WuiButtonProps";

/** Resolves Pressable `style` (object, array, or state callback) into a flat list for spreading. */
function addCustomStyles(
  style: PressableProps["style"],
  state: PressableStateCallbackType
): StyleProp<ViewStyle>[] {
  const resolved = typeof style === "function" ? style(state) : style;
  if (resolved == null) {
    return [];
  }
  return Array.isArray(resolved)
    ? (resolved as StyleProp<ViewStyle>[])
    : [resolved];
}

export const WuiButton = (props: WuiButtonProps) => {
  const {
    label,
    color = WuiButtonColor.PRIMARY,
    size = WuiButtonSize.M,
    block = false,
    disabled = false,
    style,
    ...rest
  } = props;

  const isDisabled = Boolean(disabled);

  const getLabelSize = (size: WuiButtonSize): WuiTextSize => {
    switch (size) {
      case WuiButtonSize.S:
        return WuiTextSize.S;

      case WuiButtonSize.M:
        return WuiTextSize.M;

      case WuiButtonSize.L:
        return WuiTextSize.L;

      default:
        return WuiTextSize.M;
    }
  };

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={(state) => {
        return [
          styles.base,
          styles[`${size}Size`],
          isDisabled
            ? styles.disabled
            : getBackgroundColor(color, state.pressed),
          block && styles.block,
          ...addCustomStyles(style, state),
        ];
      }}
    >
      <WuiText
        numberOfLines={1}
        ellipsizeMode="tail"
        size={getLabelSize(size)}
        fontFamily={WuiFontFamily.SERIF}
        weight={WuiTextWeight.REGULAR}
        color={getButtonLabelColorAlias(color, isDisabled)}
      >
        {label}
      </WuiText>
    </Pressable>
  );
};
