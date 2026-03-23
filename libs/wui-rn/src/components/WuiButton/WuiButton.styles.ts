import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { WUI_FONT_NEWSREADER_MEDIUM } from "../../fonts/wuiFontAssets";
import { wui } from "../../styles/atomic";
import { WuiButtonColor } from "./WuiButtonProps";

export const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },

  block: {
    width: "100%",
  },

  pressed: {
    backgroundColor: wui.colorAlias.neutral200,
  },

  label: {
    fontFamily: WUI_FONT_NEWSREADER_MEDIUM,
    fontWeight: "400",
  },

  ghost: { backgroundColor: "transparent" },
  primary: { backgroundColor: wui.colorAlias.neutral100 },
  secondary: { backgroundColor: wui.colorAlias.neutral900 },
  success: { backgroundColor: wui.colorAlias.success500 },
  danger: { backgroundColor: wui.colorAlias.danger500 },
  warning: { backgroundColor: wui.colorAlias.warning500 },
  info: { backgroundColor: wui.colorAlias.info500 },

  ghostPressed: { backgroundColor: "transparent" },
  primaryPressed: { backgroundColor: wui.colorAlias.neutral200 },
  secondaryPressed: { backgroundColor: wui.colorAlias.neutral600 },
  successPressed: { backgroundColor: wui.colorAlias.success600 },
  dangerPressed: { backgroundColor: wui.colorAlias.danger600 },
  warningPressed: { backgroundColor: wui.colorAlias.warning600 },
  infoPressed: { backgroundColor: wui.colorAlias.info600 },

  disabled: { backgroundColor: wui.colorAlias.neutral200 },

  black: { color: wui.colorAlias.neutral900 },
  white: { color: wui.colorAlias.neutral0 },
  gray: { color: wui.colorAlias.neutral400 },

  sSize: { paddingHorizontal: wui.space[12], height: 40 },
  mSize: { paddingHorizontal: wui.space[16], height: 48 },
  lSize: { paddingHorizontal: wui.space[20], height: 56 },

  sLabel: { fontSize: 16 },
  mLabel: { fontSize: 18 },
  lLabel: { fontSize: 20 },
});

export const getBackgroundColor = (
  color: WuiButtonColor,
  isPressed = false
): ViewStyle => {
  if (isPressed) {
    return styles[`${color}Pressed`];
  } else if (Boolean(styles[color])) {
    return styles[color];
  } else {
    throw new Error("Invalid WuiButton background color");
  }
};

export const getTextColor = (color: WuiButtonColor): TextStyle => {
  switch (color) {
    case WuiButtonColor.GHOST:
    case WuiButtonColor.PRIMARY:
    case WuiButtonColor.SUCCESS:
    case WuiButtonColor.WARNING:
      return styles.black;

    case WuiButtonColor.SECONDARY:
    case WuiButtonColor.DANGER:
    case WuiButtonColor.INFO:
      return styles.white;

    default: {
      throw new Error("Invalid WuiButton text color");
    }
  }
};
