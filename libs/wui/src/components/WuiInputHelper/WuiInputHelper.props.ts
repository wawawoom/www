import type { HTMLAttributes } from "react";

export enum WuiInputHelperStatus {
  DEFAULT = "default",
  ERROR = "error",
  VALID = "valid",
}

export interface WuiInputHelperProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  status?: WuiInputHelperStatus;
}
