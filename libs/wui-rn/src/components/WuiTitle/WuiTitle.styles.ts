import type { TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import type { WuiColorAlias } from "@wawawoom/design-token/enum";

import { wui } from "../../styles/variables";
import { styles as wuiTextCompositeStyles } from "../WuiText/WuiText.styles";

const titleFontSizes = wui.titleFontSize;
const titleLineHeightRatio = wui.titleLineHeightRatio;

const titleLineHeight = (fontSize: number): number =>
  Math.round(fontSize * titleLineHeightRatio);

export const titleSizeStyles = StyleSheet.create({
  h1: {
    fontSize: titleFontSizes.h1,
    lineHeight: titleLineHeight(titleFontSizes.h1),
  },
  h2: {
    fontSize: titleFontSizes.h2,
    lineHeight: titleLineHeight(titleFontSizes.h2),
  },
  h3: {
    fontSize: titleFontSizes.h3,
    lineHeight: titleLineHeight(titleFontSizes.h3),
  },
  h4: {
    fontSize: titleFontSizes.h4,
    lineHeight: titleLineHeight(titleFontSizes.h4),
  },
  h5: {
    fontSize: titleFontSizes.h5,
    lineHeight: titleLineHeight(titleFontSizes.h5),
  },
  h6: {
    fontSize: titleFontSizes.h6,
    lineHeight: titleLineHeight(titleFontSizes.h6),
  },
});

export const titleBaseStyle: TextStyle = {
  fontFamily: wui.font.serifBold,
};

export type TitleVisualLevel = keyof typeof titleFontSizes;

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
