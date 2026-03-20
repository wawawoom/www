import { PressableProps } from "react-native";

export enum WuiButtonColor {
  GHOST = "ghost",
  PRIMARY = "primary",
  SECONDARY = "secondary",
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

export interface WuiButtonProps extends PressableProps {
  label: string;
  color?: WuiButtonColor;
  size?: WuiButtonSize;
  block?: boolean;
}
