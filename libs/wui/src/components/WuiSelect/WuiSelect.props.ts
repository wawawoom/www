import type { SelectHTMLAttributes } from "react";

import { WuiInputHelperProps } from "../WuiInputHelper/WuiInputHelper.props";

export enum WuiSelectHeight {
  S = "s",
  M = "m",
  L = "l",
}

export enum WuiSelectStatus {
  DEFAULT = "default",
  ERROR = "error",
  VALID = "valid",
}

export interface WuiSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  height?: WuiSelectHeight;
  status?: WuiSelectStatus;
  label?: string;
  helpers?: WuiInputHelperProps[];
}
