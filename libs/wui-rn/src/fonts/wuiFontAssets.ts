import {
  Newsreader_400Regular,
  Newsreader_500Medium,
  Newsreader_700Bold,
} from "@expo-google-fonts/newsreader";

/**
 * Font files passed to `useFonts` from `expo-font`.
 * Keys must match `fontFamily` values used in styles.
 */
export const wuiFontAssets = {
  Newsreader_400Regular,
  Newsreader_500Medium,
  Newsreader_700Bold,
} as const;

/** Use this as `fontFamily` for Newsreader Regular (400). */
export const WUI_FONT_NEWSREADER_REGULAR = "Newsreader_400Regular" as const;
export const WUI_FONT_NEWSREADER_MEDIUM = "Newsreader_500Medium" as const;
export const WUI_FONT_NEWSREADER_BOLD = "Newsreader_700Bold" as const;
