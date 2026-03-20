import { useFonts } from "expo-font";

import { wuiFontAssets } from "./wuiFontAssets";

/**
 * Loads WUI fonts (e.g. Newsreader). Call once near the app root
 * (or in Storybook preview) before rendering components that use these families.
 */
export function useWuiFonts() {
  return useFonts(wuiFontAssets);
}
