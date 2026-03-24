/**
 * RN design tokens (`wui`).
 *
 * `wui.color`, `wui.colorAlias`, and `wui.space` come from `@wawawoom/design-token` JSON.
 * Spacing uses numeric pixel values in `tokens/semantic/space.json`; RN maps them to dp.
 * Run `pnpm --filter @wawawoom/design-token run build:tokens` to regenerate
 * color enums under `libs/design-token/src/enum/generated/` and CSS variables from tokens.
 *
 * `wui.font` stays RN-specific (Expo font assets).
 */
import type { TextStyle } from "react-native";

import colorAtomic from "@wawawoom/design-token/tokens/atomic/color.json";
import colorSemantic from "@wawawoom/design-token/tokens/semantic/color.json";
import spaceSemantic from "@wawawoom/design-token/tokens/semantic/space.json";

import {
  WUI_FONT_NEWSREADER_BOLD,
  WUI_FONT_NEWSREADER_LIGHT,
  WUI_FONT_NEWSREADER_REGULAR,
} from "../fonts/wuiFontAssets";
import {
  type AtomicColorDoc,
  type SemanticColorAliasDoc,
  type SemanticSpaceDoc,
  flattenAtomicColors,
  flattenColorAliases,
  spacingTokensToNumbers,
} from "./fromDesignTokens";

type WuiFontWeightToken = NonNullable<TextStyle["fontWeight"]>;

type WuiFontConfig = {
  sansSerif: string;
  serifLight: string;
  serifRegular: string;
  serifBold: string;
  lightWeight: WuiFontWeightToken;
  regularWeight: WuiFontWeightToken;
  boldWeight: WuiFontWeightToken;
  lineHeightRatio: number;
};

export const wui: {
  color: Record<string, string>;
  colorAlias: Record<string, string>;
  space: Record<string, number>;
  font: WuiFontConfig;
} = {
  color: {},
  colorAlias: {},
  space: {},
  font: {} as WuiFontConfig,
};

const atomicColors = flattenAtomicColors(colorAtomic as AtomicColorDoc);
wui.color = atomicColors;
wui.colorAlias = flattenColorAliases(
  colorSemantic as SemanticColorAliasDoc,
  atomicColors
);

wui.space = spacingTokensToNumbers(spaceSemantic as SemanticSpaceDoc);

wui.font = {
  sansSerif: "Arial",
  serifLight: WUI_FONT_NEWSREADER_LIGHT,
  serifRegular: WUI_FONT_NEWSREADER_REGULAR,
  serifBold: WUI_FONT_NEWSREADER_BOLD,

  lightWeight: "300",
  regularWeight: "400",
  boldWeight: "700",
  lineHeightRatio: 1.3,
};
