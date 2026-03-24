import React from "react";
import { Pressable } from "react-native";

import { wui } from "../../styles/atomic";
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

const LABEL_TEXT_SIZE: Record<WuiButtonSize, WuiTextSize> = {
  [WuiButtonSize.S]: WuiTextSize.S,
  [WuiButtonSize.M]: WuiTextSize.S,
  [WuiButtonSize.L]: WuiTextSize.M,
};

const sButtonLabelCompactStyle = {
  fontSize: 16,
  lineHeight: Math.round(16 * wui.font.lineHeightRatio),
};

export const WuiButton = (props: WuiButtonProps) => {
  const {
    label,
    color = WuiButtonColor.PRIMARY,
    size = WuiButtonSize.M,
    block = false,
    disabled = false,
    ...rest
  } = props;

  const isDisabled = Boolean(disabled);

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
        ];
      }}
    >
      <WuiText
        numberOfLines={1}
        ellipsizeMode="tail"
        size={LABEL_TEXT_SIZE[size]}
        fontFamily={WuiFontFamily.SERIF}
        weight={WuiTextWeight.REGULAR}
        color={getButtonLabelColorAlias(color, isDisabled)}
        style={size === WuiButtonSize.S ? sButtonLabelCompactStyle : undefined}
      >
        {label}
      </WuiText>
    </Pressable>
  );
};
