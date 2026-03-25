import { TextProps } from "react-native";

import {
  type WuiColorAlias,
  WuiFontFamily,
  WuiTextSize,
  WuiTextWeight,
} from "@wawawoom/design-token/enum";

export { WuiFontFamily, WuiTextSize, WuiTextWeight };

export interface WuiTextProps extends TextProps {
  size?: WuiTextSize;
  weight?: WuiTextWeight;
  color?: WuiColorAlias;
  fontFamily?: WuiFontFamily;
}
