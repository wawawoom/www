import React from "react";
import { Text } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { getBadgeStyles, getIconSize } from "./WuiBadge.styles";
import { WuiBadgeColor, WuiBadgeProps, WuiBadgeSize } from "./WuiBadgeProps";

export const WuiBadge = (props: WuiBadgeProps) => {
  const {
    label,
    size = WuiBadgeSize.M,
    color = WuiBadgeColor.SECONDARY,
    leftIconName = "",
    style,
    ...rest
  } = props;

  return (
    <Text
      numberOfLines={1}
      style={[
        ...getBadgeStyles(size, color, label.length, leftIconName),
        style,
      ]}
      {...rest}
    >
      {leftIconName && (
        <>
          <FontAwesome name={leftIconName as never} size={getIconSize(size)} />
          {label && " "}
        </>
      )}

      {label}
    </Text>
  );
};
