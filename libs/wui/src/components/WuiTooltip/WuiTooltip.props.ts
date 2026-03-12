import { type HTMLAttributes, type ReactNode } from "react";

export enum WuiTooltipPlacement {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

export interface WuiTooltipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Content shown in the tooltip when hovering the trigger. */
  content: ReactNode;
  /** Preferred placement relative to the trigger. Uses CSS anchor positioning. */
  placement?: WuiTooltipPlacement;
}
