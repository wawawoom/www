import { type HTMLAttributes } from "react";

export enum WuiBadgeColor {
  TRANSPARENT = "transparent",
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

export interface WuiBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: WuiBadgeColor;
  size?: WuiBadgeSize;
}
