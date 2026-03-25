import React from "react";
import { Text } from "react-native";

import { WuiColorAlias, WuiTitleAs } from "@wawawoom/design-token/enum";
import {
  titleSizeStyles,
  type TitleVisualLevel,
  getTitleStyles,
} from "./WuiTitle.styles";
import type { WuiTitleProps } from "./WuiTitleProps";

export const WuiTitle = (props: WuiTitleProps) => {
  const {
    as = WuiTitleAs.H1,
    look,
    color = WuiColorAlias.NEUTRAL_900,
    style,
    children,
    accessibilityRole = "header",
    ...rest
  } = props;

  // Ignore invalid strings (e.g. Storybook text control typing a label instead of h1–h6).
  const visualLevel: TitleVisualLevel =
    look !== undefined &&
    typeof look === "string" &&
    look in titleSizeStyles
      ? (look as TitleVisualLevel)
      : as;

  return (
    <Text
      accessibilityRole={accessibilityRole}
      style={[...getTitleStyles(visualLevel, color), style]}
      {...rest}
    >
      {children}
    </Text>
  );
};
