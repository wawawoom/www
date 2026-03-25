import { type HTMLAttributes } from "react";

import {
  WuiColorAlias,
  WuiFontFamily,
  WuiTextSize,
  WuiTextWeight,
} from "@wawawoom/design-token/enum";

export type WuiTextElement =
  | HTMLDivElement
  | HTMLParagraphElement
  | HTMLSpanElement;

export enum WuiTextAs {
  DIV = "div",
  P = "p",
  SPAN = "span",
}

export { WuiFontFamily, WuiTextSize, WuiTextWeight };

export interface WuiTextProps extends Omit<
  HTMLAttributes<WuiTextElement>,
  "as"
> {
  as?: WuiTextAs;
  size?: WuiTextSize;
  weight?: WuiTextWeight;
  color?: WuiColorAlias;
  fontFamily?: WuiFontFamily;
}
