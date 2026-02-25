import type { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

import { WuiInputHelperProps } from "../WuiInputHelper/WuiInputHelper.props";

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
  type?: HTMLInputTypeAttribute;
  helpers?: WuiInputHelperProps[];
}
