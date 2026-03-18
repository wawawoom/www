import type { TextareaHTMLAttributes } from "react";

import type { WuiInputHelperProps } from "../WuiInputHelper/WuiInputHelper.props";

export enum WuiTextareaHeight {
  S = "s",
  M = "m",
  L = "l",
}

export enum WuiTextareaStatus {
  DEFAULT = "default",
  ERROR = "error",
  VALID = "valid",
}

export interface WuiTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: WuiTextareaHeight;
  status?: WuiTextareaStatus;
  label?: string;
  helpers?: WuiInputHelperProps[];
}
