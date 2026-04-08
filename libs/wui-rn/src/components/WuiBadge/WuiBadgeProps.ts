import { TextProps } from "react-native";

export enum WuiBadgeColor {
  TRANSPARENT = "transparent",
  BORDERED = "bordered",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
}

export enum WuiBadgeSize {
  S = "s",
  M = "m",
  L = "l",
}

export interface WuiBadgeProps extends Omit<TextProps, "children"> {
  label: string;
  size?: WuiBadgeSize;
  color?: WuiBadgeColor;
  leftIconName?: string;
}
