import type { TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import type { WuiColorAlias } from "@wawawoom/design-token/enum";
import { wui } from "../../styles/variables";
import { styles as wuiTextCompositeStyles } from "../WuiText/WuiText.styles";

const tt = wui.titleFontSize;
const tlr = wui.titleLineHeightRatio;

const titleLineHeight = (fontSize: number): number =>
  Math.round(fontSize * tlr);

export const titleSizeStyles = StyleSheet.create({
  h1: { fontSize: tt.h1, lineHeight: titleLineHeight(tt.h1) },
  h2: { fontSize: tt.h2, lineHeight: titleLineHeight(tt.h2) },
  h3: { fontSize: tt.h3, lineHeight: titleLineHeight(tt.h3) },
  h4: { fontSize: tt.h4, lineHeight: titleLineHeight(tt.h4) },
  h5: { fontSize: tt.h5, lineHeight: titleLineHeight(tt.h5) },
  h6: { fontSize: tt.h6, lineHeight: titleLineHeight(tt.h6) },
});

export const titleBaseStyle: TextStyle = {
  fontFamily: wui.font.serifBold,
};

export type TitleVisualLevel = keyof typeof tt;

export function getTitleStyles(
  visualLevel: TitleVisualLevel,
  color: WuiColorAlias
): TextStyle[] {
  return [
    titleBaseStyle,
    titleSizeStyles[visualLevel],
    wuiTextCompositeStyles[color] as TextStyle,
  ];
}
