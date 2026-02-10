import { type HTMLAttributes } from "react";

export enum WuiAlertColor {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
}

export interface WuiAlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: WuiAlertColor;
  icon?: string;
}
