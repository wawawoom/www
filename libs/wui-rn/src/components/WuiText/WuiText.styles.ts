import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import type { WuiColorAlias } from "@wawawoom/design-token/enum";
import { wui } from "../../styles/variables";
import { WuiFontFamily, WuiTextSize, WuiTextWeight } from "./WuiTextProps";

const getLineHeightForSize = (fontSize: number): number => {
  return Math.round(fontSize * wui.font.lineHeightRatio);
};

const tf = wui.textFontSize;

export const styles = StyleSheet.create({
  xxs: { fontSize: tf.xxs, lineHeight: getLineHeightForSize(tf.xxs) },
  xs: { fontSize: tf.xs, lineHeight: getLineHeightForSize(tf.xs) },
  s: { fontSize: tf.s, lineHeight: getLineHeightForSize(tf.s) },
  m: { fontSize: tf.m, lineHeight: getLineHeightForSize(tf.m) },
  l: { fontSize: tf.l, lineHeight: getLineHeightForSize(tf.l) },
  xl: { fontSize: tf.xl, lineHeight: getLineHeightForSize(tf.xl) },
  xxl: { fontSize: tf.xxl, lineHeight: getLineHeightForSize(tf.xxl) },
  ["danger-0"]: { color: wui.colorAlias["danger0"] },
  ["danger-100"]: { color: wui.colorAlias["danger100"] },
  ["danger-200"]: { color: wui.colorAlias["danger200"] },
  ["danger-300"]: { color: wui.colorAlias["danger300"] },
  ["danger-400"]: { color: wui.colorAlias["danger400"] },
  ["danger-500"]: { color: wui.colorAlias["danger500"] },
  ["danger-600"]: { color: wui.colorAlias["danger600"] },
  ["danger-700"]: { color: wui.colorAlias["danger700"] },
  ["danger-800"]: { color: wui.colorAlias["danger800"] },
  ["danger-900"]: { color: wui.colorAlias["danger900"] },
  ["info-0"]: { color: wui.colorAlias["info0"] },
  ["info-100"]: { color: wui.colorAlias["info100"] },
  ["info-200"]: { color: wui.colorAlias["info200"] },
  ["info-300"]: { color: wui.colorAlias["info300"] },
  ["info-400"]: { color: wui.colorAlias["info400"] },
  ["info-500"]: { color: wui.colorAlias["info500"] },
  ["info-600"]: { color: wui.colorAlias["info600"] },
  ["info-700"]: { color: wui.colorAlias["info700"] },
  ["info-800"]: { color: wui.colorAlias["info800"] },
  ["info-900"]: { color: wui.colorAlias["info900"] },
  ["neutral-0"]: { color: wui.colorAlias["neutral0"] },
  ["neutral-100"]: { color: wui.colorAlias["neutral100"] },
  ["neutral-200"]: { color: wui.colorAlias["neutral200"] },
  ["neutral-300"]: { color: wui.colorAlias["neutral300"] },
  ["neutral-400"]: { color: wui.colorAlias["neutral400"] },
  ["neutral-500"]: { color: wui.colorAlias["neutral500"] },
  ["neutral-600"]: { color: wui.colorAlias["neutral600"] },
  ["neutral-700"]: { color: wui.colorAlias["neutral700"] },
  ["neutral-800"]: { color: wui.colorAlias["neutral800"] },
  ["neutral-900"]: { color: wui.colorAlias["neutral900"] },
  ["success-0"]: { color: wui.colorAlias["success0"] },
  ["success-100"]: { color: wui.colorAlias["success100"] },
  ["success-200"]: { color: wui.colorAlias["success200"] },
  ["success-300"]: { color: wui.colorAlias["success300"] },
  ["success-400"]: { color: wui.colorAlias["success400"] },
  ["success-500"]: { color: wui.colorAlias["success500"] },
  ["success-600"]: { color: wui.colorAlias["success600"] },
  ["success-700"]: { color: wui.colorAlias["success700"] },
  ["success-800"]: { color: wui.colorAlias["success800"] },
  ["success-900"]: { color: wui.colorAlias["success900"] },
  ["warning-0"]: { color: wui.colorAlias["warning0"] },
  ["warning-100"]: { color: wui.colorAlias["warning100"] },
  ["warning-200"]: { color: wui.colorAlias["warning200"] },
  ["warning-300"]: { color: wui.colorAlias["warning300"] },
  ["warning-400"]: { color: wui.colorAlias["warning400"] },
  ["warning-500"]: { color: wui.colorAlias["warning500"] },
  ["warning-600"]: { color: wui.colorAlias["warning600"] },
  ["warning-700"]: { color: wui.colorAlias["warning700"] },
  ["warning-800"]: { color: wui.colorAlias["warning800"] },
  ["warning-900"]: { color: wui.colorAlias["warning900"] },
});

export const getFontStyles = (
  fontFamily: WuiFontFamily,
  weight: WuiTextWeight,
  size: WuiTextSize,
  color: WuiColorAlias
): StyleProp<TextStyle>[] => {
  const styleParts: StyleProp<TextStyle>[] = [];

  if (fontFamily === WuiFontFamily.SANS_SERIF) {
    styleParts.push({
      fontFamily: wui.font.sansSerif,
    });

    if (weight === WuiTextWeight.LIGHT) {
      styleParts.push({ fontWeight: wui.font.lightWeight });
    } else if (weight === WuiTextWeight.REGULAR) {
      styleParts.push({ fontWeight: wui.font.regularWeight });
    } else if (weight === WuiTextWeight.BOLD) {
      styleParts.push({ fontWeight: wui.font.boldWeight });
    }
  } else {
    if (weight === WuiTextWeight.LIGHT) {
      styleParts.push({ fontFamily: wui.font.serifLight });
    } else if (weight === WuiTextWeight.REGULAR) {
      styleParts.push({ fontFamily: wui.font.serifRegular });
    } else if (weight === WuiTextWeight.BOLD) {
      styleParts.push({ fontFamily: wui.font.serifBold });
    }
  }

  styleParts.push(styles[size]);
  styleParts.push(styles[color]);

  return styleParts;
};
