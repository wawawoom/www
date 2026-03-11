import { type AnchorHTMLAttributes } from "react";

export enum WuiLinkColor {
  NONE = "none",
  GHOST = "ghost",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
}

export enum WuiLinkSize {
  S = "s",
  M = "m",
  L = "l",
}

export interface WuiLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: WuiLinkColor;
  size?: WuiLinkSize;
}
