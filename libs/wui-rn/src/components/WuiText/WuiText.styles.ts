import { StyleSheet } from "react-native";

import {
  WUI_FONT_NEWSREADER_BOLD,
  WUI_FONT_NEWSREADER_MEDIUM,
  WUI_FONT_NEWSREADER_REGULAR,
} from "../../fonts/wuiFontAssets";

const WUI_TEXT_LINE_HEIGHT_PERCENT = 130;

function lineHeightFor(fontSize: number): number {
  return Math.round((fontSize * WUI_TEXT_LINE_HEIGHT_PERCENT) / 100);
}

export const styles = StyleSheet.create({
  serif: { fontFamily: WUI_FONT_NEWSREADER_REGULAR },
  sansSerif: { fontFamily: "Arial" },

  xxs: { fontSize: 12, lineHeight: lineHeightFor(12) },
  xs: { fontSize: 14, lineHeight: lineHeightFor(14) },
  s: { fontSize: 18, lineHeight: lineHeightFor(18) },
  m: { fontSize: 20, lineHeight: lineHeightFor(20) },
  l: { fontSize: 22, lineHeight: lineHeightFor(22) },
  xl: { fontSize: 26, lineHeight: lineHeightFor(26) },
  xxl: { fontSize: 30, lineHeight: lineHeightFor(30) },

  regular: { fontFamily: WUI_FONT_NEWSREADER_REGULAR },
  medium: { fontFamily: WUI_FONT_NEWSREADER_MEDIUM },
  bold: { fontFamily: WUI_FONT_NEWSREADER_BOLD },
});
