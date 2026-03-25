import type { NavigatorScreenParams } from "@react-navigation/native";

/**
 * Param lists for React Navigation — keep screen names in sync with `App.tsx` stack config.
 */
export type DetailsFlowParamList = {
  Details: { itemId: number; otherParam: string };
  Modal: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  /** Nested stack: `Details` (main) + `Modal` — use `{ screen, params }` from the root navigator. */
  Details: NavigatorScreenParams<DetailsFlowParamList>;
};
