import { TextProps } from "react-native";

import type { WuiColorAlias } from "@wawawoom/design-token/enum";

export enum WuiTextSize {
  XXS = "xxs",
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
  XXL = "xxl",
}

export enum WuiTextWeight {
  LIGHT = "light",
  REGULAR = "regular",
  BOLD = "bold",
}

export enum WuiFontFamily {
  SERIF = "serif",
  SANS_SERIF = "sansSerif",
}

export interface WuiTextProps extends TextProps {
  size?: WuiTextSize;
  weight?: WuiTextWeight;
  color?: WuiColorAlias;
  fontFamily?: WuiFontFamily;
}
