import type { DialogHTMLAttributes } from "react";
import type { ReactNode } from "react";

export enum WuiModalWidth {
  S = "s",
  M = "m",
  L = "l",
}

export interface WuiModalProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "children" | "open" | "title"
> {
  open: boolean;
  onClose: () => void;
  width?: WuiModalWidth;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
}
