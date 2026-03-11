import { type HTMLAttributes } from "react";

export enum WuiAlertColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
}

export interface WuiAlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: WuiAlertColor;
  icon?: string;
}
