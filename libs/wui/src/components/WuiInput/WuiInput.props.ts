import type { InputHTMLAttributes } from "react";

export enum WuiInputHeight {
  S = "s",
  M = "m",
  L = "l",
}

export enum WuiInputStatus {
  DEFAULT = "default",
  ERROR = "error",
  VALID = "valid",
}

export interface WuiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: WuiInputHeight;
  status?: WuiInputStatus;
  block?: boolean;
  label?: string;
}
