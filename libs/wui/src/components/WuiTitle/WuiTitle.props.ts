import { HTMLAttributes } from "react";

import { WuiColorName } from "../../enum";

export enum WuiTitleAs {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

export enum WuiTitleLook {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

export interface WuiTitleProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "as"
> {
  as?: WuiTitleAs;
  look?: WuiTitleLook;
  color?: WuiColorName;
}
