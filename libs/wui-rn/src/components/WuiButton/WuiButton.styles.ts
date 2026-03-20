import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { WUI_FONT_NEWSREADER_MEDIUM } from "../../fonts/wuiFontAssets";
import { wui } from "../../styles/atomic";
import { WuiButtonColor } from "./WuiButtonProps";

export const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    fontSize: 16,
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
});

export const getBackgroundColor = (
  color: WuiButtonColor,
  isPressed = false
): ViewStyle => {
  if (isPressed) {
    return styles[`${color}Pressed`];
  } else {
    return styles[color];
  }

  //   switch (color) {
  //     case WuiButtonColor.GHOST:
  //       return styles.ghost;

  //     case WuiButtonColor.PRIMARY:
  //       return styles.primary;

  //     case WuiButtonColor.SECONDARY:
  //       return styles.secondary;

  //     case WuiButtonColor.SUCCESS:
  //       return styles.success;

  //     case WuiButtonColor.DANGER:
  //       return styles.danger;

  //     case WuiButtonColor.WARNING:
  //       return styles.warning;

  //     case WuiButtonColor.INFO:
  //       return styles.info;

  //     default: {
  //       throw new Error("Invalid WuiButton background color");
  //     }
  //   }
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
