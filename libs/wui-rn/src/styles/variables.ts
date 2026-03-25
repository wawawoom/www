/**
 * Do not edit directly; this file was auto-generated.
 * Source: libs/design-token/src/tokens (same inputs as libs/wui/src/styles/variables.css).
 * Run: pnpm --filter @wawawoom/design-token run build:tokens
 */

import type { TextStyle } from "react-native";

import {
  WUI_FONT_NEWSREADER_BOLD,
  WUI_FONT_NEWSREADER_LIGHT,
  WUI_FONT_NEWSREADER_REGULAR,
} from "../fonts/wuiFontAssets";

type WuiFontWeightToken = NonNullable<TextStyle["fontWeight"]>;

export type WuiFontConfig = {
  sansSerif: string;
  serifLight: string;
  serifRegular: string;
  serifBold: string;
  lightWeight: WuiFontWeightToken;
  regularWeight: WuiFontWeightToken;
  boldWeight: WuiFontWeightToken;
  lineHeightRatio: number;
};

/** Mirrors `lineHeight.base` in `libs/design-token/src/tokens/atomic/font.json` (same as `--wui-line-height-base` in variables.css). */
export const wuiLineHeightRatio = 1.4;

/** Mirrors `font.weight.light` in `libs/design-token/src/tokens/atomic/font.json` (same as `--wui-font-weight-light` in variables.css). */
export const wuiFontWeightLight = "300" as WuiFontWeightToken;
/** Mirrors `font.weight.regular` in `libs/design-token/src/tokens/atomic/font.json` (same as `--wui-font-weight-regular` in variables.css). */
export const wuiFontWeightRegular = "400" as WuiFontWeightToken;
/** Mirrors `font.weight.bold` in `libs/design-token/src/tokens/atomic/font.json` (same as `--wui-font-weight-bold` in variables.css). */
export const wuiFontWeightBold = "700" as WuiFontWeightToken;

export const wuiColor = {
  black0: "#ffffff",
  black100: "#f5f5f5",
  black200: "#e0e0e0",
  black300: "#bdbdbd",
  black400: "#9e9e9e",
  black500: "#757575",
  black600: "#616161",
  black700: "#424242",
  black800: "#212121",
  black900: "#000000",
  blue0: "#e8f0fe",
  blue100: "#d1e1fd",
  blue200: "#a3c3fb",
  blue300: "#75a5f9",
  blue400: "#4787f7",
  blue500: "#2156e7",
  blue600: "#1c49c4",
  blue700: "#173ca1",
  blue800: "#122f7e",
  blue900: "#0d225b",
  green0: "#f5fce8",
  green100: "#e8f9d1",
  green200: "#d1f3a3",
  green300: "#baed75",
  green400: "#a3e747",
  green500: "#7dd427",
  green600: "#6bb820",
  green700: "#599c19",
  green800: "#478012",
  green900: "#35640b",
  pink0: "#fce8f3",
  pink100: "#f9d1e7",
  pink200: "#f3a3cf",
  pink300: "#ed75b7",
  pink400: "#e7479f",
  pink500: "#db0c81",
  pink600: "#ba0a6d",
  pink700: "#990859",
  pink800: "#780645",
  pink900: "#570431",
  yellow0: "#fffce8",
  yellow100: "#fff8d1",
  yellow200: "#fff1a3",
  yellow300: "#ffea75",
  yellow400: "#ffe347",
  yellow500: "#ffd500",
  yellow600: "#edc602",
  yellow700: "#d4b104",
  yellow800: "#b79800",
  yellow900: "#836e02",
} as Record<string, string>;
export const wuiColorAlias = {
  danger0: "#fce8f3",
  danger100: "#f9d1e7",
  danger200: "#f3a3cf",
  danger300: "#ed75b7",
  danger400: "#e7479f",
  danger500: "#db0c81",
  danger600: "#ba0a6d",
  danger700: "#990859",
  danger800: "#780645",
  danger900: "#570431",
  info0: "#e8f0fe",
  info100: "#d1e1fd",
  info200: "#a3c3fb",
  info300: "#75a5f9",
  info400: "#4787f7",
  info500: "#2156e7",
  info600: "#1c49c4",
  info700: "#173ca1",
  info800: "#122f7e",
  info900: "#0d225b",
  neutral0: "#ffffff",
  neutral100: "#f5f5f5",
  neutral200: "#e0e0e0",
  neutral300: "#bdbdbd",
  neutral400: "#9e9e9e",
  neutral500: "#757575",
  neutral600: "#616161",
  neutral700: "#424242",
  neutral800: "#212121",
  neutral900: "#000000",
  success0: "#f5fce8",
  success100: "#e8f9d1",
  success200: "#d1f3a3",
  success300: "#baed75",
  success400: "#a3e747",
  success500: "#7dd427",
  success600: "#6bb820",
  success700: "#599c19",
  success800: "#478012",
  success900: "#35640b",
  warning0: "#fffce8",
  warning100: "#fff8d1",
  warning200: "#fff1a3",
  warning300: "#ffea75",
  warning400: "#ffe347",
  warning500: "#ffd500",
  warning600: "#edc602",
  warning700: "#d4b104",
  warning800: "#b79800",
  warning900: "#836e02",
} as Record<string, string>;
export const wuiSpace = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  30: 30,
  36: 36,
  44: 44,
  60: 60,
  96: 96,
} as Record<string, number>;

/** Key order matches `WuiTextSize` (Style Dictionary → `libs/design-token/src/enum/WuiTextSize.ts`); values from `text.font.size` in font.json (px → dp; same as `--wui-text-font-size-*` in variables.css). */
export const wuiTextFontSize = {
  xxs: 12,
  xs: 14,
  s: 16,
  m: 18,
  l: 20,
  xl: 24,
  xxl: 28,
} satisfies Record<string, number>;

/** Key order matches `WuiTitleLook` / `WuiTitleAs` (Style Dictionary → `src/enum/WuiTitleLook.ts`); values from `title.font.size` in font.json (px → dp; same as `--wui-title-font-size-*` in variables.css). */
export const wuiTitleFontSize = {
  h1: 60,
  h2: 44,
  h3: 38,
  h4: 32,
  h5: 26,
  h6: 20,
} satisfies Record<string, number>;

/** Mirrors `title.lineHeight.base` in `libs/design-token/src/tokens/atomic/font.json` (same as `--wui-title-line-height-base` in variables.css). */
export const wuiTitleLineHeightRatio = 1.2;

export type WuiTheme = {
  color: Record<string, string>;
  colorAlias: Record<string, string>;
  space: Record<string, number>;
  textFontSize: typeof wuiTextFontSize;
  titleFontSize: typeof wuiTitleFontSize;
  titleLineHeightRatio: number;
  font: WuiFontConfig;
};

export const wui: WuiTheme = {
  color: wuiColor,
  colorAlias: wuiColorAlias,
  space: wuiSpace,
  textFontSize: wuiTextFontSize,
  titleFontSize: wuiTitleFontSize,
  titleLineHeightRatio: wuiTitleLineHeightRatio,
  font: {
    sansSerif: "Arial",
    serifLight: WUI_FONT_NEWSREADER_LIGHT,
    serifRegular: WUI_FONT_NEWSREADER_REGULAR,
    serifBold: WUI_FONT_NEWSREADER_BOLD,
    lightWeight: wuiFontWeightLight,
    regularWeight: wuiFontWeightRegular,
    boldWeight: wuiFontWeightBold,
    lineHeightRatio: wuiLineHeightRatio,
  },
};
