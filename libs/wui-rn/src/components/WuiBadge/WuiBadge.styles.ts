import { StyleProp, StyleSheet, TextStyle } from "react-native";

import { wui } from "../../styles/variables";
import { hexToRgba } from "../../utils/hexToRgba";
import { WuiBadgeColor, WuiBadgeSize } from "./WuiBadgeProps";

export const styles = StyleSheet.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: wui.colorAlias.neutral0,
    borderRadius: 999,
    fontFamily: wui.font.sansSerif,
    fontWeight: 400,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
  },
  transparent: {
    backgroundColor: hexToRgba(wui.colorAlias.neutral500, 0.3),
    color: hexToRgba(wui.colorAlias.neutral900, 0.6),
  },
  bordered: {
    color: wui.colorAlias.neutral900,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: wui.colorAlias.neutral900,
  },
  primary: {
    backgroundColor: wui.colorAlias.neutral0,
    color: wui.colorAlias.neutral900,
  },
  secondary: {
    backgroundColor: wui.colorAlias.neutral900,
    color: wui.colorAlias.neutral0,
  },
  success: {
    backgroundColor: wui.colorAlias.success500,
    color: wui.colorAlias.neutral900,
  },
  danger: {
    backgroundColor: wui.colorAlias.danger500,
    color: wui.colorAlias.neutral0,
  },
  warning: {
    backgroundColor: wui.colorAlias.warning500,
    color: wui.colorAlias.neutral900,
  },
  info: {
    backgroundColor: wui.colorAlias.info500,
    color: wui.colorAlias.neutral0,
  },

  sSize: {
    paddingVertical: wui.space[2],
    fontSize: 12,
  },
  mSize: {
    paddingVertical: wui.space[2],
    fontSize: wui.textFontSize.xs,
  },
  lSize: {
    paddingVertical: wui.space[4],
    fontSize: wui.textFontSize.s,
  },
});

export const getIconSize = (size: WuiBadgeSize) => {
  if (size === WuiBadgeSize.S) {
    return 10;
  } else if (size === WuiBadgeSize.M) {
    return 12;
  } else if (size === WuiBadgeSize.L) {
    return 14;
  }
};

const getPaddingHorizontal = (
  characterCount: number,
  size: WuiBadgeSize,
  leftIconName: string
) => {
  if (leftIconName && characterCount === 0) {
    if (size === WuiBadgeSize.S) {
      return 2;
    } else if (size === WuiBadgeSize.M) {
      return wui.space[2];
    } else if (size === WuiBadgeSize.L) {
      return wui.space[4];
    }
  } else {
    if (characterCount <= 2) {
      if (size === WuiBadgeSize.S) {
        return 5;
      } else if (size === WuiBadgeSize.M) {
        return wui.space[6];
      } else if (size === WuiBadgeSize.L) {
        return wui.space[8];
      }
    } else {
      if (size === WuiBadgeSize.S) {
        return wui.space[8];
      } else if (size === WuiBadgeSize.M) {
        return wui.space[8];
      } else if (size === WuiBadgeSize.L) {
        return wui.space[14];
      }
    }
  }
};

export const getBadgeStyles = (
  size: WuiBadgeSize,
  color: WuiBadgeColor,
  characterCount: number,
  leftIconName: string
): StyleProp<TextStyle>[] => {
  return [
    styles.base,
    styles[`${size}Size`],
    styles[color],
    {
      paddingHorizontal: getPaddingHorizontal(
        characterCount,
        size,
        leftIconName
      ),
    },
  ];
};
