import type { TextProps } from "react-native";

import type { WuiColorAlias } from "@wawawoom/design-token/enum";
import { WuiTitleAs, WuiTitleLook } from "@wawawoom/design-token/enum";

export { WuiTitleAs, WuiTitleLook };

export interface WuiTitleProps extends TextProps {
  as?: WuiTitleAs;
  look?: WuiTitleLook;
  color?: WuiColorAlias;
}
