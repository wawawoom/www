import { type ButtonHTMLAttributes } from "react";

export enum WuiButtonColor {
  GHOST = "ghost",
  LIGHT = "light",
  DARK = "dark",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
}

export enum WuiButtonSize {
  S = "s",
  M = "m",
  L = "l",
}

export interface WuiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: WuiButtonColor;
  size?: WuiButtonSize;
  block?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}
