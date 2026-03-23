import { TextProps } from "react-native";

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
  REGULAR = "regular",
  MEDIUM = "medium",
  BOLD = "bold",
}

export enum WuiFontFamily {
  SERIF = "serif",
  SANS_SERIF = "sansSerif",
}

export interface WuiTextProps extends TextProps {
  size?: WuiTextSize;
  weight?: WuiTextWeight;
  // color?: WuiColorAlias;
  fontFamily?: WuiFontFamily;
}
