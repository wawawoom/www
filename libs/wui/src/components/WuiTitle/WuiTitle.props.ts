import type { HTMLAttributes } from "react";

import {
  WuiColorAlias,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/design-token/enum";

export { WuiTitleAs, WuiTitleLook };

export interface WuiTitleProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "as"
> {
  as?: WuiTitleAs;
  look?: WuiTitleLook;
  color?: WuiColorAlias;
}
