import type { DialogHTMLAttributes } from "react";
import type { ReactNode } from "react";

export interface WuiModalProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "children" | "open" | "title"
> {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
}
