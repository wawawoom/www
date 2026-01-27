import { type HTMLAttributes } from "react";

import { WuiColorName } from "../../enum";

export type WuiTextElement =
  | HTMLDivElement
  | HTMLParagraphElement
  | HTMLSpanElement;

export enum WuiTextAs {
  DIV = "div",
  P = "p",
  SPAN = "span",
}

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
  NORMAL = "normal",
  BOLD = "bold",
}

export interface WuiTextProps extends Omit<
  HTMLAttributes<WuiTextElement>,
  "as"
> {
  as?: WuiTextAs;
  size?: WuiTextSize;
  weight?: WuiTextWeight;
  color?: WuiColorName;
}
